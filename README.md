# Pinia State Management

Pinia is the official state management library for Vue 3, designed as the spiritual successor to Vuex. It offers a simpler, more modern, and TypeScript-friendly approach to managing application state.

---

## 🚀 Why Use Pinia?

- **Lightweight & Intuitive** – Minimal boilerplate.
- **Fully TypeScript Supported** – Type-safe state, getters, and actions.
- **DevTools Integration** – Works with Vue DevTools for debugging.
- **Modular Design** – Multiple stores can be used independently.
- **SSR Ready** – Supports server-side rendering.

---

## 📦 Installation

```bash
npm install pinia
```

If using Vue 3:

```js
// main.js or main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
```

---

## 🏗️ Creating a Store

A **store** in Pinia contains `state`, `getters`, and `actions`.

### Example: Counter Store (`stores/counter.js`)

```js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
    reset() {
      this.count = 0;
    },
  },
});
```

---

## 🧩 Using the Store in Components

```vue
<!-- CounterComponent.vue -->
<template>
  <div>
    <h2>Count: {{ counter.count }}</h2>
    <h3>Double: {{ counter.doubleCount }}</h3>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>
```

---

## 🧠 State, Getters, and Actions Explained

### **State:**

Holds your reactive data.

### **Getters:**

Computed properties for derived state.

### **Actions:**

Contain business logic and can be asynchronous.

```js
// Async action example
async fetchCount() {
  const response = await fetch('/api/count')
  const data = await response.json()
  this.count = data.value
}
```

---

## 🧱 Multiple Stores

You can create multiple stores and use them independently.

```js
// stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ name: "", loggedIn: false }),
  actions: {
    login(name) {
      this.name = name;
      this.loggedIn = true;
    },
    logout() {
      this.name = "";
      this.loggedIn = false;
    },
  },
});
```

```vue
<!-- UserProfile.vue -->
<template>
  <div>
    <p v-if="user.loggedIn">Welcome, {{ user.name }}</p>
    <button @click="user.logout" v-if="user.loggedIn">Logout</button>
    <button @click="() => user.login('Alice')" v-else>Login as Alice</button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>
```

---

## 🔄 Using Stores Outside Components

```js
// services/auth.js
import { useUserStore } from "@/stores/user";

export function logoutUser() {
  const userStore = useUserStore();
  userStore.logout();
}
```

---

## 🧩 Composing Stores Together

```js
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({ stats: {} }),
  actions: {
    async fetchStats() {
      const user = useUserStore();
      if (user.loggedIn) {
        const res = await fetch(`/api/stats?user=${user.name}`);
        this.stats = await res.json();
      }
    },
  },
});
```

---

## 🧬 Persisting State

Use **pinia-plugin-persistedstate**:

```bash
npm install pinia-plugin-persistedstate
```

```js
// main.js
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

```js
// stores/user.js
export const useUserStore = defineStore("user", {
  state: () => ({ name: "", loggedIn: false }),
  persist: true,
});
```

---

## 🧩 Using Plugins

Pinia supports plugins for extending functionality.

Example – Custom Logger Plugin:

```js
// plugins/logger.js
export function loggerPlugin({ store }) {
  store.$subscribe((mutation, state) => {
    console.log(`[${mutation.storeId}]`, mutation.events);
  });
}
```

```js
// main.js
pinia.use(loggerPlugin);
```

---

## ⚙️ Server-Side Rendering (SSR)

Pinia integrates easily with SSR setups like Nuxt 3:

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
});
```

Pinia automatically handles hydration of state between server and client.

---

## 🔥 Advanced Features

### 1. **Store Subscriptions**

```js
const counter = useCounterStore();
counter.$subscribe((mutation, state) => {
  console.log("Mutation:", mutation.type);
  console.log("New state:", state);
});
```

### 2. **Resetting a Store**

```js
counter.$reset();
```

### 3. **Hot Module Replacement (HMR)**

```js
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
```

---

## 🧾 Summary

✅ **Pinia** is a modern, minimal, and scalable state management solution for Vue 3.

You learned how to:

- Create and use stores
- Handle state, getters, and actions
- Use multiple stores
- Persist data
- Compose stores
- Extend functionality with plugins
- Integrate with SSR
