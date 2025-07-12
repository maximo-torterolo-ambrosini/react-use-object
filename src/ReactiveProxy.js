/* eslint-disable max-len */

/**
 * @typedef {Set<string>} MutatingMethodsType
*/

/**
 * @typedef {() => void} OnChangeType
*/


/**
 * @template T
 */
class ReactiveProxy {
  /** @type {T} */
  #target

  /** @type {MutatingMethodsType} */
  #mutatingMethods

  /** @type {OnChangeType} */
  #onChange

  /**
   * @param {T} target - Original object to be wrapped by the Proxy.
   * @param {MutatingMethodsType} mutatingMethods - method names that are considered capable of triggering state mutation.
   * @param {OnChangeType} onChange - Callback to invoke when a mutating method is called.
  */
  constructor(target, mutatingMethods, onChange) {
    this.#target = target
    this.#mutatingMethods = mutatingMethods
    this.#onChange = onChange
  }

  /**
   * Creates a reactive instance of an object, intercepting mutating methods.
   *
   * @param {T} target - Original object to be wrapped by the Proxy.
   * @param {string[]} mutatingMethods - method names that are considered capable of triggering state mutation.
   * @param {OnChangeType} onChange - Callback to invoke when a mutating method is called.
   *
   * @example
   * const person = ReactiveProxy.create(new Person(), ['birthday'], () => console.log('Happy birthday!'))
  */
  static create(target, mutatingMethods, onChange) {
    return new ReactiveProxy(target, new Set(mutatingMethods), onChange).proxy()
  }

  /**
    * Returns a Proxy-wrapped version of the target object, with mutating methods decorated.
    * @returns {T}
 */
  proxy() {
    return new Proxy(this.#target, {
      get: (target, property) => this.#decorateMethodIfNeeded(target, property),
    })
  }

  /**
   *
   * @param {T} target
   * @param {string | Symbol} property
   */
  #decorateMethodIfNeeded(target, property) {
    const accessedProperty = target[property]

    if (this.#isFunction(accessedProperty)) {
      if (this.#isMutatingMethod(property)) {
        return this.#decorateAsMutatingMethod(accessedProperty, target)
      } else {
        return accessedProperty.bind(target)
      }
    }
    return accessedProperty
  }

  /**
   @param {any} any
  */
  #isFunction(any) {
    return typeof any === 'function'
  }

  /**
   * @param {string | Symbol} property
   */
  #isMutatingMethod(property) {
    /**
     * @type {string}
     */
    const parsedProperty = typeof property === 'symbol' ? property.description : property
    return this.#mutatingMethods.has(parsedProperty)
  }

  /**
   *
   * @param {Function} method
   * @param {T} target
   */
  #decorateAsMutatingMethod(method, target) {
    return (...args) => {
      const result = method.apply(target, args)
      this.#onChange()
      return result
    }
  }
}

export default ReactiveProxy
