const fs = require("fs");
const Tesseract = require("tesseract.js");

Tesseract.recognize(
  'testing.png',  
  'eng'
).then(result => {
  const text = result.data.text;
  console.log("the result text:\n", text);

  fs.writeFileSync("output.txt", text); 
}).catch(err => {
  console.error("failed to write:", err);
});
