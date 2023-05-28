// Getting the refarence to the element
const userCardsContainer = document.querySelector(
  "[data-user-cards-container]"
);
const userCardTemplate = document.querySelector("[data-user-card-template]");
const searchIput = document.querySelector("[data-search]");

searchIput.focus();
let users = [];
searchIput.addEventListener("input", (e) => {
  // scan the key being pressed and getting the value
  const value = e.target.value.toLowerCase();
  // loop through the returned object
  users.forEach((user) => {
    // checking if value somehow matches the  users info
    const isVisibility =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisibility);
  });
});
//fetching the users json object literal
fetch("https://jsonplaceholder.typicode.com/users")
  //object literal into actual object
  .then((res) => res.json())
  //not it is on data
  .then((data) => {
    // loop on it and return an object
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      // getting the refarence
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      // letting users info go to the HTML template
      header.textContent = user.name;
      body.textContent = user.email;
      userCardsContainer.append(card);

      return { name: user.name, email: user.email, element: card };
    });
  });
