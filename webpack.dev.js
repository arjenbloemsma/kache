import {merge} from 'webpack-merge'
import common from './webpack.common.js'

const shouldWatch = globalThis.process.argv.indexOf('--no-watch') === -1
export default () =>
  merge(common(), {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: shouldWatch,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: ['**/*.js', '**/node_modules'],
    },
  })