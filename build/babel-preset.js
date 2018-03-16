const BABEL_ENV = process.env.BABEL_ENV
const building = BABEL_ENV !== undefined && BABEL_ENV !== 'cjs'

const basePlugins = ['transform-class-properties', 'transform-object-rest-spread']

const umdPlugins = ['external-helpers']

const productionPlugins = ['dev-expression']

const plugins = [
  ...basePlugins,
  ...(BABEL_ENV === 'umd' ? umdPlugins : []),
  ...(BABEL_ENV === 'production' ? productionPlugins : [])
]

module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: building ? false : 'commonjs',
      },
    ],
    'react',
  ],
  plugins: plugins,
}
