const waitFor = ms => new Promise(r => setTimeout(r, ms));
// [1, 2, 3].forEach(async num => {
//     await waitFor(50);
//     console.log(num);
// });
// console.log("Done");

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const res = [];
const start = async callback => {
    await asyncForEach([1, 2, 3], async num => {
        // await waitFor(50);
        console.log(num);
        res.push(num);
    });
    callback(res);
    console.log("Done");
};
start(myres => {
    console.log(`myres -> ${myres}`);
});
console.log(`res -> ${res}`);
