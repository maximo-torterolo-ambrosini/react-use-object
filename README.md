# 🌵📦 react-use-object

> A tiny React hook for managing class-based objects with reactive state updates — no setState needed.

[![npm version](https://img.shields.io/npm/v/@cactusjackson/react-use-object)](https://www.npmjs.com/package/@cactusjackson/react-use-object)
[![License](https://img.shields.io/npm/l/%40cactusjackson%2Freact-use-object)](LICENSE)

---

## 🚀 Install

```bash
npm install @cactusjackson/react-use-object
```

Or with yarn:

```bash
yarn add @cactusjackson/react-use-object
```

---

## 🔍 Comparison with Other State Management Solutions

| Feature / Library                       | 🌵📦 `react-use-object`           | 🐻 Zustand                  | ⚛️ Redux Toolkit            | Ⓜ️ MobX                        | 🇻 Valtio                     |
|----------------------------------------|----------------------------------|-----------------------------|-----------------------------|------------------------------|-------------------------------|
| Programming paradigm                   | Object-oriented (OOP)            | Functional & mutable        | Functional & immutable      | Reactive OOP (with decorators) | Proxy-based reactivity       |
| Explicit control over mutations        | ✅ Yes, method-based             | ⚠️ Any change applies        | ✅ Reducers define it        | ❌ Implicit (auto-tracked)    | ❌ Implicit (auto-tracked)    |
| Encapsulation (true domain objects)    | ✅ Full class & private fields   | ❌ No                        | ❌ No                        | ⚠️ Partial                    | ❌ No                         |
| Designed for DDD (Domain-Driven Design)| ✅ Yes                           | ❌ No                        | ⚠️ Only with boilerplate     | ⚠️ With custom setup          | ❌ No                         |
| Renders only on explicit mutation      | ✅ Yes                           | ❌ Based on usage            | ✅ Controlled by reducer     | ⚠️ Sometimes unpredictable     | ⚠️ Any detected change        |
| API simplicity                         | ✅ One hook, simple usage        | ✅ Minimal                   | ❌ Verbose (actions, reducers) | ⚠️ Requires decorators        | ✅ Minimal                    |
| Works with rich models / domain logic  | ✅ Yes, supports method logic    | ❌ No                        | ❌ No                        | ✅ Yes                        | ⚠️ Partially (not class-based)|
| Non-invasive (no decorators/setup)     | ✅ Zero config                   | ✅ Yes                      | ❌ High boilerplate          | ❌ Requires decorators        | ⚠️ Implicit wrapping          |
| React mental model alignment           | ✅ Manual triggers, no magic     | ✅ Mostly aligned            | ✅ Fully aligned             | ❌ Magic-like behaviors       | ⚠️ Implicit reactivity        |

---

## ✅ Why `react-use-object`?

`react-use-object` is built for developers who:

- Think in terms of **objects, behavior, and encapsulated logic**.
- Use **Domain-Driven Design (DDD)** or **rich models** in their apps.
- Want **predictable re-renders**, only when explicit mutating methods are called.
- Prefer **clean, low-boilerplate code** without sacrificing power.

It provides fine-grained control over when React updates — **you decide which methods trigger reactivity**, making it ideal for apps with non-trivial business logic.

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
import { useObject } from '@cactusjackson/react-use-object';

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
