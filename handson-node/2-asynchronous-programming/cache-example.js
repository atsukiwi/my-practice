const cache = {}
function parseJSONAsyncWithCache(json, callback) {
    const cached = cache[json]
    if (cached) {
        // process.nextTick(() => callback(cached.err, cached.result))
        queueMicrotask(() => callback(cached.err, cached.result))
        return
    }
    parseJSONAsync(json, (err, result) => {
        cache[json] = { err, result}
        callback(err, result)
    })
}

function parseJSONAsync(json, callback) {
    setTimeout(() => {
        try {
            callback(null, JSON.parse(json))
        } catch (err) {
            console.log('エラーをキャッチ')
            callback(err)
        }
    }, 1000)
}

parseJSONAsyncWithCache(
    '{"message": "Hello", "to": "World"}',
    (err, result) => {
        console.log("1回目", err, result)
        parseJSONAsyncWithCache(
            '{"message": "Hello", "to": "World"}',
            (err, result) => {
            console.log("2回目", err, result)
            }
        )
        console.log("2回目完了")
    }
)
console.log("1回目完了")
