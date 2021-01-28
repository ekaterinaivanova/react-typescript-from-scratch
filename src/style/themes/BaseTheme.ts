// my-theme.ts
import { DefaultTheme } from 'styled-components';

type DefaultThemeWithNoColors = Omit<DefaultTheme, 'colors'>;

const Theme: DefaultThemeWithNoColors = {
  levels: {
    background: -9999,
    content: 0,
  },
};

export default Theme;
