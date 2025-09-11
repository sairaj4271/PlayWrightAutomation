let num = 1289, sum = 0;
while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}
console.log("Sum of digits:", sum);
//console.log(num);

let numd = 1234, rev = 0;
while (numd > 0) {
  rev = rev * 10 + (numd % 10);
  numd = Math.floor(numd / 10);
}
console.log(rev); // 4321


let int=45 , rev4=0;
while(int>0){
  rev4=rev4*10+(int%10);
  int=Math.floor(int/10);
}
console.log(rev4);

let prim = 200;
let isPrime = true;

for (let i = 2; i <= Math.sqrt(prim); i++) {
  if (prim % i === 0) {
    isPrime = false;
    break;
  }
}

if (isPrime) {
  console.log(prim + " is a prime number");
} else {
  console.log(prim + " is not a prime number");
}




for (let num = 2; num <= 100; num++) {
  let isPrime = true;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    console.log(num);
  }
}

let str = "hello";
console.log(str.split("").reverse().join("")); // olleh
