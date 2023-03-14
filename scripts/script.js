// let tv = new Swiper(`.trend__tv-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.trend__tv-slider .swiper-button-next`,
//         prevEl: `.trend__tv-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// let awaited = new Swiper(`.popular__actors-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.popular__actors-slider .swiper-button-next`,
//         prevEl: `.popular__actors-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });




const searchLink = document.querySelector('.search__link .icon-reg'), // tepadagi search
      mainContent= document.querySelector('.main__content'), // o'rtadagi search
      mainClose= document.querySelectorAll('.main__close'),  // X ni bosganda yopiladi oyna
      mainBlock = document.querySelector('.main__block'),  //  paginatsiya tepasida turadigan rasmlar
      mainSolo =document.querySelector('.main__solo') // bitta kinoni ustiga bossak osha kinoni chiqarip beradi
      moviesLink= document.querySelectorAll('.movies__link') // movieni bosganda kinolarni chiqarip beradi.
      formMain= document.querySelector('.form__main') // formdagi malumotlar.
      headerInput= document.querySelector('.header__input') // headerda chiqadigan input(ichidagi valuesini olish uchun).
      anime=document.querySelector('.anime')  //zagruskadagi dumaloq.
      pagination=document.querySelector('.pagination') //paginatsiya qilish uchun..
      headerBtn= document.querySelector('.header__btn')  // tepadagi 3 ta chiziq.
      headerAbs= document.querySelector('.header__abs') // 3 ta chiziqni bosganda header qismida kulrang parda tortiladi..
      headerItems = document.querySelector('.header__items') ;// 3 ta chiziqni bosganda  ichidagi narsalar ekranda chiqishi uchun.
      
/*  menu bars*/

headerBtn.addEventListener('click', function(e){
e.preventDefault()
headerBtn.classList.toggle('active')
headerItems.classList.toggle('active')
headerAbs.classList.toggle('active')
body.classList.toggle('active')

})

headerAbs.addEventListener('click', function(e){
if(e.target == e.currentTarget) {
  this.classList.remove('active')
  headerBtn.classList.remove('active')
  headerItems.classList.remove('active')
 
}
})

/*  menu bars*/



/* host   */

const host = 'https://kinopoiskapiunofficial.tech'
const hostName ='X-API-KEY'
const hostValue = '2a33a7b8-2975-4aab-871a-9e1c15c4d093'




class Kino {
    constructor(){
        this.date = new Date().getMonth()
        this.curYear = new Date().getFullYear()
        this.months =['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        this.curMonth = this.months[this.date]


    }

    fOpen = async (url)=> {
        let response = await fetch(url , {
            headers: {
                [hostName]:hostValue

            }
        })

        if(response.ok) return response.json()
        else throw new Error(`Cannot access to ${url}`)
    }


    getTopMovies=(page=1)=> this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`) // top darajasidagi filmlar

    getSoloFilm=(id)=> this.fOpen(`${host}/api/v2.1/films/${id}`) // bitta kino haqida malumotlar chiqarip beradi

    getMostAwaited=(page=1 , year=this.curYear , month= this.curMonth)=> this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`) // yili orqali topish

