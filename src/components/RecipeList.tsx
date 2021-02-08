import React, { useState } from 'react';
import { RecipeList_recipes$key } from '../../__generated__/relay/RecipeList_recipes.graphql';
import styled from 'styled-components';
import { graphql } from 'react-relay';
import RecipeItem from './RecipeItem';
import { usePaginationFragment } from 'relay-hooks';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import Form from './RecipeForm';
import Button from './Button';
interface Props {
  recipes: RecipeList_recipes$key;
}

const ItemContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
  background-color: ${({ theme }) => theme.colors.material};
`;

const ButtonContainer = styled.div`
  float: right;
`;

const fragmentSpec = graphql`
  fragment RecipeList_recipes on Query
  @refetchable(queryName: "RecipeQuery")
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
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
`;
Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  position: absolute;
  inset: 40px;
  border: 1px solid ${({ theme }) => theme.colors.light.normal};
  background: ${({ theme }) => theme.colors.material};
  overflow: auto;
  border-radius: 4px;
  outline: none;
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light.normal};
`;
const ModalContent = styled.div`
  padding: 1rem;
`;

const ModalTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary.normal};
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

export default function RecipeList({ recipes }: Props): JSX.Element {
  const { t } = useTranslation('common');
  const [modalIsOpen, setIsOpen] = useState(false);

  const { data, loadNext, hasNext, refetch } = usePaginationFragment(
    fragmentSpec,
    recipes,
  );

  const noItem = "Couldn't load item";

  function afterOpenModal() {
    console.log('OPeend');
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onItemCreate = () => {
    closeModal();
    refetch({});
  };

  if (data?.allRecipes?.edges != null) {
    const recipeItems = data.allRecipes.edges.map(({ node }, index) => {
      if (node == null) {
        return <p>{noItem}</p>;
      }
      return (
        <ItemContainer key={node.id}>
          {index}. <RecipeItem recipe={node} />
        </ItemContainer>
      );
    });
    return (
      <>
        {recipeItems}

        <ButtonContainer>
          <Button
            isInverted={true}
            disabled={!hasNext}
            onClick={() => loadNext(5)}
          >
            {t('loadMore', { defaultValue: 'Load more' })}
          </Button>

          <Button
            last={true}
            isInverted={false}
            onClick={() => setIsOpen(true)}
          >
            {t('addRecipe', { defaultValue: 'Add recipe' })}
          </Button>

          <StyledModal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <ModalHeader>
              <ModalTitle>
                {t('addRecipeTitle', { defaultValue: 'Add New Recipe' })}
              </ModalTitle>
            </ModalHeader>
            <ModalContent>
              <Form onSuccess={onItemCreate} recipe={null} />
            </ModalContent>
          </StyledModal>
        </ButtonContainer>
      </>
    );
  } else {
    return <div>Error</div>;
  }
}
