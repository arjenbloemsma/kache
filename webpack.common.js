import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

export default () => ({
  entry: {
    // We can use folders in the name part, like so:
    // 'foo/f.js': __dirname + '/f.ts',
    'index.js': `${__dirname}/src/kitkache.ts`,
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name]',
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
})
