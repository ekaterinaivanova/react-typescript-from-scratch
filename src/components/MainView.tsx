import React, { Suspense } from 'react';
import environment from '../relay/Environment';
import { QueryRenderer, graphql, Environment } from 'react-relay';
import RecipeList from './RecipeList';
import { MainViewQueryResponse } from '__generated__/relay/MainViewQuery.graphql';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

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

const RenderComponent = () => {
  const { t, i18n } = useTranslation('common');
  return (
    <div>
      <LanguageSwitcher />
      {t('Loading')}
      <br />
      {t('new Valuew')}
      {t('new translation')}
    </div>
  );
};

export default function App(): JSX.Element {
  return (
    <Suspense fallback="loading...">
      <RenderComponent />
    </Suspense>
  );
}
