const puppeteer = require('puppeteer')
const URL = 'https://www.dailyclimate.org/impacts/'

// function for lazyloading fix
function wait (ms) {
   return new Promise(resolve => setTimeout(() => resolve(), ms));
 }

// scraping function
async function scraper(){

   const browser = await puppeteer.launch()
   const page = await browser.newPage()
   await page.goto(URL, {waitUntil: 'load'})
   


/*** LAZYLOADING FIX ***/
  // Get the height of the rendered page
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  // Scroll one viewport at a time, pausing to let content load
  const viewportHeight = page.viewport().height;
  let viewportIncr = 0;
  while (viewportIncr + viewportHeight < height) {
    await page.evaluate(_viewportHeight => {
      window.scrollBy(0, _viewportHeight);
    }, viewportHeight);
    await wait(20);
    viewportIncr = viewportIncr + viewportHeight;
  }

  // Scroll back to top
  await page.evaluate(_ => {
    window.scrollTo(0, 0);
  });

  // Some extra delay to let images load
  await wait(100);
/***  END OF LAZYLOADING FIX ***/



   // declare variables
   let dataObj = {}
   var list


   // Run JS inside the page
   const data = await page.evaluate(()=> {
      list = []

      // target scrape content
      let items = Array.from(document.querySelectorAll('article.page-article'))

      let image = Array.from(document.querySelectorAll('#col-center > div.widget__head > a > img')).map(x =>  x.src)

      let title = Array.from(document.querySelectorAll('.widget__headline-text')).map(x => x.textContent.trim())
      let summary = Array.from(document.querySelectorAll('.body-description')).map(x => x.textContent.trim())
      let source = Array.from(document.querySelectorAll('.widget__body.clearfix.sm-mt-1 > a')).map(x => x.textContent.trim())
      let link = Array.from(document.querySelectorAll('.widget__body.clearfix.sm-mt-1 > a')).map(x=> x.getAttribute('href'))
      let date = Array.from(document.querySelectorAll('.social-date__text')).map(x => x.textContent.trim())


      // iterate through content and push to array
      for(let i = 0; i<15; i++){
         list.push( {
            image: image[i],
            title: title[i],
            summary: summary[i],
            source: source[i],
            link: link[i],
            date: date[i],
         })
         
      }

      for(let i = 0; i<list.length; i++){
         list[i].image = list[i].image.split('&')
         for(let j = 0; j<list[i].image.length;j++){
            if(list[i].image[j].includes('width')) list[i].image[j] = 'width=416'
            if(list[i].image[j].includes('height')) list[i].image[j] =  'height=277'
         }
         list[i].image = list[i].image.join('&')
      }
      
      /*** WHY WON'T THIS FUNCTION TO EVALUATE AND EDIT THE IMAGE SOURCE URL WORK ***/
      // this function makes sure the images will be scraped and displayed in original 416x277 format
      // for(let i = 0; i<list.length; i++){
      //    list[image]= list[image].split('&')
      //    for(let j = 0; j<list[image].length; j++){
      //       if(list[image][j].includes('width=')) list[image][j] = 'width=416'
      //       if(list[image][j].includes('height=')) list[image][j] = 'height=277'
      //    }
      //    list[image] = list[image].join('&')
      
      // }

      
       return list.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date))
      
   })

   dataObj = data
   console.log(data)

   await browser.close()

   return data
}

module.exports = scraper