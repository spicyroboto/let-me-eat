 
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
function getRestaurantsByLocation() {
  console.log("calling getRestaurantsByLocation()");
  var location = document.getElementById("location-search-bar-unhhh").value;
  var request = new XMLHttpRequest();
  request.open('GET', `/getRestaurantsByLocationTag/${location}`);
  request.responseType = 'json';
  request.onload = function() {
    restaurants = request.response;
    console.log('restaurants: ' + restaurants);
    appendRestaurantItems(restaurants);
  };
  request.send();
}

function getAllRestaurants() {
  console.log("calling getAllRestaurants()");
  var request = new XMLHttpRequest();
  request.open('GET', '/getAllRestaurants');
  request.responseType = 'json';
  request.onload = function() {
    restaurants = request.response;
    console.log('restaurants: ' + restaurants);
    appendRestaurantItems(restaurants);
  };
  request.send();
}

function getRestaurantsAvg1() {
  console.log("calling getRestaurantsAvg1()");
  var request = new XMLHttpRequest();
  request.open('GET', '/getRestaurantsWithAvgMenuPrice/10');
  request.responseType = 'json';
  request.onload = function() {
    restaurants = request.response;
    console.log('restaurants: ' + restaurants);
    appendRestaurantItems(restaurants);
  };
  request.send();
}

function getRestaurantsAvg2() {
  console.log("calling getRestaurantsAvg2()");
  var request = new XMLHttpRequest();
  request.open('GET', '/getRestaurantsWithAvgMenuPrice/12');
  request.responseType = 'json';
  request.onload = function() {
    restaurants = request.response;
    console.log('restaurants: ' + restaurants);
    appendRestaurantItems(restaurants);
  };
  request.send();
}

function getRestaurantsAvg3() {
  console.log("calling getAllRestaurants()");
  var request = new XMLHttpRequest();
  request.open('GET', '/getRestaurantsWithAvgMenuPrice/15');
  request.responseType = 'json';
  request.onload = function() {
    restaurants = request.response;
    console.log('restaurants: ' + restaurants);
    appendRestaurantItems(restaurants);
  };
  request.send();
}


function appendRestaurantItems() {
  console.log("calling appendRestaurantItems");
  $(".restaurants").html("");
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
                   
                   
