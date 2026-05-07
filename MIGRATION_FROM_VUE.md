# Migration from Vue3 to React

This document outlines the key differences between the Vue3 and React implementations of the same application.

## Framework Differences

### Component Structure

**Vue3 (Composition API)**
```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const message = ref('Hello');
</script>
```

**React (Hooks)**
```tsx
import React, { useState } from 'react';

const Component: React.FC = () => {
  const [message, setMessage] = useState('Hello');
  return <div>{message}</div>;
};
```

### State Management

**Vue3**
- Uses `ref()` and `reactive()` for reactive state
- Automatic reactivity tracking
- Direct mutation of reactive objects

**React**
- Uses `useState()` hook
- Immutable state updates
- Requires explicit state setters

### Lifecycle

**Vue3**
```typescript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Component mounted
});

onUnmounted(() => {
  // Component unmounted
});
```

**React**
```typescript
import { useEffect } from 'react';

useEffect(() => {
  // Component mounted
  return () => {
    // Component unmounted
  };
}, []);
```

## UI Library Differences

### Vue3: Ant Design Vue + Castor UI

The Vue3 version uses `@castor-ui/castor-antdv`, which provides:
- `ca-common-query` - Pre-built query component
- `ca-common-table` - Pre-built table component
- `ca-common-form` - Pre-built form component

These components handle much of the boilerplate code internally.

### React: Ant Design React

The React version uses standard `antd` components:
- Custom `CommonQuery` component built with `Form`, `Input`, `Select`
- Custom `CommonTable` component built with `Table`
- Custom `CommonForm` component built with `Form`, `Input`, `Upload`, etc.

This provides more control but requires more code.

## Key Implementation Differences

### 1. Form Handling

**Vue3 (with Castor UI)**
```typescript
const form = reactive<CommonForm>({
  model: { code: '', name: '' },
  fields: computed(() => [...]),
  emitRegister: { handleSave, handleCancel }
});
```

**React**
```typescript
const [formModel, setFormModel] = useState<UserModel>({
  code: '', name: '', ...
});
const [form] = Form.useForm();
```

### 2. Table Pagination

**Vue3**
```typescript
const table = reactive<CommonTable>({
  pagination: { current: 1, pageSize: 10, total: 0 }
});
```

**React**
```typescript
const [pagination, setPagination] = useState<PaginationConfig>({
  current: 1, pageSize: 10, total: 0
});
```

### 3. Modal Visibility

**Vue3**
```vue
<Modal v-model:open="form.visible">
```

**React**
```tsx
<Modal open={formVisible} onCancel={handleFormCancel}>
```

### 4. Event Handling

**Vue3**
```typescript
const emitRegister = {
  handleFilter,
  handleReset,
  handleAdd,
  // ...
};
```

**React**
```typescript
// Direct prop passing
<CommonQuery
  onFilter={handleFilter}
  onReset={handleReset}
/>
```

## File Structure Comparison

### Vue3
```
src/
├── views/user/
│   ├── index.vue              # Main component
│   └── hooks/
│       ├── useCommonForm.ts   # Form logic
│       ├── useCommonQuery.ts  # Query logic
│       └── useCommonTable.ts  # Table logic
```

### React
```
src/
├── components/
│   ├── CommonQuery/           # Reusable query component
│   ├── CommonTable/           # Reusable table component
│   └── CommonForm/            # Reusable form component
└── views/user/
    └── index.tsx              # Main component with all logic
```

## Advantages of Each Approach

### Vue3 + Castor UI

**Pros:**
- Less boilerplate code
- Pre-built components handle common patterns
- Automatic reactivity
- Cleaner template syntax

**Cons:**
- Less control over component internals
- Dependency on Castor UI library
- Learning curve for Castor UI API

### React + Ant Design

**Pros:**
- Full control over component behavior
- Standard Ant Design components (widely used)
- More explicit state management
- Easier to customize

**Cons:**
- More boilerplate code
- Manual state management
- More code to maintain

## Common Patterns Preserved

Both implementations maintain the same:

1. **API Integration** - Same AutoAPI generated code
2. **Business Logic** - Same CRUD operations
3. **Validation Rules** - Same form validation
4. **User Experience** - Same UI/UX flow
5. **Features** - All features are equivalent

## Migration Tips

If migrating from Vue3 to React:

1. **State Management**: Replace `ref()`/`reactive()` with `useState()`
2. **Computed Properties**: Replace `computed()` with `useMemo()`
3. **Watchers**: Replace `watch()` with `useEffect()`
4. **Template Directives**: Replace `v-if`, `v-for` with JSX conditionals and `.map()`
5. **Two-way Binding**: Replace `v-model` with controlled components
6. **Event Handling**: Replace `@click` with `onClick`

## Performance Considerations

### Vue3
- Automatic dependency tracking
- Fine-grained reactivity
- Smaller bundle size with Composition API

### React
- Manual dependency arrays in `useEffect`
- Virtual DOM diffing
- Larger bundle size (but optimizable with code splitting)

## Conclusion

Both implementations achieve the same functionality with different approaches:

- **Vue3** is more concise with Castor UI abstractions
- **React** is more explicit with standard Ant Design components

Choose based on:
- Team expertise
- Project requirements
- Ecosystem preferences
- Performance needs
