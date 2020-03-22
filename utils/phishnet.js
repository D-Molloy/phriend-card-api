const axios = require("axios");
const cheerio = require("cheerio")


const parseShowHtml =(showHtml)=>{
  console.log("PARSING DATA")
  console.log("showHtml -",showHtml)
  // const setlistEl = document.createElement("body")

  // setlistEl.innerHTML = setlistHtml

  const detailsAr = []
  // const detailsAr = setlistEl.querySelectorAll("[class^='set']")

  let showDetails = {
    songCount:0
  }
  let currentSetAr = []
  let setCount = 0
  

  for(item of detailsAr){
    if(item.classList.contains("set-label")){
      currentSetAr = []
      setCount++
      showDetails[`set${setCount}`] = currentSetAr
    }

    if(item.classList.contains("setlist-song")){
      showDetails[`set${setCount}`].push(item.textContent)
      showDetails.songCount++
    }
}
return showDetails
}


module.exports={
  parseShowHtml
}