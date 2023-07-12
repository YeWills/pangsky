{
  "name": "react-ts-webpack-ui",
  "author":"{{{ author }}}",
  "version": "0.0.1",
  "description": "A react ui library developed with typescript webpack",
  "license": "MIT",
  "module": "dist/index.js",
  "types": "types/index.d.ts",
  "files": [
    "dist",
    "types"
  ],
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack -c scripts/webpack.prod.js",
    "dev": "cross-env NODE_ENV=development webpack serve -c scripts/webpack.dev.js",
    "doc": "dumi dev",
    "docs:build": "dumi build",
    "lint": "npm run lint:es && npm run lint:css",
    "lint:css": "stylelint \"{src,test}/**/*.{css,scss}\"",
    "lint:es": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
    "prepare": "husky install && dumi setup",
    "start": "npm run dev",
    "ts": "tsc"
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "lint-staged": {
    "*.{md,json}": [
      "prettier --write --no-error-on-unmatched-pattern"
    ],
    "*.{css,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --parser=typescript --write"
    ]
  },
  "devDependencies": {
    "@babel/core": "^7.22.8",
    "@babel/preset-env": "^7.22.7",
    "@babel/preset-react": "^7.22.5",
    "@babel/preset-typescript": "^7.22.5",
    "@commitlint/cli": "^17.1.2",
    "@commitlint/config-conventional": "^17.1.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@umijs/lint": "^4.0.0",
    "babel-loader": "^9.1.3",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "css-minimizer-webpack-plugin": "^5.0.1",
    "dumi": "^2.2.0",
    "eslint": "^8.23.0",
    "html-webpack-plugin": "^5.5.3",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "postcss": "^8.4.25",
    "postcss-loader": "^7.3.3",
    "postcss-preset-env": "^9.0.0",
    "prettier": "^2.7.1",
    "prettier-plugin-organize-imports": "^3.0.0",
    "prettier-plugin-packagejson": "^2.2.18",
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "sass": "^1.63.6",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "stylelint": "^14.9.1",
    "typescript": "4.9.5",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "webpack-merge": "^5.9.0"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "engines": {
    "node": "^14.18.0 || >=16.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
