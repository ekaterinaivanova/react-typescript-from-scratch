import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledSelect = styled.select`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.tertiary.lightest};
  border: 2px solid ${({ theme }) => theme.colors.tertiary.normal};
  color: ${({ theme }) => theme.colors.dark.light};
  border-radius: 0.25rem;
  min-width: 10rem;
  padding: 0.5rem;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  font-weight: 600;

  //arrow
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${({ theme }) => theme.colors.dark.light} 50%
    ),
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.dark.light} 50%,
      transparent 50%
    ),
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.tertiary.normal},
      ${({ theme }) => theme.colors.tertiary.normal}
    );
  background-position: calc(100% - 1.25rem) 1rem, calc(100% - 0.95rem) 1rem,
    100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
`;
function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();
  return (
    <div className="select">
      <StyledSelect
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="sl">Slovenščina</option>
      </StyledSelect>
    </div>
  );
}
export default LanguageSwitcher;
