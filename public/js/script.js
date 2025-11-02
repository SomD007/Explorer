// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let searchBtn = document.getElementById("btn-search");
let searchForm = document.getElementById("search-form");
let listingCards = document.getElementsByClassName("listing-link"); //getting all the listing cards
let listingCardsHolder = document.getElementById("listing-cards-holder");
//console.log(cardTitle.textContent,"\n");
searchBtn.addEventListener("click",(event) => {
    event.preventDefault();
    let searchInput = document.getElementById("search-input");
    let n = 0;
    //console.log(listingCards.length);
    
    for(listingCard of listingCards){ //iterating over each listing card
        let cardTitle = listingCard.children[0].children[2].children[0].children[0];  //Accessing the HTML tag which contains the Listing Title
        let cardLocation = listingCard.children[0].children[2].children[0].children[2]; //Accessing the HTML tag which contains the Listing Location
        console.log(cardLocation.textContent);
        if(cardTitle.textContent.toLowerCase().includes(searchInput.value.toLowerCase()) || cardLocation.textContent.toLowerCase().includes(searchInput.value.toLowerCase()) ){ //matching or finding the search text with the Listing card title
          //console.log(cardTitle.textContent,"\n");
          //console.log(cardPrice.textContent,"\n");
          listingCard.style.display = "block"; //if the search text is inisde the listing card title then display block those listiong cards
        }
        else{
        
        listingCard.style.display = "none"; //if the search text is not inisde the listing card title then display none those listiong cards
        n++; //counting the number of displayed items
      }
      
    }
    
});

const trendingFilter = document.getElementById("trending-filter");
trendingFilter.addEventListener("click", () => {
    console.log("trending filter");
    // console.log(listingCards[2].children[0].children[2].children[0].children[2]);
    let counter = 1;
    for(listingCard of listingCards){ //iterating over each listing card
        if(counter > 3){ //Select only the first 3 cards
          listingCard.style.display = "none"; 
        }else{
        listingCard.style.display = "block"; 
        counter++;
      }
      
    }

})


const damsFilter = document.getElementById("dams-filter"); //storing the filterr button
damsFilter.addEventListener("click", () => {

    for(listingCard of listingCards){ //iterating over each listing card
      let cardTitle = listingCard.children[0].children[2].children[0].children[0];
        if(!cardTitle.textContent.toLowerCase().includes("dam")){ //Select cards which includes the word dam in it's title
          
          listingCard.style.display = "none"; 
        }else{
          console.log(listingCard.title);
        listingCard.style.display = "block"; 
        
      }
      
    }

})



const lakesFilter = document.getElementById("lakes-filter"); //storing the filterr button
lakesFilter.addEventListener("click", () => {
console.log("lakes filter");
    for(listingCard of listingCards){ //iterating over each listing card
      let cardTitle = listingCard.children[0].children[2].children[0].children[0];
        if(!cardTitle.textContent.toLowerCase().includes("lake")){ //Select cards which includes the word lake in it's title
          
          listingCard.style.display = "none"; 
        }else{
          console.log(listingCard.title);
        listingCard.style.display = "block"; 
        
      }
      
    }

})



const parksFilter = document.getElementById("parks-filter"); //storing the filterr button
parksFilter.addEventListener("click", () => {
console.log("parks filter");
    for(listingCard of listingCards){ //iterating over each listing card
      let cardTitle = listingCard.children[0].children[2].children[0].children[0];
        if(!cardTitle.textContent.toLowerCase().includes("park")){ //Select cards which includes the word park in it's title
          
          listingCard.style.display = "none"; 
        }else{
          console.log(listingCard.title);
        listingCard.style.display = "block"; 
        
      }
      
    }

})









const genericRandomFilter = document.getElementsByClassName("generic-random-filter");
for(let i = 0; i < genericRandomFilter.length; i++){
    genericRandomFilter[i].addEventListener("click", () => {
    console.log("generic random filter");


      for(listingCard of listingCards){ //iterating over each listing card
          let randomNumber = Math.random(); //Generating a random number for each listing
          if(randomNumber < 0.5){  //if the number is less than 0.5 then don't display the listing
            listingCard.style.display = "none"; 
          }else{
          listingCard.style.display = "block"; //if the number is more than 0.5 then display the listing
        
          }
      
      }

    })
}

