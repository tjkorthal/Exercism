// this feels like cheating since an array is handling most of the hard stuff
class CircularBuffer {
  constructor(size) {
    this.maxSize = size
    this.buffer = []
  }

  write(element) {
    if (this.buffer.length == this.maxSize) {
      throw new BufferFullError
    }
    this.buffer.push(element)
  }

  read() {
    const element = this.buffer.shift()
    if (!element) { throw new BufferEmptyError }
    return element
  }

  forceWrite(element) {
    try {
      this.write(element)
    } catch (error) {
      if (!typeof error === 'BufferFullError') { throw error }
      this.read()
      this.write(element)
    }
  }

  clear() {
    this.buffer = []
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
}

export class BufferEmptyError extends Error {
}
