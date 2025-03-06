const arr = ["1221111", "342424", "44424242", "444442", "22242242", "44424424", "222424242"];

const elements = arr.filter(str => {
    return str.startsWith("2") || str.startsWith("4");
});

console.log(elements)


const arr2 = ["1221111", "242424", "44424242", "444442", "22242242", "44424424", "722424242"];
const startNumbers = ["2", "4"];

for (let i = 0; i < arr2.length; i++) {
    const arr2Element = arr2[i];
    const firstNum = arr2Element[0];

    if (startNumbers.includes(firstNum)){
        console.log(arr2Element);
}
}



const displayPrimeNumbers = function () {

    for (let num = 1; num <= 100; num++) {
      let isPrime = true;
      
      if (num <= 1) {
        isPrime = false;
      } else {
        for (let i = 2; i < num; i++) {
          if (num % i === 0) {
            isPrime = false;
            break;
          }
        }
      }
      
      if (isPrime == true) {
        console.log(`${num} - Делители этого числа: 1 и ${num}`);
      }
    }
  }

  displayPrimeNumbers();