import { Produto } from '../produto.model';
import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { ProdutoGQL } from '../produto.GQL';

//import { ProdutoService } from '../produto.service';

const Allquery = gql`
  query getAll {
    produtos(last: 5) {
      nodes {
        id
        nome
        descricao
        precoVenda
        estoque
      }
    }
  }
`;

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  colunas = ['id', 'nome', 'descricao', 'estoque', 'precoVenda', 'action'];

  constructor(
    private router: Router,
    // private apollo: Apollo,
    private produtoGQL: ProdutoGQL
  ) {}

  ngOnInit() {
    this.produtoGQL.getAllProduto().subscribe( response => {
      this.dataSource = new MatTableDataSource(response.nodes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    }
    );

    // this.apollo.query({
    //   query: Allquery
    // }).subscribe(res => {
    //   this.resp = res;
    //   this.produtos = this.resp.data.produtos.nodes;
    //   this.dataSource = new MatTableDataSource(this.produtos);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    //   this.isLoadingResults = false;
    // });
  }

  navigateToProdutoCreate(): void {
    this.router.navigate(['/produtos/create']);
  }

  update(id) {
    // this.router.navigate(['/produtos/update/' + id]);
  }

  delete(id: number) {
    // if (window.confirm('Confirma exclusão do produto ?' + id)) {
    //   this.produtoService.delete(id)
    //     .subscribe(
    //       response => {
    //         this.produtoService.showMessage('Produto Excluído com sucesso !!!');
    //         this.ngOnInit();
    //       },
    //       error => {
    //         this.produtoService.showMessage('Erro na exclusão do produto !' + error.error.error);
    //       });
    // }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
