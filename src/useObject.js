/* eslint-disable max-len */
import { useRef, useMemo, useReducer } from 'react'

const isFunction = (value) => typeof value === 'function'

/**
 * A React hook that creates and manages a reactive object instance, triggering
 * re-renders when specified methods are called or when dependencies change.
 * The hook uses a Proxy to intercept method calls and supports objects with
 * private fields.
 *
 * @template T
 * @param {() => T} factoryFn - A function that returns a new instance of the object.
 * @param {Array} [deps=[]] - An array of dependencies that, when changed, cause the
 *                            factory to be called again to create a new object instance.
 * @param {string[]} [methods=[]] - An array of method names that, when called, trigger
 *                                  a re-render of the component.
 * @return {T} A proxied object instance that triggers re-renders when specified
 *                   methods are called or when dependencies change.
 * @example
 * ```javascript
 * class Person {
 *   #name;
 *   #age;
 *   constructor(name, age) {
 *     this.#name = name;
 *     this.#age = age;
 *   }
 *   name() { return this.#name; }
 *   age() { return this.#age; }
 *   birthday() { this.#age++; }
 *   static named(name, age) { return new Person(name, age); }
 * }
 *
 * function App() {
 *   const [name, setName] = useState("Mateo");
 *   const person = useObject(() => Person.named(name, 20), [name], ['birthday']);
 *   return (
 *     <div>
 *       <p>{person.name()} is {person.age()} years old</p>
 *       <button onClick={person.birthday}>Birthday 🎂</button>
 *     </div>
 *   );
 * }
 * ```
 */
function useObject(factoryFn, deps = [], methods = []) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  // Store the object instance
  const instanceRef = useRef(null)

  // Create or update the object based on dependencies
  const object = useMemo(() => {
    // Call the factory to create a new instance
    const newInstance = factoryFn()

    // Proxy to intercept method calls
    const handler = {
      get(target, prop) {
        const value = target[prop]
        // If the property is a method listed in 'methods', wrap it
        if (methods.includes(prop) && isFunction(value)) {
          return (...args) => {
            const result = value.apply(target, args)
            // Trigger re-render by updating state
            forceUpdate()
            return result
          }
        }
        // Return the original property
        return isFunction(value) ? value.bind(target) : value
      },
    }

    // Update the instanceRef with the new proxied instance
    instanceRef.current = new Proxy(newInstance, handler)
    return instanceRef.current
  }, deps) // Re-run when dependencies change

  // Return the proxied object
  return object
}

export { useObject }
export default useObject
