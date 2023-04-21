const { resolve } = require("path");
// コールバックが返すPromiseインスタンスが解決してから、finallyの結果が出力される

Promise
    .resolve('foo')
    .finally(() =>
        new Promise(resolve =>
            setTimeout(
                () => {
                    console.log('finallyで1秒経過')
                    resolve()
                },
                1000
            )
        )
    )
    .then(console.log)
