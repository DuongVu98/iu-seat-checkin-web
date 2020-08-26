const waitFor = ms => new Promise(r => setTimeout(r, ms));
const myArr = [
    { number: 0, text: "null" },
    { number: 1, text: "null" },
    { number: 2, text: "null" },
    { number: 3, text: "null" },
    { number: 4, text: "null" },
    { number: 5, text: "null" },
    { number: 6, text: "null" },
    { number: 7, text: "null" },
    { number: 8, text: "null" },
    { number: 9, text: "null" },
];

async function testArray(callback) {
    waitFor(50);
    await myArr.forEach(async obj => {
        if (obj.number < 5) {
            obj.text = "first-halft";
        } else if (obj.number >= 5) {
            obj.text = "second-half";
        }
    });
    await callback(myArr);
}

let res = [];
function getData() {
    testArray(myArr => {
        res = myArr;
    });
}

getData();
console.log(res);
