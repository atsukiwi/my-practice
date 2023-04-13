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
parseJSONAsync('不正なJSON', (err, result) =>
    console.log('parse結果', err, result)
)
