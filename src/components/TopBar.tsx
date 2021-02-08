import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSwitcher from './LanguageSwitcher';

const BarWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  overflow: hidden;
`;
const Title = styled.h1`
  float: left;
  display: block;
  color: ${({ theme }) => theme.colors.tertiary.lightest};
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 32px;
  font-weight: 500;
  text-decoration: underline;
`;

const LanguageSwitcherContainer = styled.div`
  float: right;
  border: none;
  padding: 20px;
`;

function TopBar(): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <BarWrapper>
      <Title>{t('Gluttonous', { defaultValue: 'Gluttonous' })}</Title>
      <LanguageSwitcherContainer>
        <LanguageSwitcher />
      </LanguageSwitcherContainer>
    </BarWrapper>
  );
}
export default TopBar;
