//
// This is only a SKELETON file for the 'Linked List' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
class Node {
  constructor(value, previous = undefined){
    this.value = value
    this.previous = previous
  }
}
export class LinkedList {
  constructor() {
    this.firstNode = null
    this.lastNode = null
  }
  push(value) {
    let node = new Node(value, this.lastNode)
    if (!this.lastNode) {
      this.firstNode = node
      this.lastNode = node
    } else {
      this.lastNode.next = node
      this.lastNode = node
    }
  }

  pop() {
    const node = this.lastNode
    if (node === this.firstNode) { this.firstNode = null }
    this.lastNode = node.previous
    return node.value
  }

  shift() {
    const node = this.firstNode
    if (node === this.lastNode) { this.lastNode = null }
    this.firstNode = node.next
    return node.value
  }

  unshift(value) {
    let node = new Node(value)
    if (!this.firstNode) {
      this.firstNode = node
      this.lastNode = node
    } else {
      node.next = this.firstNode
      this.firstNode.previous = node
      this.firstNode = node
    }
  }

  delete(value) {
    let node = this.firstNode
    while (node && node.value !== value) {
      node = node.next
    }
    if (!node) { return }
    if (node === this.firstNode) { this.firstNode = node.next }
    if (node === this.lastNode) { this.lastNode = node.previous }
    if (node.previous) { node.previous.next = node.next }
    if (node.next) { node.next.previous = node.previous }
  }

  count() {
    let count = 0
    let node = this.firstNode
    while (node) {
      count++
      node = node.next
    }
    return count
  }
}
