import { DefaultTheme, ColorDefinition } from 'styled-components';
import BaseTheme from './BaseTheme';

const colors: ColorDefinition = {
  material: 'hsl(0, 0%, 96%)',
  background: 'hsl(120, 4%, 91%)',
  primary: {
    lightest: '#839699',
    light: '#6B7677',
    normal: '#7A8081',
    dark: '#5B696B',
    darkest: '#4D6062',
  },
  secondary: {
    lightest: '#F9F1D5',
    light: '#C3BEAE',
    normal: '#D3D0C6',
    dark: '#AFA993',
    darkest: '#A0987D',
  },
  tertiary: {
    lightest: '#E3C2CB',
    light: '#B29FA3',
    normal: '#C1B5B8',
    dark: '#A0868D',
    darkest: '#92727A',
  },
  error: '#B00020',
  light: {
    darkest: 'hsl(0, 0%, 52.2%)',
    dark: 'hsl(0, 0%, 63.5%)',
    normal: 'hsl(0, 0%, 75.3%)',
    light: 'hsl(0, 0%, 87.5%)',
    lightest: 'hsl(0, 0%, 93.75%)',
  },
  dark: {
    darkest: 'hsl(0, 0%, 6.5%)',
    dark: 'hsl(0, 0%, 11.8%)',
    normal: 'hsl(0, 0%, 20.8%)',
    light: 'hsl(0, 0%, 30.6%)',
    lightest: 'hsl(0, 0%, 41.2%)',
  },
};

const Theme: DefaultTheme = {
  ...BaseTheme,
  colors,
};

export default Theme;
