import React from 'react';
import { RecipeItem_recipe } from '../../__generated__/relay/RecipeItem_recipe.graphql';
import { createFragmentContainer, graphql } from 'react-relay';

interface Props {
  recipe: RecipeItem_recipe | null;
}

function RecipeList({ recipe }: Props) {
  if (!recipe) {
    return <div>Error</div>;
  }
  return (
    <div>
      <h3>{recipe.title}</h3>
      <p>{recipe.content}</p>
      <p>
        {recipe.userByAuthorId?.firstName} {recipe.userByAuthorId?.lastName}
      </p>
    </div>
  );
}

export default createFragmentContainer(RecipeList, {
  recipe: graphql`
    fragment RecipeItem_recipe on Recipe {
      id
      content
      title
      userByAuthorId {
        firstName
        lastName
      }
    }
  `,
});
