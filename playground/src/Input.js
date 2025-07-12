class Input {
  #initialValue

  constructor(initialValue) {
    this.#initialValue = initialValue
  }

  initialValue() {
    return this.#initialValue
  }

  setInitialValue(newValue) {
    this.#initialValue = newValue
  }
}

export default Input
