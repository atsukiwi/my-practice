function* resetableGeneratorFunc() {
    let count = 0
    while (true) {
        console.log(yield count++)
    }
}

const resetableGenerator = resetableGeneratorFunc()
console.log(resetableGenerator.next())
console.log(resetableGenerator.next())
console.log(resetableGenerator.next())

console.log(resetableGenerator.next(true))
console.log(resetableGenerator.next())
console.log(resetableGenerator.next())
