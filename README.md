# zanders-pingpong

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Vite (client side code) + CF functions (server side) together locally

Two terminals, in first one, do: `npx vite build --watch` which will watch code changes and post them in the dist folder
Second terminal, do: `npx wrangler pages dev dist` which will start the cloudflare functions, but since its pointed to dist it will also run the client side code.

Drawback: there is no more automatic reloading on the website itself and its slower

# D1:

`npx wrangler pages dev dist --d1=DB`

