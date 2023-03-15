const jimp = require("jimp"),
  util = require("util");

const readAsync = util.promisify(jimp.read),
  writeAsync = util.promisify(jimp.prototype.write);

const imgArray = [
  "https://gratisography.com/wp-content/uploads/2023/02/gratisography-colorful-kittenfree-stock-photo-800x525.jpg",
  "https://c4.wallpaperflare.com/wallpaper/555/123/813/ford-nascar-mustang-2019-jpeg-wallpaper-preview.jpg",
];

Promise.all(imgArray.map((img) => readAsync(img)))
  .then((res) => {
    let [img1, img2] = res;

    img1
      .scan(0, 0, img1.bitmap.width, img1.bitmap.height, (x, y) => {
        if (img1.bitmap.width - x > y) {
          return;
        }
        img1.setPixelColor(img2.getPixelColor(x, y), x, y);
      })
      .greyscale();
    return writeAsync.call(img1, `merged_img.${img1.getExtension()}`);
  })
  .catch(console.error);
