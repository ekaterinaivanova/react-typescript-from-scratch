import React from 'react';
import environment from '../relay/Environment';
import { QueryRenderer, graphql, Environment } from 'react-relay';
import RecipeList from './RecipeList';
import { MainViewQueryResponse } from '__generated__/relay/MainViewQuery.graphql';

const query = graphql`
  query MainViewQuery {
    ...RecipeList_recipes
  }
`;

interface Props {
  error: Error | null;
  props: MainViewQueryResponse;
  retry: (() => void) | null;
}

const renderComponent = ({ error, props }: Props) => {
  if (error) {
    return <div>Error!</div>;
  }
  if (props == null) {
    return <div>Loading..</div>;
  }
  return <RecipeList recipes={props} />;
};

const App = function (): JSX.Element {
  return (
    <QueryRenderer
      environment={environment as Environment}
      query={query}
      render={renderComponent}
      variables={{}}
      fetchPolicy="store-and-network"
    />
  );
};

export default App;
