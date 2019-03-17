                   

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
    <b>${restaurant["name"]}</b>
    </div>
    <div class="card-body">
      <p class="card-text">
      <div class="row">
      <div class="col-md-4">
      <div class="restaurantHeader">Details</div>
      Cuisine Type: ${restaurant["cuisine"]}<br>
      Dining Type: ${restaurant["diningTypeName"]}<br>
      </div>
      <div class="col-md-4">

      <div class="restaurantHeader">Address</div>
      Location: ${restaurant["locationTag"]} <br>
      ${restaurant["streetName"]},
      ${restaurant["city"]},
      ${restaurant["province"]}<br>
      ${restaurant["postalCode"]}
      </div>
      <div class="col-md-4">
      <div class="restaurantHeader">Contact Info</div>
          <text class="phoneNo">${restaurant["phoneNo"]}</text><br>
          ${restaurant["email"]}<br>
          </div>
      </div>




      </p>
    </div>
  </div>`

    $(".restaurants").append(html);
}
                   
                   
