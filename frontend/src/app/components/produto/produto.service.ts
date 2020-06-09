import { OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatSnackBar } from "@angular/material/snack-bar";

export class ProdutoService implements OnInit{
  produtos: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       query allProdutos {
    //         allProdutos {
    //           id
    //           nome
    //           descricao
    //           estoque
    //           precoVenda
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe(result => {
    //     this.rates = result.data && result.data.rates;
    //     this.loading = result.loading;
    //     this.error = result.error;
    //   });
  }

  getAll() {
    // return this.http.get(baseUrl);
  }

  get(id) {
    // return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    // return this.http.post(baseUrl, data);
  }

  update(id, data) {
    // return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    // return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    // return this.http.delete(baseUrl);
  }

  findByNome(nome) {
    // return this.http.get(`${baseUrl}?nome=${nome}`);
  }

  showMessage(msg: string, isError: boolean = false): void {
    // this.snackBar.open(msg, "X", {
    //   duration: 3000,
    //   horizontalPosition: "right",
    //   verticalPosition: "top",
    //   panelClass: isError ? ["msg-error"] : ["msg-success"]
    // });
  }

}
