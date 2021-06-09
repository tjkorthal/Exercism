class Allergen {
  static knownAllergens = [
    new Allergen('eggs', 1),
    new Allergen('peanuts', 2),
    new Allergen('shellfish', 4),
    new Allergen('strawberries', 8),
    new Allergen('tomatoes', 16),
    new Allergen('chocolate', 32),
    new Allergen('pollen', 64),
    new Allergen('cats', 128)
  ]

  constructor(name, value) {
    this.name = name
    this.value = value
  }

  static for(name) {
    const allergen = this.knownAllergens.find((x) => x.name === name)
    return allergen || new Allergen(undefined, undefined)
  }

  match(score) {
    // value is used as a bit mask to determine if an allergen is included in a given score
    // ex:
    //  the value for peanuts is 2, which is 0010 in binary.
    //  a score of 3 (eggs + peanuts) is 0011 in binary.
    //  0011 & 0010 = 0010, so if the bitwise AND equals the allergen value the allergy exists
    return (score & this.value) === this.value
  }
}

export class Allergies {
  constructor(score) {
    this.score = score
  }

  list() {
    return Allergen.knownAllergens
                   .filter((x) => x.match(this.score))
                   .map((x) => x.name)
  }

  allergicTo(allergen) {
    return Allergen.for(allergen).match(this.score)
  }
}