    getReviews =(id)=> this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`) // sharxlar

    getFrames =(id)=> this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`) // kinoni ustiga bosilganda  bir nechta rasmlar chiqarip beradi..

    getSearch =(page=1, keyword)=> this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)

    getPrimier = (year= this.curYear , month=this.curMonth)=> this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`)


}


const db = new Kino()



// db.getTopMovies().then(res=> {
//     console.log(res)
// })

db.getSoloFilm(435).then(data=> {
    console.log(data)
})

// db.getMostAwaited().then(res => {
//     console.log(res)
// })

db.getReviews(435).then(res => {
    console.log(res)
})

db.getFrames(435).then(res=> {
    console.log(res)
})


/* host   */



/*  render Tren movies   */


function renderTrenMovies(elem=[], fn=[], films=[], pages=[] ){

     anime.classList.add('active')

    elem.forEach((item, i)=> {

        let parent = document.querySelector(`${item} .swiper-wrapper`)

    db[fn[i]](pages[i]).then(data => {
 

        data[films[i]].forEach(el => {
        
            let slide = document.createElement('div')
            slide.classList.add('swiper-slide')

            slide.innerHTML = `
            
            <div class="movie__item">
            <img src="${el.posterUrlPreview}" alt="" loading="lazy">
             </div>
            `

            parent.append(slide)


        });

      anime.classList.remove('active')


    })



    .then(()=> {
        elem.forEach(item => {
            
           new Swiper(`${item}`, {
                slidesPerView: 1,
                spaceBetween: 27,
                // slidesPerGroup: 3,
                loop: true,
                // loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: `${item} .swiper-button-next`,
                    prevEl: `${item} .swiper-button-prev`,
                },
                breakpoints: {
                    1440: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                    960: {
                        slidesPerView: 4,
                    },
                    720: {
                        slidesPerView: 3,
                    },
                    500: {
                        slidesPerView: 2,
                    },
                }
            });
            




        });
    })

    .catch(e=> {
        console.log(e)
        anime.classList.remove('active')
    })



    })
    

}


  renderTrenMovies(['.trend__tv-slider', '.popular__actors-slider'], ['getTopMovies', 'getMostAwaited'],['films','releases'],[1,1])


/*  render Tren movies   */

// rand

function randMovies(num){
    return Math.trunc(Math.random()* num+1)

}
//  rand


// render 

function renderHeader(page){

    db.getTopMovies(page).then(data => {
        // console.log(data)

        let max = randMovies(data.films.length)
        let filmId = data.films[max].filmId
        let filmRating = data.films[max].rating

        //  console.log(filmRating)

         db.getSoloFilm(filmId).then(response => {
             console.log(response)

             let info = response.data
             console.log(info)


         let headerText = document.querySelector('.header__text')

         let url = info.webUrl.split('kinopoisk').join('kinopoiskk')
         console.log(url)


         headerText.innerHTML = `
         
         
         <h1 class="header__title">${info.nameRu || info.nameEn}</h1>
         <div class="header__balls">
             <span class="header__year">${info.year}</span>
             <span class="logo__span header__rating  header__year ">${filmRating}+</span>
             <div class="header__seasons header__year">${info.seasons.length > 0 ? info.seasons[0]: ''}</div>
             <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
         </div>
         <p class="header__descr">
            ${info.description}
         </p>
         <div class="header__buttons">
             <a href="${url}" target="_blank" class="header__watch"><span class="icon-solid"></span>watch</a>
             <a href="#" class="header__more header__watch movie__item" data-id="${info.filmId}">More information</a>
         </div>
    
         
         `
        
             
         })


         .then(()=> {
            let headerMore = document.querySelector('.header__more')
            headerMore.addEventListener('click', function(e){
                  e.preventDefault()
                  let attr = this.getAttribute('data-id')
                  openSoloFilms(e)

            })
         })


    })

}
 let page =13 // agar  13ni o'rniga 1 qoysak 1 chi page dan random qilip beradi.jami kino 250 ta page lar soni 13 ta.


let rand = randMovies(page)



renderHeader(rand)

// render






// current date 


const popularActorsTitle = document.querySelector('.popular__actors-title strong')

const comingSoonBlock= document.querySelector('.coming__soon-block img')

const year =document.querySelector('.year')


popularActorsTitle.innerHTML = `${db.curMonth} ${db.curYear}`

year.innerHTML =`${db.curYear}`

db.getPrimier().then(res => {
    let rand =randMovies(res.total)
    comingSoonBlock.src = res.items[rand].posterUrlPreview

})



// current date 


// open solo films

function openSoloFilms(e){
e.preventDefault()
mainContent.classList.add('active')
body.classList.add('active')

}


mainClose.forEach(closes => {
    closes.addEventListener('click', function(e){
      e.preventDefault()
      mainContent.classList.remove('active')
      body.classList.remove('active')
    })
});



// open solo films



// render solo

async function renderSolo(id){
    mainBlock.innerHTML= ""
    mainSolo.innerHTML = ""

    // anime.classList.add('active')


    (async  function(id){
        const [reviews , frames , solo]= await Promise.all([
            db.getReviews(id),
            db.getFrames(id),
            db.getSoloFilm(id),
        ])

        return { reviews , frames , solo }
  
    }) ()
   

}
renderSolo(435)




// render solo