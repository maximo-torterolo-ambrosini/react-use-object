# 🌵📦 react-use-object

> A tiny React hook for managing class-based objects with reactive state updates — no setState needed.

[![npm version](https://img.shields.io/npm/v/@cactusjackson/react-use-object)](https://www.npmjs.com/package/@cactusjackson/react-use-object)
[![License](https://img.shields.io/npm/l/@cactusjackson/react-use-object)](LICENSE)

---

## 🚀 Install

```bash
npm install react-use-object
```

Or with yarn:

```bash
yarn add react-use-object
```

---

## ✨ Why?

React state works great for primitives and plain objects, but managing **mutable class instances** (e.g., models with private fields and methods) can be tricky.

This hook lets you use any class and re-render your component when **you mutate it through specific methods** — without needing `setState`.

---

## 🧠 Example

```js
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  name() { return this.#name; }
  age() { return this.#age; }

  birthday() { this.#age++; }

  static named(name, age) {
    return new Person(name, age);
  }
}
```

```jsx
import { useObject } from 'react-use-object';

function App() {
  const [name, setName] = useState("Mateo");

  const person = useObject(() => Person.named(name, 20), [name], ['birthday']);

  return (
    <div>
      <p>{person.name()} is {person.age()} years old</p>
      <button onClick={person.birthday}>Birthday 🎂</button>
    </div>
  );
}
```

---

## ⚙️ API

```ts
useObject<T>(
  factoryFn: () => T,
  deps?: any[],
  mutatingMethods?: string[]
): T
```

### Parameters:

- `factoryFn`: Function that returns a new instance of your object/class.
- `deps`: (optional) React dependency array – triggers recreation when changed.
- `mutatingMethods`: (optional) An array of method names that, when called, trigger re-render.

### Returns:

- A Proxy-wrapped instance of your object that triggers re-renders when specified methods are called.

---

## 🧪 Testing

This project uses [Vitest](https://vitest.dev) for unit testing.

```bash
npm run tests
```

---

## 📦 Bundle info

- CommonJS + ESM exports
- Includes TypeScript types (`.d.ts`)
- Lightweight, no dependencies (just needs React)

---

## 🛠 Contributing

PRs, bug reports, and suggestions welcome 🙌  
Just fork the repo and run:

```bash
npm install
npm run playground
```

---

## 📄 License

MIT — feel free to use in personal or commercial projects.
