module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'i18next-extract',
      {
        nsSeparator: ':',
        locales: ['en', 'ru', 'sl'],
        useI18nextDefaultValue: true,
        discardOldKeys: true,
      },
    ],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    ['relay', { artifactDirectory: './__generated__/relay/' }],
    '@babel/plugin-transform-runtime',
  ],
};
