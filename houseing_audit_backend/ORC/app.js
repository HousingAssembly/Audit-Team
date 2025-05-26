// app.js - 使用 tesseract.js 识别本地图片
const Tesseract = require('tesseract.js');
const path = require('path');

const imagePath = process.argv[2]

if (!imagePath) {
    process.exit(1);
}

console.log('🔍 正在识别图片：', imagePath);

Tesseract.recognize(
    path.resolve(imagePath),
    'eng',
    {
        logger: m => console.log(m)
    }
).then(({ data: { text } }) => {
    console.log(text);
})