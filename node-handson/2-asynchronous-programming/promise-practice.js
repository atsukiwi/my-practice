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

const toBeFulFilled = parseJSONAsync('{"foo":1}')
const toBeRejected = parseJSONAsync('不正なJSON')
console.log('****************Promise生成直後********************')
console.log(toBeFulFilled)
console.log(toBeRejected)
setTimeout(() => {
   console.log('**********************1秒後*********************')
   console.log(toBeFulFilled)
   console.log(toBeRejected)
}, 1000);
