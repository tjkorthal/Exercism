export class Element {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export class List {
  constructor(array = []) {
    this.head = null
    for (const element of array) {
      this.add(new Element(element))
    }
  }

  add(nextValue) {
    if (!this.head) {
      this.head = nextValue
    } else {
      nextValue.next = this.head
      this.head = nextValue
    }
  }

  get length() {
    let length = 0;
    let element = this.head;
    while (element) {
      length++
      element = element.next
    }
    return length;
  }

  toArray() {
    // if (!this.head) { return [] }
    const array = [];
    let element = this.head
    while (element) {
      array.push(element.value)
      element = element.next
    }
    return array
  }

  reverse() {
    return new List(this.toArray())
  }
}

