const path = require('path');

module.exports = {
  entry: './src/content-script.js',
  output: {
    filename: 'content-script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};