console.log(new Date()); // UTC Standard: ISO-8601

console.log(Date()); // Local date

console.log(Date.now()); // Unix Epoch

const date = new Date();

const danishDate = new Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);
console.log(americanDate);
