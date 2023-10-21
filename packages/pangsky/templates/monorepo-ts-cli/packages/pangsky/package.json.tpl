{
  "name": "{{pkgName}}",
  "version": "0.0.2",
  "description": "fast create project",
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "MIT",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "{{pkgName}}": "bin/create-{{pkgName}}.js"
  },
  "files": [
    "dist",
    "templates"
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
    "@{{pkgName}}js/utils": "0.0.2"
  },
  "publishConfig": {
    "access": "public"
  },
  "authors": [
    "chencheng <sorrycc@gmail.com> (https://github.com/sorrycc)"
  ]
}
