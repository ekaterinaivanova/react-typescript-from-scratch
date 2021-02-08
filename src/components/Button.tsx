import styled from 'styled-components';

interface ButtonProps {
  readonly isInverted?: boolean;
  readonly last?: boolean;
  readonly size?: 'small' | 'medium';
  readonly isIcon?: boolean;
}

const getButtonWidth = (props: ButtonProps): string => {
  if (props.isIcon) {
    return '0';
  } else {
    switch (props.size) {
      case 'small':
        return '8rem';
      case 'medium':
        return '10rem';
      default:
        return '10rem';
    }
  }
};

const MyButton = styled.button<ButtonProps>`
  border-radius: 4px;
  background-color: ${(props) =>
    props.isInverted ? 'white' : props.theme.colors.tertiary.lightest};
  border: ${(props) => (props.isInverted ? '2px' : '1px')} solid
    ${(props) =>
      props.isInverted
        ? props.theme.colors.tertiary.lightest
        : props.theme.colors.dark.light};
  color: ${(props) => props.theme.colors.dark.light};
  text-align: center;
  font-size: ${(props) => (props.size == 'small' ? '1rem' : '1.25rem')};
  font-weight: 500;
  padding: 0.5rem;
  min-width: ${getButtonWidth};
  width: ${(props) => (props.isIcon ? '2rem' : 'auto')};
  height: ${(props) => (props.isIcon ? '2rem' : 'auto')};
  transition: all 0.5s;
  margin-right: ${(props) => (props.last ? '0' : '0.5rem')};
  cursor: pointer;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
    border: ${(props) => (props.isInverted ? '2px' : '1px')} solid
      ${(props) =>
        props.isInverted
          ? props.theme.colors.tertiary.lightest
          : props.theme.colors.dark.light};
  }
`;
export default MyButton;
