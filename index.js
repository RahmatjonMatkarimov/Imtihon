// 1-masala
// const rearrange = (arr) => {
//     let res = []
//     let sorted = arr.sort((a, b) => a - b)

//     for (let i = 0; i < arr.length; i++) {
//         let index = sorted.length - 1
//         res.push(sorted[index])
//         res.push(sorted[0])
//         sorted.pop()
//         sorted.shift()
//     }
//     res.push(sorted[1])
//     res.push(sorted[0])
//     return res
// }
// console.log(rearrange([1, 2, 3, 4, 5, 6]));

// 2-masala
// const unicueWords = (str) => [...new Set(str.split(' '))]
// console.log(unicueWords('qwe qwe qwe asd wqe asd ewr gfd'));

// 3-masala
// const findLongestWords = (arr) => {
//     let Longest = []
//     let res
//     for (let i = 0; i < arr.length; i++) {
//         Longest.push(arr[i].length)        
//     }
//     let maxWordsLength = Math.max(...Longest)
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].length === maxWordsLength) {
//             res = arr[i]
//         }
//     }
//     return res
// }
// console.log(findLongestWords(['asadf','asdf','salomlar']));

// 4-masala
// const multiString =(str,num)=>{
//     let res = ''
//     for (let i = 0; i < num; i++) {
//         res +=str        
//     }
//     return res
// }
// console.log(multiString('salom',3));

// 5-masala
// const findCommonEloments = (arr1, arr2) => {
//     let res = []
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr2.includes(arr1[i])) {
//             res.push(arr1[i])
//         }        
//     }
//     return res
// }

// console.log(findCommonEloments([1,2,3,4,5],[5,6,7,3,9]));