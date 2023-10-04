function getAllDiceCombinations(dices: any[]) {
  const toCombine = new Array(dices.length).fill("").map((_, i) => i)
  let combinations: any[] = []
  let temp: any[] = []
  let slent = Math.pow(2, toCombine.length) - 1

  for (let i = 0; i < slent; i++) {
    temp = []
    for (var j = 0; j < toCombine.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(toCombine[j])
      }
    }

    if (temp.length > 0) {
      combinations.push(temp)
    }
  }

  return combinations.map((combi) => {
    const completion = toCombine.filter((index) => combi.indexOf(index) === -1)
    const diceCombi = combi.map((e) => dices[e])
    const diceCompletion = completion.map((e) => dices[e])
    return [diceCombi, diceCompletion]
  })
}

console.log('test fonction', getAllDiceCombinations(["vert", "rouge", "jaune"]))