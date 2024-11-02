# Documentação Técnica do Componente `Home`

## Índice
1. [Descrição do Componente](#descrição-do-componente)
2. [Estrutura do Componente](#estrutura-do-componente)
3. [Propriedades e Estados](#propriedades-e-estados)
4. [Funções](#funções)
5. [Exemplo de Uso](#exemplo-de-uso)
6. [Testes](#testes)
7. [Links para Documentação Externa](#links-para-documentação-externa)
8. [Contribuições](#contribuições)

## Descrição do Componente
O componente `Home` é uma interface interativa para um banco de dados do universo Star Wars. Ele permite que os usuários filtrem e busquem informações sobre diferentes entidades, como pessoas, planetas, naves e filmes. O componente utiliza a biblioteca Ant Design para componentes de interface de usuário e React para a construção de interfaces dinâmicas.

## Estrutura do Componente
- **Bibliotecas Utilizadas**:
  - **React**: Para a criação de interfaces reativas.
  - **Ant Design**: Para componentes de interface de usuário, como tabelas, botões e modais.
- **Componentes Filhos**:
  - `FilterButtons`: Componente que permite a seleção de filtros para os dados.

## Propriedades e Estados
### Estados Internos
- **`data: DataItem[]`**: Array que armazena os dados a serem exibidos na tabela.
- **`isModalVisible: boolean`**: Controla a visibilidade do modal de detalhes.
- **`selectedItem: DataItem | null`**: Armazena o item selecionado para exibição no modal.
- **`loading: boolean`**: Indica se os dados estão sendo carregados.
- **`filter: FilterType`**: Representa o tipo de filtro atualmente aplicado (ex.: 'main', 'people', 'planets').
- **`searchTerm: string`**: Termo de pesquisa inserido pelo usuário.

### Propriedades Externas
Este componente não possui propriedades externas, pois é um componente de página autônomo.

## Funções
- **`fetchData`**: Função assíncrona que busca dados da API com base no filtro selecionado e os formata para exibição.
  
  ```javascript
  const fetchData = async () => { ... }
  ```

- **`handleFilterChange(filterType: FilterType)`**: Atualiza o estado `filter` com o novo tipo de filtro selecionado.

  ```javascript
  const handleFilterChange = (filterType: FilterType) => { ... }
  ```

- **`handleSearch(value: string)`**: Atualiza o estado `searchTerm` com o valor de pesquisa, aplicando um filtro se o termo tiver 3 ou mais caracteres.

  ```javascript
  const handleSearch = (value: string) => { ... }
  ```

- **`showModal(item: DataItem)`**: Exibe o modal com os detalhes do item selecionado.

  ```javascript
  const showModal = (item: DataItem) => { ... }
  ```

- **`handleCancel()`**: Fecha o modal de detalhes.

  ```javascript
  const handleCancel = () => { ... }
  ```

## Exemplo de Uso
```javascript
import React from 'react';
import Home from './Home';

const App = () => (
  <div>
    <Home />
  </div>
);

export default App;
```

## Testes
Os testes podem ser realizados usando frameworks como Jest e React Testing Library para garantir que o componente funcione conforme esperado. Testes devem cobrir:
- Verificação da renderização correta do componente.
- Funcionalidade de busca.
- Comportamento do modal.
- Aplicação correta dos filtros.

## Links para Documentação Externa
- **React**: [Documentação do React](https://reactjs.org/docs/getting-started.html)
- **Ant Design**: [Documentação do Ant Design](https://ant.design/docs/react/introduce)
- **TypeScript**: [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- **Axios** (ou outra biblioteca de requisições): [Documentação do Axios](https://axios-http.com/docs/intro)

## Contribuições
Contribuições são bem-vindas! Para contribuir:
1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova feature'`).
4. Envie sua branch (`git push origin feature/nome-da-sua-feature`).
5. Abra um Pull Request.
