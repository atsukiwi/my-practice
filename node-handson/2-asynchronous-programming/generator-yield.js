const { resolve } = require("path");

function parseJSONAsync(json) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            try{
                resolve(JSON.parse(json))
            } catch (err) {
                reject(err)
            }
        }, 1000)
    )
}

function* asyncWithGeneratorFunc(json) {
    try {
        const result = yield parseJSONAsync(json)
        console.log('パース結果', result)
    } catch (err) {
        console.log('エラーをキャッチ', err)
    }
}

// const asyncWithGenerator1 = asyncWithGeneratorFunc('{"foo":1}')
// const promise1 = asyncWithGenerator1.next().value
// // console.log(promise1)
// setTimeout(() => {
//     // then の戻り値は登録したコールバックで解決した新しいPromiseインスタンス
//     // そのため、この時点では pending
//     console.log(promise1.then(result => asyncWithGenerator1.next(result)))
//     // console.log(promise1)
// }, 2000)

function handleAsyncWithGenerator(generator, resolved) {
    const { done, value } = generator.next(resolved)
    if (done) {
        return Promise.resolve(value)
    }
    return value.then(
        resolved => handleAsyncWithGenerator(generator, resolved),
        err => generator.throw(err)
    )
}

console.log(handleAsyncWithGenerator(asyncWithGeneratorFunc('{"foo": 1}')))
console.log(handleAsyncWithGenerator(asyncWithGeneratorFunc('不正なJSON')))
