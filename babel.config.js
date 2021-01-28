module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    ['relay', { artifactDirectory: './__generated__/relay/' }],
    '@babel/plugin-transform-runtime',
  ],
};
