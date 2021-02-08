import React from 'react';
import { RecipeItem_recipe$key } from '../../__generated__/relay/RecipeItem_recipe.graphql';
import { createFragmentContainer, graphql } from 'react-relay';
import RecipeFrom from './RecipeForm';
import { useFragment } from 'relay-hooks';

interface Props {
  recipe: RecipeItem_recipe$key;
}

const fragmentSpec = graphql`
  fragment RecipeItem_recipe on Recipe {
    id
    content
    title
    userByAuthorId {
      firstName
      lastName
    }
  }
`;

const RecipeItem = ({ recipe }: Props): JSX.Element => {
  const result = useFragment<RecipeItem_recipe$key>(fragmentSpec, recipe);

  if (!result) {
    return <div>Error</div>;
  }
  return (
    <div>
      <h3>{result.title}</h3>
      <p>{result.content}</p>
      <p>
        {result.userByAuthorId?.firstName} {result.userByAuthorId?.lastName}
      </p>
      {/* <RecipeFrom recipe={result} /> */}
    </div>
  );
};
export default RecipeItem;
