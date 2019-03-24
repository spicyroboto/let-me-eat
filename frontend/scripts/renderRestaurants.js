 
let restaurants = null;

let username = document.getElementById("username").innerText.trim();

function getRestaurants() {
  var request = new XMLHttpRequest();
  window.onload = function() {
    var index = document.getElementById("inlineFormCustomSelectPref");
    console.log("index: " + index);
    console.log("indexselectedindex " + index.selectedIndex);
    if (index.selectedIndex > 0) {
      request.open('GET', '/getRestaurantsWithAtLeastXItemsCustomerCanEat/' + username + '/' + index.selectedIndex);
      request.responseType = 'json';
      request.onload = function() {
        restaurants = request.response;
        appendRestaurantItems(restaurants);
      };
      request.send();
    } else {
      request.open('GET', '/getRestaurantsWithAtLeastXItemsCustomerCanEat/' + username + '/1');
      request.responseType = 'json';
      request.onload = function() {
        restaurants = request.response;
        appendRestaurantItems(restaurants);
      };
      request.send();
    }
  }
}

getRestaurants();

function updateUserPref(inlineFormCustomSelectPref) {
  console.log("calling updateuserpref");
  var index = document.getElementById("inlineFormCustomSelectPref");
  if(index.selectedIndex > 0) {
    console.log("SELECTED INDEX: " + index.selectedIndex);
    var req = new XMLHttpRequest();
    console.log("/getRestaurantsWithAtLeastXItemsCustomerCanEat/" + username + '/' + index.selectedIndex);
    req.open('GET', '/getRestaurantsWithAtLeastXItemsCustomerCanEat/' + username + '/' + index.selectedIndex);
    req.responseType = 'json';
    req.onload = function() {
      restaurants = req.response;
      console.log("req.response: " + req.response);
      appendRestaurantItems();
    };
    req.send();
   }
}

// document.getElementById("inlineFormCustomSelectPref").onchange = updateUserPref;





function appendRestaurantItems() {
  console.log("calling appendRestaurantItems");
	restaurants.forEach(function(restaurant) {
	    renderRestaurants(restaurant);
	})
}

function renderRestaurants(restaurant) {

    let html =  `<div class="card">
    <div class="card-header" onclick="window.location.href='/restaurant?${restaurant["restaurantId"]}'">
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
                   
                   
