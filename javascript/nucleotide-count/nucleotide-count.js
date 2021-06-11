const addToCounts = function(nucleotide, map) {
  if (!Object.keys(map).includes(nucleotide)) { throw new Error('Invalid nucleotide in strand') }

  map[nucleotide] += 1
}

export class NucleotideCounts {
  static parse(strand) {
    const counts = {
      A: 0,
      C: 0,
      G: 0,
      T: 0
    }
    strand.split('').forEach((x) => addToCounts(x, counts))

    return `${counts['A']} ${counts['C']} ${counts['G']} ${counts['T']}`
  }
}
