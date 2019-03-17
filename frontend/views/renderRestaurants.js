                   

let restaurants = null;



function getRestaurants() {
var request = new XMLHttpRequest();
request.open('GET', '/getAllRestaurants');
request.responseType = 'json';

request.onload = function() {
  restaurants = request.response;
  appendRestaurantItems();
};
request.send();
}

getRestaurants();







function appendRestaurantItems() {
	restaurants.forEach(function(restaurant) {
	    renderRestaurants(restaurant);
	})
}

function renderRestaurants(restaurant) {

    let html =  `<div class="card">
    <div class="card-header">
    ${restaurant["name"]}
    </div>
    <div class="card-body">
      <p class="card-text">
      ${restaurant["cuisine"]}<br>
      ${restaurant["diningTypeName"]}
      </p>
    </div>
  </div>`

    $(".restaurants").append(html);

}
                   
                   
