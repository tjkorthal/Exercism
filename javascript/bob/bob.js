class Message {
  constructor(string) {
    this.value = string.trim()
  }
  question() {
    return this.value.endsWith('?')
  }
  silence() {
    return this.value.length === 0
  }
  shouting() {
    // return false unless message includes a capital letter
    if (!this.value.match(/[A-Z]+.?/g)) { return false }
    return this.value.toUpperCase() === this.value
  }
}

class Response {
  value() {
    return 'Whatever.'
  }
  static for(message) {
    const responseClass = this.registry.find((response) => response.repliesTo(message));
    return new responseClass()
  }

  static register(response) {
    this.registry.unshift(response)
  }

  static repliesTo(message) {
    return true;
  }
}

class CalmDown extends Response {
  value() {
    return "Calm down, I know what I'm doing!"
  }

  static repliesTo(message) {
    return message.shouting() && message.question()
  }
}

class ChillOut extends Response {
  value() {
    return 'Whoa, chill out!'
  }

  static repliesTo(message) {
    return message.shouting()
  }
}

class Sure extends Response {
  value() {
    return 'Sure.'
  }

  static repliesTo(message) {
    return message.question()
  }
}

class Fine extends Response {
  value() {
    return 'Fine. Be that way!'
  }

  static repliesTo(message) {
    return message.silence()
  }
}

Response.registry = [Response]
Response.register(Fine)
Response.register(Sure)
Response.register(ChillOut)
Response.register(CalmDown)

class Bob {
  static response(message) {
    return Response.for(message).value()
  }
}

export const hey = (message) => {
  return Bob.response(new Message(message))
};
