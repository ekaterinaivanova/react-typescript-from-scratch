module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['relay', { artifactDirectory: './__generated__/relay/' }],
    '@babel/plugin-transform-runtime',
  ],
};
