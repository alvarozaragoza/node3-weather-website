console.log("client side js file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#m1");
const msg2 = document.querySelector("#m2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msg1.textContent = "loading...";
  msg2.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
          msg2.textContent = "";
        } else {
          console.log(data.weather);
          msg1.textContent = data.weather.place_found;
          msg2.textContent =
            data.weather.condition +
            ", temperature is " +
            data.weather.temperature +
            "´C and the feeling is " +
            data.weather.feeling + '´C';
        }
      });
    }
  );
});
