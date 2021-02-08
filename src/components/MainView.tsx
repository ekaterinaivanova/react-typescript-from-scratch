import React, { Suspense } from 'react';
import { graphql } from 'react-relay';
import RecipeList from './RecipeList';
import { MainViewQuery } from '__generated__/relay/MainViewQuery.graphql';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'relay-hooks';
import TopBar from './TopBar';
import styled from 'styled-components';
const query = graphql`
  query MainViewQuery {
    ...RecipeList_recipes
  }
`;

const MainContainer = styled.div`
  position: relative;
`;
const Content = styled.div`
  position: relative;
  padding: 1.5rem;
`;

const RenderComponent = () => {
  const { t, i18n } = useTranslation(['common']);
  const { data, retry, error, isLoading } = useQuery<MainViewQuery>(
    query,
    {},
    { fetchPolicy: 'store-or-network' },
  );
  if (error || !data) {
    return <div>{t('Error')}!</div>;
  }
  if (isLoading == null) {
    return <div>{t('Loading..')}</div>;
  }
  return (
    <MainContainer>
      <TopBar />
      <Content>
        <RecipeList recipes={data} />
      </Content>
    </MainContainer>
  );
};

export default function App(): JSX.Element {
  return (
    <Suspense fallback="loading...">
      <RenderComponent />
    </Suspense>
  );
}
