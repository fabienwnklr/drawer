[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / utils/perf

# Module: utils/perf

## Table of contents

### Functions

- [debounce](utils_perf.md#debounce)
- [measureTime](utils_perf.md#measuretime)
- [throttle](utils_perf.md#throttle)

## Functions

### debounce

▸ **debounce**<`T`\>(`callback`, `delay?`): (...`args`: `Parameters`<`T`\>) => `void`

permet de déclencher l'appel à une fonction après un certain délai (un peu comme la fonction setTimeout())
mais permet en plus de réinitialiser le timer si on demande une nouvelle exécution dans un intervalle de temps plus court que le délai

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | `T` | `undefined` | Fonction à appeler |
| `delay` | `number` | `300` | Timeout avant éxécution de la méthode |

#### Returns

`fn`

▸ (`...args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`T`\> |

##### Returns

`void`

**`Example`**

```ts
// Define the function that updates the layout
function updateLayout() {
// Update the layout...
}
// Create a debounced version of the function
const debouncedUpdateLayout = debounce(updateLayout, 250);

// Listen for window resize events and call the debounced function
window.addEventListener("resize", debouncedUpdateLayout);
```

#### Defined in

[src/utils/perf.ts:22](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/perf.ts#L22)

___

### measureTime

▸ **measureTime**<`T`\>(`func`, `label`): `void`

Measure time executing function

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `T` |
| `label` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/perf.ts:81](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/perf.ts#L81)

___

### throttle

▸ **throttle**<`T`\>(`func`, `limit?`): [`ThrottledFunction`](types_utils.md#throttledfunction)<`T`\>

La fonction throttle permet d'éviter des appels consécutifs en introduisant un délai.
Elle servira surtout lorsque l'on écoutera des évènements pouvant se produire un très
grand nombre de fois dans un intervalle de temps très court (scroll, resize, mouseMove...).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `func` | `T` | `undefined` |
| `limit` | `number` | `100` |

#### Returns

[`ThrottledFunction`](types_utils.md#throttledfunction)<`T`\>

**`Example`**

```ts
// Define the function that updates the layout
function updateLayout() {
  // Update the layout...
}

// Create a throttled version of the function
const throttledUpdateLayout = throttle(updateLayout, 250);

// Listen for window scroll events and call the throttled function
window.addEventListener("scroll", throttledUpdateLayout);
```

#### Defined in

[src/utils/perf.ts:58](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/perf.ts#L58)
