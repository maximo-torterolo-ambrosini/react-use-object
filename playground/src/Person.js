class Person {
  #age

  #name

  #lastName

  constructor(name, lastName, age) {
    this.#name = name
    this.#age = age
    this.#lastName = lastName
  }

  age() {
    return this.#age
  }

  name() {
    return this.#name
  }

  birthday() {
    console.log(`Happy birthday ${this.#fullName()} 🥳`)
    this.#age++
  }

  #fullName() {
    return this.#name + ' ' + this.#lastName
  }

  changeName(newName) {
    this.#name = newName
  }

  static named(name, lastName, age) {
    return new Person(name, lastName, age)
  }
}

export default Person
