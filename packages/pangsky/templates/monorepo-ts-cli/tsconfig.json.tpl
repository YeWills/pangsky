{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"],
      "@pskyjs/utils": ["./packages/utils"]
    }
  }
}
