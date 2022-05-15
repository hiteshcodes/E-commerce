import config from "./config.json"
const GA_MEASUREMENT_ID = config.GA_MEASUREMENT_ID
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', GA_MEASUREMENT_ID);