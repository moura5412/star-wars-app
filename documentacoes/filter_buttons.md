
# Documentação do Componente `FilterButtons`

## Descrição

O componente `FilterButtons` é responsável por exibir um conjunto de botões que permitem ao usuário filtrar os dados exibidos em um componente pai, como a lista de itens de um banco de dados. Este componente é parte de uma aplicação React e utiliza a biblioteca Ant Design para estilização e funcionalidade dos botões.

## Props

### `activeFilter` (opcional)
- **Tipo**: `FilterType`
- **Descrição**: Define o filtro ativo quando o componente é renderizado. Pode ser um dos seguintes: `"main"`, `"people"`, `"planets"`, `"starships"`, ou `"films"`.

### `onFilterChange`
- **Tipo**: `(filterType: FilterType) => void`
- **Descrição**: Função chamada quando um botão de filtro é clicado. Recebe o tipo de filtro selecionado como argumento.

### `loading`
- **Tipo**: `boolean`
- **Descrição**: Indica se a aplicação está em um estado de carregamento. Quando `true`, o estado de carregamento é exibido em cada botão.

## Comportamento

- O componente mantém o estado do filtro selecionado localmente com o hook `useState`.
- Quando um botão é clicado, ele atualiza o estado local e chama a função `onFilterChange`, passando o novo filtro selecionado.
- Os botões são estilizados com a classe `active` quando correspondem ao filtro atualmente selecionado.
- O componente utiliza o componente `Button` do Ant Design, que fornece estilos e comportamentos padrão.

## Exemplo de Uso

```jsx
import React, { useState } from "react";
import FilterButtons from "./FilterButtons";
import { FilterType } from "../../types/FilterType";

const ParentComponent = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("main");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilterChange = (filterType: FilterType) => {
    setLoading(true);
    // Lógica para atualizar os dados com base no filtro selecionado
    setActiveFilter(filterType);
    setLoading(false);
  };

  return (
    <FilterButtons
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      loading={loading}
    />
  );
};
```

## Estilo

O componente utiliza um arquivo CSS (`filterButtons.css`) para estilos adicionais. A classe `active` é aplicada aos botões filtrados para realçar o botão selecionado.

## Links para Documentação Externa

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Ant Design Documentation](https://ant.design/components/button/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Considerações Finais

O componente `FilterButtons` é uma parte crucial da interface do usuário, permitindo uma navegação intuitiva entre diferentes tipos de dados. A combinação de controle de estado local e comunicação com o componente pai o torna altamente reutilizável e adaptável.
