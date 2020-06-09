import { Component, OnInit } from "@angular/core";
import { Produto } from "../produto.model";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute } from "@angular/router";

//mutation Add( $nome: TNome!, $descricao: String!, $estoque: TQtde2!, $precoVenda: TPreco4!, $idUnidadeMedida: Int! ) {
const submitProduto = gql`
  mutation Add( $nome: TNome!, $descricao: String, $estoque: TQtde2, $precoVenda: TPreco4, $idUnidadeMedida: Int! ) {
    createProduto(
      input: {
        produto: {
          nome: $nome,
          descricao: $descricao,
          estoque: $estoque,
          precoVenda: $precoVenda,
          idUnidadeMedida: $idUnidadeMedida
        }
      }
    )
    {
      clientMutationId
    }
  }
`;

@Component({
  selector: "app-produto-form",
  templateUrl: "./produto-form.component.html",
  styleUrls: ["./produto-form.component.css"]
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    id: null,
    nome: "",
    descricao: "",
    estoque: null,
    precoVenda: null
  };

  resp: any = {};
  key: string = "";
  operacao = "Novo Produto";
  form: FormGroup;
  isLoadingResults = false;

  constructor(
    private apollo: Apollo,
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
    this.key = this.route.snapshot.paramMap.get("id");

    if (this.key !== null) {
      this.operacao = "Alteração";

      // this.produtoService.get(this.key).subscribe((data: any) => {
      //   const produto = data;

      //   this.form = this.formBuilder.group({
      //     id: [produto.data.id],
      //     nome: [produto.data.nome, Validators.required],
      //     descricao: [produto.data.descricao],
      //     estoque: [produto.data.estoque],
      //     preco: [produto.data.preco]
      //   }
      //   );
      // });
    }
  }

  save() {
    const data = {
      nome: this.form.get('nome').value,
      descricao: this.form.get('descricao').value,
      estoque: this.form.get('estoque').value,
      precoVenda: this.form.get('precoVenda').value,
    };
    const produtoData = this.form.value;
    const id = this.form.get('id').value;

    if (id !== 0) {
      // this.produtoService.update(id, data)
      //   .subscribe(
      //     response => {
      //       this.produtoService.showMessage("Produto atualizado com sucesso !!!");
      //       this.router.navigate(["/produtos"]);
      //     },
      //     error => {
      //       this.produtoService.showMessage("Erro na alteração do produto !" + error.error.error);
      //     });
    } else {
      this.isLoadingResults = true;
      this.apollo.mutate({
        mutation: submitProduto,
        variables: {
          input: {
            nome: "kkkk",
            descricao: "produtoData.descricao",
            estoque: 10,
            precoVenda: 11,
            idUnidadeMedida: 1
          }
        },
        // mutation: gql`
        //   mutation My {
        //     createProduto(
        //       input: {
        //         produto: {
        //           nome: "fixo", idUnidadeMedida: 1
        //         }
        //       }
        //     )
        //     {
        //       clientMutationId
        //     }
        //   }
        // `
      }).subscribe(({ data }) => {
        console.log('got data', data);
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
