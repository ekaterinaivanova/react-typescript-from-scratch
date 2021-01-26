import React from 'react';
import { RecipeList_recipes$data } from '../../__generated__/relay/RecipeList_recipes.graphql';

import {
  createPaginationContainer,
  RelayPaginationProp,
  graphql,
} from 'react-relay';
import RecipeItem from './RecipeItem';

interface Props {
  recipes: RecipeList_recipes$data | null;
  relay: RelayPaginationProp;
}

function RecipeList({ recipes, relay }: Props) {
  function loadMore() {
    const hasMore = relay.hasMore();
    if (hasMore) {
      relay.loadMore(3);
    }
  }
  if (!recipes) {
    return <div>Error</div>;
  }
  const hasMore = relay.hasMore();
  const noItem = "Couldn't load item";
  if (recipes?.allRecipes?.edges != null) {
    const recipeItems = recipes.allRecipes.edges.map(({ node }, index) => {
      if (node == null) {
        return <p>{noItem}</p>;
      }
      return (
        <div style={{ padding: '8px', border: '1px solid grey' }} key={node.id}>
          {index}. <RecipeItem recipe={node} />
        </div>
      );
    });
    return (
      <>
        {recipeItems}
        <button disabled={!hasMore} onClick={() => loadMore()}>
          Load more
        </button>
      </>
    );
  } else {
    return <div>Error </div>;
  }
}

export default createPaginationContainer(
  RecipeList,
  {
    recipes: graphql`
      fragment RecipeList_recipes on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 3 }
        after: { type: "Cursor" }
      ) {
        allRecipes: allRecipes(first: $first, after: $after)
          @connection(key: "RecipeList_allRecipes") {
          edges {
            node {
              id
              ...RecipeItem_recipe
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query RecipeListRefetchQuery($first: Int!, $after: Cursor) {
        ...RecipeList_recipes @arguments(first: $first, after: $after)
      }
    `,
    getVariables: (props, paginationInfo) => {
      console.log(
        'getVariables __ props, paginationInfo',
        props,
        paginationInfo,
      );
      return {
        first: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  },
);
