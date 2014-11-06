Array2
======

An implementation of `Array` in JavaScript without ever using a native JavaScript-Array. It has the highly creative title "Array2".

This is just a test, a proof of concept if you will: It's possible to create the functionality of a JavaScript-Array without using a native Array. It even works with Function.apply and everything! Just the bracket-notation `myArray[5]` won't change the length attribute.

    var arr = new Array2(1,2,3,4); // [1,2,3,4]
    arr.slice(2) // return: [3, 4], arr: [1,2,3,4]
    arr.pop() // return: 4, arr: [1,2,3]
    arr.push(5) // return: 4, arr: [1,2,3,5]
    arr.splice(3, 0, 4) // return: [], arr: [1,2,3,4,5]
    arr.shift() // return: 1, arr: [2,3,4,5]
    arr.unshift(1) // return: 5, arr: [1,2,3,4,5]
    arr.reverse() // return: [5,4,3,2,1], arr: [1,2,3,4,5]
    var brr = arr.splice(0,3) // brr: [1,2,3], arr: [4,5]
    arr = brr.concat(arr) // arr: [1,2,3,4,5], brr: [1,2,3]
    arr.join(" ") // return: "1 2 3 4 5", arr: [1,2,3,4,5]
    arr.toString() // return: "1,2,3,4,5", arr: [1,2,3,4,5]
    
    // The simulation of the [bracket notation]
    squaredBrackets(1,2,3,4) // [1,2,3,4]
    
    // difference:
    squaredBrackets(5) // [5]
    new Array(5) // [undefined × 5]
    // If the Array2 constructor is called with only one argument 
    // and this argument is a positive integer, this integer is 
    // considered to indicate the length of the array

## Why should I use that?

No, you shouldn't. It's incredibly slower than a native Array, there's no advantage whatsoever of using Array2.

## What advantage does it have over native Arrays?

What? None! Read the part above. It's just a proof of concept.

## Which Browsers are supported?

I didn't even bother checking for browser support. Look, dude, just don't use it.

## How do I integrate this into my website?

Not at all. This is the result of a few hours of procrastination and curiosity.

## Who in the industry is using this?

You just don't get it, don't you?!

## There's no `sort` method

Right. Didn't bother implementing this.
