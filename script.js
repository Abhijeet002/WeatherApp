const apiKey ="a516a792024accb77f34519e395792f4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const appId = `&appid=${apiKey}`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon") 
const matchList = document.getElementById("match-list") 


 async function checkWeather(city){
    const response = await fetch(apiUrl + city + appId);

    if(response.status == "404"){
        document.querySelector(".error").style.display = ("block")
        document.querySelector(".weather").style.display = ("none")
    }

    else{
        var data = await response.json();
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
        document.querySelector(".wind").innerHTML = data.wind.speed +" kmph";
    
    
        if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
    
        else if( data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
    
        else if( data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
    
        else if( data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
    
        else if( data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
    
        else if( data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
    
        document.querySelector(".weather").style.display = ("block")
        document.querySelector(".error").style.display = ("none")
        console.log(data);
    }   
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

// search states and filter them
const searchName = async searchText => {
    const res = await fetch("data/cities.json")
    const cities = await res.json();
    // console.log(places);


    // filter and match cities, countries according to input text
    
    let matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return city.name.match(regex) || city.abbr.match(regex);
    });
    if(searchText.length == 0){
        matches =[];
        matchList.innerHTML= '';
    }
    outputHtml(matches);
};

//show results in html
const outputHtml = matches=>{
    if(matches.length > 0){
        const html = matches.map(match=> `
            <div class="card-body">
            <h4> ${match.name} (${match.abbr})</h4>
            </div>
        `).join('');
        matchList.innerHTML= html;
    } 
};



searchBox.addEventListener("input", ()=> searchName(searchBox.value));

