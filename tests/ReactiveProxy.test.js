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
    const martinTarimiqui = new Person('Martin Tarimiqui', 23)
    const onChangeSpy = vi.fn()

    /** @type {Person} */
    const proxy = ReactiveProxy.create(
        martinTarimiqui,
        ['birthday'],
        onChangeSpy,
    )

    expect(proxy.greet()).toBe('Hi, I\'m Martin Tarimiqui')
    expect(proxy.age()).toBe(23)
    expect(proxy.name).toBe('Martin Tarimiqui')
    expect(onChangeSpy).not.toBeCalled()
  })

  it('should trigger onChange when mutating method is called', () => {
    const martinTarimiqui = new Person('Martin Tarimiqui', 23)
    const onChangeSpy = vi.fn()

    /** @type {Person} */
    const proxy = ReactiveProxy.create(
        martinTarimiqui,
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
})
