const axios = require("axios");
const cheerio = require("cheerio");
let dataArray = [];
const instaLink = "https://www.instagram.com/p/Cpr9QjQIsnN/";
const fetchData = async () => {
  content = await axios.get(instaLink);

  const $ = cheerio.load(content.data);
  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $('meta[name="title"]').attr("content");

  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content");
  const url = $('meta[property="og:url"]').attr("content");
  const image =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[property="og:image:url"]').attr("content");

  dataArray.push({ title, description, url, image });
  console.log(dataArray);
};
fetchData();
