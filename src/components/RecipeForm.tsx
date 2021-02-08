import React from 'react';
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  FieldProps,
  FieldArray,
  FormikProps,
} from 'formik';
import { RecipeItem_recipe } from '../../__generated__/relay/RecipeItem_recipe.graphql';
import styled from 'styled-components';
import Button from './Button';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { graphql, Mutation, useMutation } from 'relay-hooks';

interface contentValue {
  value: string;
}
interface Props {
  recipe: RecipeItem_recipe | null;
  onSuccess: () => void;
}

interface Values {
  title: string;
  content: contentValue[];
}

const FormWrapper = styled(Form)`
  display: grid;
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledLabel = styled.label`
  margin-right: 12px;
  align-self: center;
  color: ${({ theme }) => theme.colors.dark.light};
`;
const StyledLabelArea = styled(StyledLabel)`
  align-self: flex-start;
`;

const StyledTextarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.light.dark};
  border-radius: 4px;
  flex: 1;
  margin-right: 1.75rem;
  height: 8rem;
  padding: 0.5rem;
  &:focus {
    outline: none !important;
    border: 1px solid ${({ theme }) => theme.colors.tertiary.lightest};
  }
`;
const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.light.dark};
  border-radius: 4px;
  flex: 1;
  height: 1rem;
  padding: 0.5rem;
  &:focus {
    outline: none !important;
    border: 1px solid ${({ theme }) => theme.colors.tertiary.lightest};
  }
`;

const AddButtonContainer = styled.div`
  float: right;
  margin-bottom: 0.75rem;
`;
const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RecipesContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.light.dark};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.light.lightest};
  padding: 0.75rem;
  margin-bottom: 1.25rem;
`;

const RecipeCard = styled.div`
  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.light.dark};
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.material};
  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

const RemoveButton = styled(Button)`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  margin: 0;
  border: none;
  background-color: inherit;
  padding: 0;
  span {
    position: relative;
  }
  span::after {
    content: '\\1D605';
    inset: 3px 1px 1px 1px;
  }
`;

const ContentTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary.darkest};
  font-weight: 500;
  margin: 1.5rem 0;
`;
const RecipeForm = ({ recipe, onSuccess }: Props): JSX.Element => {
  const { t } = useTranslation('common');

  const [mutate, { loading }] = useMutation(
    graphql`
      mutation RecipeFormMutation($input: CreateRecipeInput!) {
        createRecipe(input: $input) {
          recipe {
            id
            authorId
            content
            createdDate
            title
          }
        }
      }
    `,
    {
      onCompleted: (result) => {
        console.log('onCompleted Mutation result', result);
        onSuccess();
      },
      onError: (err) => {
        console.log('err', err);
      },
    },
  );

  let values: Values = {
    title: '',
    content: [],
  };
  if (recipe != null) {
    let content: contentValue[];
    try {
      content = Object.values(
        JSON.parse(recipe.content),
      ).map((item: string) => ({ value: item }));
    } catch {
      console.error("Couldn't parse content");
      content = [{ value: '' }];
    }
    values = {
      title: recipe.title,
      content,
    };
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        console.log(values);
        const recipe = {
          title: values.title,
          content: JSON.stringify(
            values.content.reduce(
              (res, step, index) => ({
                ...res,
                [index]: step.value,
              }),
              {},
            ),
          ),
          authorId: '68c41d48-e429-4071-95a5-b9026ab112b6',
        };

        mutate({
          variables: {
            input: { recipe },
          },
        });
        console.log('recipe', recipe);
      }}
    >
      {(props: FormikProps<Values>) => {
        const { values: formValues } = props;
        return (
          <FormWrapper>
            <Field name="title">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: FieldProps<string>) => (
                <StyledField>
                  <StyledLabel htmlFor="title">Title</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Recipe title"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </StyledField>
              )}
            </Field>
            <FieldArray
              name="content"
              render={(arrayHelpers) => (
                <div>
                  <ContentTitle>Recipe steps</ContentTitle>
                  <RecipesContainer>
                    {formValues.content.length < 1 ? (
                      <p>There are no steps yet</p>
                    ) : null}
                    {formValues.content.map((_, index) => (
                      <RecipeCard key={index}>
                        {/** both these conventions do the same */}
                        <Field name={`content[${index}].value`}>
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }: FieldProps<string>) => (
                            <StyledField>
                              <StyledLabelArea htmlFor="title">
                                {index + 1}
                              </StyledLabelArea>
                              <StyledTextarea
                                placeholder={t('addStepPlaceholder', {
                                  defaultValue: 'Recipe step',
                                })}
                                {...field}
                              />
                              {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                              )}
                              <RemoveButton
                                size="small"
                                isIcon={true}
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <span></span>
                              </RemoveButton>
                            </StyledField>
                          )}
                        </Field>
                      </RecipeCard>
                    ))}
                  </RecipesContainer>

                  <AddButtonContainer>
                    <Button
                      type="button"
                      size="small"
                      isInverted={true}
                      onClick={() => {
                        arrayHelpers.push({ value: '' });
                      }}
                    >
                      {t('Add step')} +
                    </Button>
                  </AddButtonContainer>
                </div>
              )}
            />

            <SubmitButtonContainer>
              <Button size="small" type="submit">
                Submit
              </Button>
            </SubmitButtonContainer>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default RecipeForm;
