import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ProdutoGQL } from '../produto.GQL';

@Component({
  selector: "app-produto-form",
  templateUrl: "./produto-form.component.html",
  styleUrls: ["./produto-form.component.css"]
})
export class ProdutoFormComponent implements OnInit {
  resp: any = {};
  operacao = "Novo Produto";
  form: FormGroup;
  isLoadingResults = false;

  constructor(
    private produtoGQL: ProdutoGQL,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      nome: [null],
      descricao: [null],
      estoque: [null],
      precoVenda: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");

    if (idParam !== null) {
      this.operacao = "Alteração";
      this.isLoadingResults = true;

      const idProduto = {
        id: Number(idParam)
      };

      this.produtoGQL.getAllProduto(idProduto).subscribe(response => {
        const data = response.nodes[0];
        this.form = this.formBuilder.group(
          {
            id: [data.id],
            nome: [data.nome, Validators.required],
            descricao: [data.descricao],
            estoque: [data.estoque],
            precoVenda: [data.precoVenda]
          }
        );
        this.isLoadingResults = false;
      }, (error) => {
        console.log('there was an error sending the query', error);
        this.isLoadingResults = false;
      });
    }
  }

  save() {
    const idProduto = this.form.get('id').value;

    if (idProduto !== 0) {
      this.isLoadingResults = true;

      const formProduto2 = {
        patch: this.form.value,
        id: idProduto
      };

      this.produtoGQL.updateProduto(formProduto2).subscribe((response) => {
        this.isLoadingResults = false;
        this.router.navigate(["/produtos"]);
      }, (error) => {
        console.log('there was an error sending the query', error);
        this.isLoadingResults = false;
      });
    } else {
      const formProduto = {
        produto: this.form.value
      };
      delete formProduto.produto.id;
      this.isLoadingResults = true;
      this.produtoGQL.createProduto(formProduto).subscribe((response) => {
        this.isLoadingResults = false;
        this.router.navigate(["/produtos"]);
      }, (error) => {
        console.log('there was an error sending the query', error);
        this.isLoadingResults = false;
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/produtos"]);
  }
}
