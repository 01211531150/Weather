const input = document.querySelector("#location-input");

let box = document.querySelector("#result-box");

window.onload = async function () {
  await callApi(`Egypt`);
  display();
};

input.addEventListener(
  "input",
  debounce(async function (e) {
    e.preventDefault();
    await callApi(input.value);
  }, 500)
);

let allData = [];

async function callApi(country= `Egypt`) {
  try {
    const call = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=80b139eb683a4661833211428240612&q=${country}&aqi=no`
    );
    if (!call.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await call.json();
    allData = data;
    display();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function display() {
  if (input.value) {
    box.innerHTML = "";
    let temps = allData.current.temp_c;
    let nameCountry = allData.location.name;
    let icon = allData.current.condition.icon;
    let date = allData.location.localtime;
    let infoWeather = document.createElement("div");
    infoWeather.classList.add("info-weather");
    let weather = document.createElement("div");
    weather.classList.add("weather");
    let image = document.createElement("img");
    let p1 = document.createElement("p");
    p1.classList.add("temperature", "text-white", "mt-3");
    let p2 = document.createElement("p");
    p2.classList.add("text-white");
    let p3 = document.createElement("p");
    p3.classList.add("text-white", "date");
    let span = document.createElement("span");
    span.textContent = "°C";
    p1.textContent = `${temps}`;
    p1.appendChild(span);
    p2.textContent = `${nameCountry}`;
    p3.textContent = `Date: ${date}`;
    image.setAttribute("src", `http:${icon}`);
    weather.appendChild(image);
    weather.appendChild(p1);
    weather.appendChild(p2);
    weather.appendChild(p3);

    infoWeather.appendChild(weather);
    box.appendChild(infoWeather);
  } else {
    box.innerHTML = "";
    let infoWeather = document.createElement("div");
    infoWeather.classList.add("info-weather");
    let weather = document.createElement("div");
    weather.classList.add("weather");
    let image = document.createElement("img");
    let p1 = document.createElement("p");
    p1.classList.add("temperature", "text-white", "mt-3");
    let p2 = document.createElement("p");
    p2.classList.add("text-white");
    let p3 = document.createElement("p");
    p3.classList.add("text-white", "date");
    let span = document.createElement("span");
    span.textContent = "°C";
    p1.textContent = "16";
    p1.appendChild(span);
    p2.textContent = "country";
    p2.classList.add("fw-bold");
    p3.textContent = "Date: N/A";

    image.setAttribute("src", "image/cloud.png");
    weather.appendChild(image);
    weather.appendChild(p1);
    weather.appendChild(p2);
    weather.appendChild(p3);

    infoWeather.appendChild(weather);
    box.appendChild(infoWeather);
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}