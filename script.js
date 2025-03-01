let num = 266219;
let multiplOfNumElements = 1;

for (let i = 0; i < String(num).length ; i++) {
    multiplOfNumElements *= String(num)[i];
};

console.log(String(multiplOfNumElements**3).substring(0,2));