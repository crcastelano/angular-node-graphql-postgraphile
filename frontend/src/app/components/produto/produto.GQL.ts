import { Observable } from 'rxjs/internal/Observable';
import { pluck } from 'rxjs/internal/operators/pluck';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProdutoGQL {

  constructor(private apollo: Apollo) { }

  private getAllProdutoQuery = gql`
    query getAllProduto {
      produtos(first: 50) {
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

  private getAllTipoAnexoCadastroInteressadoQuery = gql`
    query getAllTipoAnexoCadastroInteressado($filter: TipoAnexoCadastroInteressadoFilterInput) {
      getAllTipoAnexoCadastroInteressado(filter: $filter) {
        id
        descricao
      }
    }
  `;

  private createProdutoMutation = gql`
    mutation createProduto($input: ProdutoCreateInput!) {
      createProduto(input: $input) {
        id
        nome
        descricao
        estoque
        precoVenda
    }
  }
  `;

  private createCadastroInteressadoMutation = gql`
    mutation createCadastroInteressado($input: CadastroInteressadoCreateInput!) {
      createCadastroInteressado(input: $input) {
        id
        nome
        sexo
        id_usuario_cadastro
        id_usuario
        membroFamiliaInteressado{
          id
        nome
          relacao_parentesco
        }
        areaInteresse{
          id
          identificacao
        }
        conjugeInteressado{
          id
          nome
        }
    }
  }
  `;

  private updateCadastroInteressadoMutation = gql`
    mutation updateCadastroInteressado($input: CadastroInteressadoUpdateInput!) {
      updateCadastroInteressado(input: $input) {
        id
        created_at
        updated_at
        deleted_at
        membroFamiliaInteressado {
          id
          nome
          data_nascimento
          cpf
          relacao_parentesco
        }
        areaInteresse {
          id
          identificacao
        }
        conjugeInteressado {
          id,
          nome,
          cpf,
          rg,
          data_nascimento,
          sexo,
          naturalidade_municipio,
          naturalidade_uf,
          nacionalidade,
          profissao,
          nome_mae,
          nome_pai,
        }
        codigo_funcional
        interessado_servidor
        data_admissao
        data_cadastro
        nome
        cpf
        rg
        data_nascimento
        sexo
        naturalidade_municipio
        naturalidade_uf
        nacionalidade
        nome_mae
        nome_pai
        email
        telefone_pessoal
        telefone_comercial
        profissao
        tipo_moradia_atual
        perdeu_imovel_desastre
        residencial_logradouro
        residencial_numero
        residencial_complemento
        residencial_bairro
        residencial_cep
        comercial_logradouro
        comercial_numero
        comercial_complemento
        comercial_bairro
        comercial_cep
        estado_civil
        renda_bruta_familiar
        numero_pessoas_familia
        crianca
        idoso
        morador_area_risco
        lei_maria_penha
        situacao_rua
        doenca_cronica
        deficiencia
        mulher_chefe_familia
        membro_familiar_com_microcefalia
        data_atualizacao
        nome_atualizador
        empreendimento
        numero_contrato_financiamento
        data_assinatura_contrato
        valor_repasse
        data_repasse
        numero_processo_administrativo
        observacoes
      }
    }
  `;

  public getAllProduto(): Observable<any> {
    return this.apollo.query<any>({
      query: this.getAllProdutoQuery,
      variables: {},
    }).pipe(pluck('data', 'produtos'));
  }

  public createProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.createProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'createProduto'));
  }

  public getAllTipoAnexoCadastroInteressado(): Observable<any> {
    return this.apollo.query<any>({
      query: this.getAllTipoAnexoCadastroInteressadoQuery,
      variables: {},
    }).pipe(pluck('data', 'getAllTipoAnexoCadastroInteressado'));
  }

  public createCadastroInteressado(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.createCadastroInteressadoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'createCadastroInteressado'));
  }

  public updateCadastroInteressado(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.updateCadastroInteressadoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'updateCadastroInteressado'));
  }

}

