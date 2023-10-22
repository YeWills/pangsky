{
  "private": true,
  "author":"{{{ author }}}",
  "scripts": {
    "build": "{{pkgName}}-scripts turbo build",
    "build:release": "{{pkgName}}-scripts turbo build --no-cache",
    "dev": "{{pkgName}}-scripts turbo dev --parallel",
    "doc": "dumi dev",
    "docs:build": "dumi build",
    "format": "prettier --cache --write .",
    "preinstall": "npx only-allow pnpm",
    "postinstall": "{{pkgName}}-scripts postinstall",
    "prepare": "husky install",
    "release": "{{pkgName}}-scripts release",
    "release:d": "{{pkgName}}-scripts release --debug",
    "tsc": "pnpm --filter \"./packages/**\" tsc",
    "turbo:clean": "rimraf .turbo",
    "yalc": "{{pkgName}}-scripts turbo yalc"
  },
  "lint-staged": {
    "*.{jsx,less,md,json}": [
      "prettier --cache --write"
    ],
    "*.ts?(x)": [
      "prettier --cache --parser=typescript --write"
    ]
  },
  "devDependencies": {
    "@babel/cli": "^7.22.6",
    "@babel/core": "^7.22.6",
    "@babel/preset-env": "^7.22.6",
    "@babel/preset-typescript": "^7.22.5",
    "@pnpm/lockfile-file": "^5.0.3",
    "@pnpm/logger": "^4.0.0",
    "@{{pkgName}}js/utils": "workspace:*",
    "@types/fs-extra": "^9.0.13",
    "@types/node": "^17.0.35",
    "@types/react": "^18.0.9",
    "@types/react-dom": "^18.0.5",
    "@types/resolve": "^1.20.2",
    "@types/rimraf": "3.0.2",
    "@types/cross-spawn": "6.0.2",
    "@types/yargs-parser": "^21.0.2",
    "@vercel/ncc": "0.33.3",
    "dts-packer": "^0.0.3",
    "dumi": "^2.2.1",
    "expect-playwright": "^0.8.0",
    "git-repo-info": "^2.1.1",
    "husky": "^7.0.4",
    "lerna": "^4.0.0",
    "lint-staged": "^12.3.7",
    "matcher": "^5.0.0",
    "only-allow": "^1.1.0",
    "prettier": "^2.7.1",
    "prettier-plugin-organize-imports": "^2.3.4",
    "prettier-plugin-packagejson": "^2.2.18",
    "{{pkgName}}": "workspace:*",
    "{{pkgName}}-scripts": "workspace:*",
    "regenerator-runtime": "^0.13.9",
    "resolve": "^1.22.0",
    "rimraf": "^3.0.2",
     "chalk": "2.4.2",
    "tsx": "3.9.0",
    "turbo": "1.5.4",
    "typescript": "^4.8.4",
    "uglify-js": "^3.15.4",
    "zx": "^7.0.8"
  },
  "packageManager": "pnpm@7.3.0",
  "engines": {
    "node": ">=14",
    "pnpm": ">=7"
  },
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "dva",
        "postcss",
        "webpack",
        "eslint",
        "stylelint",
        "redux"
      ]
    }
  },
  "_local": "This flag is used to check if the development in local, Please do not delete."
}
