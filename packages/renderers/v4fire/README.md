# V4Fire storybook renderer

This renderer leverages global functions such as `initApp` and `renderComponents`,
which are exposed by the `@v4fire/client` package.

The rendering functions are defined within the `@v4fire/client` package
because it utilizes a singleton instance of the custom Vue app during component initialization.
It is crucial that the same app instance is used throughout the rendering.

## For developers

### Building the package

1. `yarn install`
2. `yarn build`

### Build troubleshooting

**DTS build error**

Currently, there is a strange bug in `tsup`, which occurs during the build of `*.d.ts` files.
The type of `createVNode` in `@v4fire/client` is not resolved correctly:

```
DTS Build start
../../../node_modules/@v4fire/client/src/core/component/engines/vue3/render.ts(110,2): error TS4023: Exported variable 'createVNode' has or is using name 'ClassComponent' from external module "./node_modules/@vue/runtime-core/dist/runtime-core" but cannot be named.
../../../node_modules/@v4fire/client/src/core/component/engines/vue3/render.ts(110,2): error TS2527: The inferred type of 'createVNode' references an inaccessible 'unique symbol' type. A type annotation is necessary.
```

To fix this issue, edit line 110 in the
`node_modules/@v4fire/client/src/core/component/engines/vue3/render.ts`:

```TS
export const
	createVNode = wrapCreateVNode(superCreateVNode),
	createElementVNode = wrapCreateElementVNode(superCreateElementVNode);
```

->

```TS
export const
	createVNode: any = wrapCreateVNode(superCreateVNode),
	createElementVNode = wrapCreateElementVNode(superCreateElementVNode);
```