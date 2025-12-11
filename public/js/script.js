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
let searchInput = document.getElementById("search-input");
let listingCards = document.getElementsByClassName("listing-link");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();

  console.log(query);
  for (let listingCard of listingCards) {
    // Find title and location by class selectors
    const titleEl = listingCard.querySelector(".card-title");
    const locationEl = listingCard.querySelector(".card-text i:first-of-type");

    const title = titleEl ? titleEl.textContent.toLowerCase() : "";
    const location = locationEl ? locationEl.textContent.toLowerCase() : "";

    // Show or hide based on match
    if (title.includes(query) || location.includes(query)) {
      listingCard.style.display = "block";
    } else {
      listingCard.style.display = "none";
    }
  }
});


// const trendingFilter = document.getElementById("trending-filter");
// trendingFilter.addEventListener("click", () => {
//     console.log("trending filter");
//     // console.log(listingCards[2].children[0].children[2].children[0].children[2]);
//     let counter = 1;
//     for(listingCard of listingCards){ //iterating over each listing card
//         if(counter > 3){ //Select only the first 3 cards
//           listingCard.style.display = "none"; 
//         }else{
//         listingCard.style.display = "block"; 
//         counter++;
//       }
      
//     }

// })


// const damsFilter = document.getElementById("dams-filter"); //storing the filterr button
// damsFilter.addEventListener("click", () => {

//     for(listingCard of listingCards){ //iterating over each listing card
//       let cardTitle = listingCard.children[0].children[2].children[0].children[0];
//         if(!cardTitle.textContent.toLowerCase().includes("dam")){ //Select cards which includes the word dam in it's title
          
//           listingCard.style.display = "none"; 
//         }else{
//           console.log(listingCard.title);
//         listingCard.style.display = "block"; 
        
//       }
      
//     }

// })



// const lakesFilter = document.getElementById("lakes-filter"); //storing the filterr button
// lakesFilter.addEventListener("click", () => {
// console.log("lakes filter");
//     for(listingCard of listingCards){ //iterating over each listing card
//       let cardTitle = listingCard.children[0].children[2].children[0].children[0];
//         if(!cardTitle.textContent.toLowerCase().includes("lake")){ //Select cards which includes the word lake in it's title
          
//           listingCard.style.display = "none"; 
//         }else{
//           console.log(listingCard.title);
//         listingCard.style.display = "block"; 
        
//       }
      
//     }

// })



// const parksFilter = document.getElementById("parks-filter"); //storing the filterr button
// parksFilter.addEventListener("click", () => {
// console.log("parks filter");
//     for(listingCard of listingCards){ //iterating over each listing card
//       let cardTitle = listingCard.children[0].children[2].children[0].children[0];
//         if(!cardTitle.textContent.toLowerCase().includes("park")){ //Select cards which includes the word park in it's title
          
//           listingCard.style.display = "none"; 
//         }else{
//           console.log(listingCard.title);
//         listingCard.style.display = "block"; 
        
//       }
      
//     }

// })









// const genericRandomFilter = document.getElementsByClassName("generic-random-filter");
// for(let i = 0; i < genericRandomFilter.length; i++){
//     genericRandomFilter[i].addEventListener("click", () => {
//     console.log("generic random filter");


//       for(listingCard of listingCards){ //iterating over each listing card
//           let randomNumber = Math.random(); //Generating a random number for each listing
//           if(randomNumber < 0.5){  //if the number is less than 0.5 then don't display the listing
//             listingCard.style.display = "none"; 
//           }else{
//           listingCard.style.display = "block"; //if the number is more than 0.5 then display the listing
        
//           }
      
//       }

//     })
// }



//Maps


async function getCoordinates(locationString) {
  try {
    console.log("Fetching coordinates for:", locationString);

    const res = await fetch(`/geocode?location=${encodeURIComponent(locationString)}`);
    const data = await res.json();

    // ✅ Handle array from Nominatim
    if (Array.isArray(data) && data.length > 0) {
      const { lat, lon } = data[0];
      console.log(`✅ Found using Nominatim: ${lat}, ${lon}`);
      return [parseFloat(lat), parseFloat(lon)];
    }

    // ✅ Fallback: Try Photon API
    console.log("Nominatim failed, trying Photon...");
    const photonRes = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(locationString)}`);
    const photonData = await photonRes.json();

    if (photonData.features && photonData.features.length > 0) {
      const coords = photonData.features[0].geometry.coordinates;
      console.log(`✅ Found using Photon: ${coords[1]}, ${coords[0]}`);
      return [coords[1], coords[0]]; // [lat, lon]
    }

    throw new Error("No results found");

  } catch (err) {
    console.error("Map init failed:", err.message);
    throw err;
  }
}




async function initMap() {
  const location = document.getElementById("map").dataset.location;

  try {
    const [lat, lon] = await getCoordinates(location);

    const map = L.map("map").setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup(location)
      .openPopup();
  } catch (err) {
    console.error("Map failed to load:", err.message);
  }
}

initMap();

