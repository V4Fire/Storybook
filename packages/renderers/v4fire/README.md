# V4Fire storybook renderer

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
../../../node_modules/@v4fire/client/src/core/component/engines/vue3/render.ts(110,2): error TS4023: Exported variable 'createVNode' has or is using name 'ClassComponent' from external module "/Users/dlartagnan/Documents/Projects/v4fire/Storybook/node_modules/@vue/runtime-core/dist/runtime-core" but cannot be named.
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