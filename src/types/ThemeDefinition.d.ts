// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  interface ThemeShades {
    dark: string;
    darkest: string;
    normal: string;
    light: string;
    lightest: string;
  }

  export interface ColorDefinition {
    background: string;
    material: string;
    error: string;
    light: ThemeShades;
    dark: ThemeShades;
    primary: ThemeShades;
    secondary: ThemeShades;
    tertiary: ThemeShades;
  }

  interface LevelsDefinition {
    background: number;
    content: number;
  }

  export interface DefaultTheme {
    colors: ColorDefinition;
    levels: LevelsDefinition;
  }
}
