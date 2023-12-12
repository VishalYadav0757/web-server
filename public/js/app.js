const formData = document.querySelector("form");
const searchText = document.querySelector("input");
const errorMsg = document.querySelector("#errorMsg");
const forecastMsg = document.querySelector("#forecastMsg");

const weatherData = (data) => {
  if (data?.error) {
    errorMsg.textContent = data?.error;
    forecastMsg.textContent = "";
  } else {
    errorMsg.textContent = data?.location;
    forecastMsg.textContent = data?.forecast;
  }
};

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMsg.textContent = "Loading...";
  forecastMsg.textContent = "";

  fetch("http://localhost:3000/weather?address=" + searchText?.value).then(
    (response) => {
      response.json().then((data) => {
        weatherData(data);
      });
    }
  );
});
