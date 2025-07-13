import { describe, expect, it, vi } from 'vitest'
import ReactiveProxy from '../src/ReactiveProxy'

// Class to use as test
class Person {
  name

  #age
  constructor(name, age) {
    this.name = name
    this.#age = age
  }

  birthday() {
    this.#age++
  }

  age() {
    return this.#age
  }

  greet() {
    return `Hi, I'm ${this.name}`
  }
}

describe('ReactiveProxy', () => {
  it('should proxy access to regular properties', () => {
    const johnDoe = new Person('John Doe', 23)
    const onChangeSpy = vi.fn()

    /** @type {Person} */
    const proxy = ReactiveProxy.create(
        johnDoe,
        ['birthday'],
        onChangeSpy,
    )

    expect(proxy.greet()).toBe('Hi, I\'m John Doe')
    expect(proxy.age()).toBe(23)
    expect(proxy.name).toBe('John Doe')
    expect(onChangeSpy).not.toBeCalled()
  })

  it('should trigger onChange when mutating method is called', () => {
    const johnDoe = new Person('John Doe', 23)
    const onChangeSpy = vi.fn()

    /** @type {Person} */
    const proxy = ReactiveProxy.create(
        johnDoe,
        ['birthday'],
        onChangeSpy,
    )

    proxy.birthday()
    expect(onChangeSpy).toBeCalledTimes(1)
  })

  // eslint-disable-next-line max-len
  it('should call onChange if symbol-named method is listed (via symbol description)', () => {
    const sym = Symbol('increment')
    const onChange = vi.fn()
    const counter = {
      count: 0,
      [sym]() {
        this.count++
      },
    }

    const proxy = ReactiveProxy.create(counter, ['increment'], onChange)
    proxy[sym]()
    expect(proxy.count).toBe(1)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  // eslint-disable-next-line max-len
  it('should trigger onChange when async mutating method is called', async () => {
    const onChangeSpy = vi.fn()

    class Counter {
      value = 0

      async increment() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.value++
            resolve()
          }, 10)
        })
      }
    }

    const counter = new Counter()

    const proxy = ReactiveProxy.create(counter, ['increment'], onChangeSpy)

    await proxy.increment()

    expect(proxy.value).toBe(1)
    expect(onChangeSpy).toBeCalledTimes(1)
  })
})
