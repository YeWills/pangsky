{
  "name": "@{{pkgName}}js/utils",
  "version": "0.0.2",
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "MIT",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "{{pkgName}}-scripts build",
    "build:deps": "{{pkgName}}-scripts bundleDeps",
    "debug": "pnpm run build && yalc publish",
    "dev": "{{pkgName}}-scripts todo dev",
    "test": "{{pkgName}}-scripts jest-turbo",
    "tsc": "tsc",
    "yalc": "yalc publish"
  },
  "dependencies": {
    "chokidar": "3.5.3",
    "pino": "7.11.0"
  },
  "devDependencies": {
    "@hapi/joi": "17.1.1",
    "@types/color": "3.0.3",
    "@types/cross-spawn": "6.0.2",
    "@types/debug": "4.1.7",
    "@types/hapi__joi": "17.1.8",
    "@types/lodash": "4.14.182",
    "@types/mustache": "4.1.2",
    "@types/prompts": "^2.0.14",
    "@types/rimraf": "3.0.2",
    "@types/semver": "7.3.9",
    "address": "1.1.2",
    "axios": "0.27.2",
    "chalk": "2.4.2",
    "cheerio": "1.0.0-rc.10",
    "color": "4.2.3",
    "cross-spawn": "7.0.3",
    "debug": "4.3.4",
    "deepmerge": "4.2.2",
    "execa": "6.1.0",
    "filesize": "9.0.11",
    "fs-extra": "10.0.1",
    "glob": "8.0.1",
    "gzip-size": "6.0.0",
    "import-lazy": "4.0.0",
    "lodash": "4.17.21",
    "mustache": "4.2.0",
    "pirates": "4.0.5",
    "pkg-up": "4.0.0",
    "portfinder": "1.0.28",
    "prettier": "2.6.2",
    "prompts": "2.4.2",
    "resolve": "1.22.0",
    "rimraf": "3.0.2",
    "semver": "7.3.6",
    "strip-ansi": "7.0.1",
    "yargs-parser": "21.0.1"
  },
  "publishConfig": {
    "access": "public"
  },
  "authors": [
    "chencheng <sorrycc@gmail.com> (https://github.com/sorrycc)"
  ]
}
