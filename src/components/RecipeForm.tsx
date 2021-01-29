import React, { FC } from 'react';
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
import * as Yup from 'yup';

interface contentValue {
  value: string;
}
interface Props {
  recipe: RecipeItem_recipe | null;
}

interface Values {
  title: string;
  content: contentValue[];
}

const FormWrapper = styled(Form)`
  display: grid;
`;

const StyledField = styled.div`
  padding 8px 4px;
`;
const StyledLabel = styled.label`
  margin-right: 12px;
`;

const StyledTextarea = styled.textarea`
  border: 3px solid ${({ theme }) => theme.colors.light.dark};
  border-radius: 4px;
  width: 100%;
  max-width: 591px;
  height: 51px;
  &:focus {
    outline: none !important;
    border: 3px solid ${({ theme }) => theme.colors.tertiary.lightest};
  }
`;

const RecipeForm = ({ recipe }: Props) => {
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          console.log('values', values);
          setSubmitting(false);
        }, 500);
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
                  <input type="text" placeholder="Recipe title" {...field} />
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
                  {formValues.content.map((_, index) => (
                    <div key={index}>
                      {/** both these conventions do the same */}
                      <Field name={`content[${index}].value`}>
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }: FieldProps<string>) => (
                          <StyledField>
                            <StyledLabel htmlFor="title">Title</StyledLabel>
                            <StyledTextarea placeholder="add step" {...field} />
                            {meta.touched && meta.error && (
                              <div className="error">{meta.error}</div>
                            )}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                          </StyledField>
                        )}
                      </Field>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      arrayHelpers.push({ value: 'krnekaj' });
                      console.log('arrayHelpers', arrayHelpers, values);
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            />

            <button type="submit">Submit</button>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default RecipeForm;
