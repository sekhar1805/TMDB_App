"use strict";

////////////////////////////////////////////////////
/*Random Image Background*/
///////////////////////////////////////////////////
const imageUrls = [
  'url("./images/bg_imgs/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg")',
  'url("./images/bg_imgs/2Sm3asuwKVNTzgm2nF6hp5mwEfh.jpg")',
  'url( "./images/bg_imgs/5GISMqlRXMEyBrgEqyvhaMMuQmJ.jpg")',
  'url("./images/bg_imgs/6LfVuZBiOOCtqch5Ukspjb9y0EB.jpg")',
  'url( "./images/bg_imgs/7VrRna8S3x6xbijooeBmxqvHXiu.jpg")',
  'url("./images/bg_imgs/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg")',
  'url("./images/bg_imgs/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg")',
  'url("./images/bg_imgs/9ZyAUZrfccsjtDwYgc7yvOBnqM9.jpg")',
  'url("./images/bg_imgs/ayUMWKe6Wow5ixLlKxxlp7IqTiI.jpg")',
  'url("./images/bg_imgs/bgQUBbZ14hfeb975yZ2YzTnAwen.jpg")',
  'url("./images/bg_imgs/fgYfch0MGfNEpgzPst49ThKUqA4.jpg")',
  'url("./images/bg_imgs/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg")',
  'url("./images/bg_imgs/hreiLoPysWG79TsyQgMzFKaOTF5.jpg")',
  'url("./images/bg_imgs/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg")',
  'url("./images/bg_imgs/kSNojkWwSZWsYv0Xj1gcq88okzY.jpg")',
  'url("./images/bg_imgs/oE6bhqqVFyIECtBzqIuvh6JdaB5.jpg")',
  'url("./images/bg_imgs/r2NcIZ1FPMlxCty3vRITVTgGNVS.jpg")',
  'url("./images/bg_imgs/sfjqJDmNqMIImO5khiddb9TARvO.jpg")',
  'url("./images/bg_imgs/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg")',
  'url("./images/bg_imgs/VlHt27nCqOuTnuX6bku8QZapzO.jpg")',
  'url("./images/bg_imgs/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg")',
];

function getRandomBackground() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const selectedBackground = imageUrls[randomIndex];
  document.querySelector("header").style.backgroundImage = selectedBackground;
}

getRandomBackground();

////////////////////////////////////////////////////////
/* search Implementation*/
////////////////////////////////////////////////////////

// Controller
console.log("hello");
import {
  fetchPopularMovies,
  fetchSearchResult,
  fetchLatestData,
  fetchTrendingData,
  swapPage,
  swapTrending,
  swapLatest,
  swapFreeToWatch,
  fetchTopRated,
} from "./models.js";
import {
  renderCards,
  showSpinner,
  clearSpinner,
  submitValue,
  takeInput,
  clearFields,
  renderLatest,
  renderTrending,
  renderFreeToWatchCards,
  changepage,
  backtomain,
  renderSearch,
} from "./view/view.js";
import { elements } from "./view/base.js";

async function loadPopularData() {
  showSpinner();
  let { results } = await fetchPopularMovies();
  clearSpinner();
  renderCards(results);
}

loadPopularData();
async function loadlatestData() {
  showSpinner();
  let { results } = await fetchLatestData();
  console.log(results);
  clearSpinner();
  renderLatest(results);
}
async function loadtrendingData() {
  showSpinner();
  let { results } = await fetchTrendingData();
  console.log(results);
  clearSpinner();
  renderTrending(results);
}
async function loadFreeToWatchData() {
  showSpinner();
  let { results } = await fetchTopRated();
  console.log(results);
  clearSpinner();
  renderFreeToWatchCards(results);
}
loadFreeToWatchData();
loadtrendingData();
loadlatestData();
elements.input.addEventListener("change", takeInput);

// console.log(elements.page1.classList.add("hide"))

elements.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  changepage(e);
  let { results } = await fetchSearchResult(submitValue(e));
  renderSearch(results);
  console.log(results);
});

elements.categories.addEventListener("click", async (e) => {
  console.log(e);
  let link = swapPage(e);
  let { results } = await fetchPopularMovies(link.trim());
  console.log(results);
  renderCards(results);
  console.log(link.trim());
});
elements.trendingCategories.addEventListener("click", async (e) => {
  let link = swapTrending(e);
  let { results } = await fetchTrendingData(link.trim());
  renderTrending(results);
});

elements.latestCategories.addEventListener("click", async (e) => {
  let link = swapLatest(e);
  let { results } = await fetchLatestData(link.trim());
  console.log(results);
  renderLatest(results);
});

elements.freeToWatchCategories.addEventListener("click", async (e) => {
  let link = swapFreeToWatch(e);
  let { results } = await fetchTopRated(link.trim());
  console.log(results);
  renderFreeToWatchCards(results);
});
elements.faarrowleft.addEventListener("click", backtomain);
