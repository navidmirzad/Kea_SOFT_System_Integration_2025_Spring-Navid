const message = "Hello world!";

const encoded = btoa(message);

const decoded = atob(encoded);

console.log("Raw message: ", message);
console.log("Encoded message: ", encoded);
console.log("Decoded message: ", decoded);
