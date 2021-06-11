const sum = (x, y) => x + y;

class Score {
  static registry = []
  static name = 'score'
  constructor(numbers) {
    this.numbers = numbers
    this.numberCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
    numbers.forEach(element => this.numberCounts[element] += 1);
  }

  get score() {
    return 0
  }

  static register(scoreClass) {
    this.registry.push(scoreClass)
  }

  static for(category) {
    return this.registry.find((x) => x.name === category) || Score
  }
}

class Ones extends Score {
  static name = 'ones'

  get score() {
    return this.numberCounts[1] * 1
  }
}

class Twos extends Score {
  static name = 'twos'

  get score() {
    return this.numberCounts[2] * 2
  }
}

class Threes extends Score {
  static name = 'threes'

  get score() {
    return this.numberCounts[3] * 3
  }
}

class Fours extends Score {
  static name = 'fours'

  get score() {
    return this.numberCounts[4] * 4
  }
}

class Fives extends Score {
  static name = 'fives'

  get score() {
    return this.numberCounts[5] * 5
  }
}

class Sixes extends Score {
  static name = 'sixes'

  get score() {
    return this.numberCounts[6] * 6
  }
}

class Choice extends Score {
  static name = 'choice'

  get score() {
    return this.numbers.reduce(sum, 0)
  }
}

class FullHouse extends Score {
  static name = 'full house'

  get score() {
    const fullHouse =
      Object.values(this.numberCounts)
            .filter(x => x)
            .sort()
            .toString() === '2,3'
    return fullHouse ? this.numbers.reduce(sum, 0) : 0
  }
}

class FourOfAKind extends Score {
  static name = 'four of a kind'

  get score() {
    for (const number in this.numberCounts) {
      if (this.numberCounts[number] >= 4) { return number * 4 }
    }
    return 0
  }
}

class LittleStraight extends Score {
  static name = 'little straight'

  get score() {
    return this.numbers.sort().toString() === '1,2,3,4,5' ? 30 : 0
  }
}

class BigStraight extends Score {
  static name = 'big straight'

  get score() {
    return this.numbers.sort().toString() === '2,3,4,5,6' ? 30 : 0
  }
}

class Yacht extends Score {
  static name = 'yacht'

  // check if every number in the list is the same as the first one
  // true * 50 === 50
  // false * 50 === 0
  get score() {
    return this.numbers.every((x) => x === this.numbers[0]) * 50
  }
}

Score.register(Ones)
Score.register(Twos)
Score.register(Threes)
Score.register(Fours)
Score.register(Fives)
Score.register(Sixes)
Score.register(Choice)
Score.register(FullHouse)
Score.register(FourOfAKind)
Score.register(LittleStraight)
Score.register(BigStraight)
Score.register(Yacht)

export const score = (numbers, category) => {
  const scoreClass = Score.for(category)
  return new scoreClass(numbers).score
};
