const path = require('path');

module.exports = {
  "extends": [
    "react-app",
  ],
  "settings": {
    "import/resolver": {
      node: { paths: [path.resolve('./src')]}
    },
  },
  "rules": {
    "class-methods-use-this": 0,
    "react/jsx-filename-extennsion": 0,
    "jsx-ally/href-no-hash": 0,
    "no-unused-vars": 1,
    "arrow-body-style": 0,
    "import/prefer-default-export": 1,
    "react/prop-types": 0
  }
}