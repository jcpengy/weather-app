

const form = document.querySelector('form'); 

form.addEventListener("submit", e => {
    // prevent default page load 
    e.preventDefault(); 
    // get value from input field and insert into openweather api url 
    const inputValue = document.getElementById('searchbar').value; 
    const apikey = '02d0492417cc94aac783f47bffd90d8b'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric'`; 

    // use fetch api to parse openweather json from url 
    fetch(url) 
    .then(response=>response.json())
    .then(data=>{
        // declare variables from json data
        const { main, name, sys} = data; 

        // determine if entry is already in list 
        const listElements = Array.from(document.querySelectorAll('li')); 
        var addToList = true; 
       

        if (listElements.length > 0) {
            // check if input value contains city and state
            if (inputValue.includes(',')) {
                const inputValueArr = inputValue.split(','); 
                const inputValueCity = inputValueArr[0].toLowerCase().replace(/\s/g,'');; 
                const inputValueState = inputValueArr[1].toLowerCase().replace(/\s/g,'');; 

                // check if city and state currently exist, if yes do not add to list 

                // iterate through list elements
                listElements.forEach(el => {
                    const city = el.querySelector('h2').textContent.toLowerCase().replace(/\s/g,''); 
                    const state = el.querySelector('h3').textContent.toLowerCase().replace(/\s/g,''); 
                    if (city == inputValueCity && state == inputValueState) {
                        document.getElementById("message").innerHTML = 'You already have the data for this state/country'; 
                        addToList = false; 
                        return; 
                    }
                });

            } else { // input value only contains city 
                // if city already exists output that you need more info 
                const inputValueCity = inputValue.toLowerCase().replace(/\s/g,''); 

                listElements.forEach(el => {
                    const city = el.querySelector('h2').textContent.toLowerCase().replace(/\s/g,''); 
                    if (city == inputValueCity) {
                        document.getElementById("message").innerHTML = "Need more info"; 
                        addToList = false; 
                        return; 
                    }
                   
                }); 
            }
        }
        

        // if no continue 
        if (addToList) {
            // create list element
            var listEl = document.createElement('li'); 
            listEl.classList.add('city'); 
            // create html for list element
            var htmlMarkup = `
                <h2>
                    ${name}
                </h2> 
                <h3>
                    ${sys.country}
                </h3>
                <h4>
                    ${main.temp}
                </h4>
            `; 
            listEl.innerHTML = htmlMarkup; 
            // add list element to list 
            document.getElementById('cities').appendChild(listEl); 
            // clear message 
            document.getElementById("message").innerHTML = "";      
        }
        

    })
    .catch(() => {
        document.getElementById("message").innerHTML = "Data for requested city not available"; 
    }); 

    // clear search field after request 
    document.getElementById('searchbar').value = ''; 

})









