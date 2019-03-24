 
let menu = null;
let restaurantInfo = null;
let reviews = null;

let restaurantId = window.location.search.substring(1);

function getMenu() {
var request = new XMLHttpRequest();
request.open('GET', '/getFoodItemsIngredientsByMenu/' + restaurantId);
request.responseType = 'json';

request.onload = function() {
  menu = request.response;
  appendMenu();
};
request.send();
}

function getReviews() {
    var request = new XMLHttpRequest();
    request.open('GET', '/getReviews/' + restaurantId);
    request.responseType = 'json';
    
    request.onload = function() {
      reviews = request.response;
      appendReviews();
    };
    request.send();
    }

function getRestaurantInfo() {
    var request = new XMLHttpRequest();
    request.open('GET', '/getRestaurantById/' + restaurantId);
    request.responseType = 'json';
    
    request.onload = function() {
      restaurantInfo = request.response;
      appendRestaurantInfo();
    };
    request.send();
    }

getMenu();
getRestaurantInfo();
getReviews();

function appendReviews() {
    reviews.forEach(function(reviews) {
	    renderReviews(reviews);
	})
}

function renderReviews(reviews) {

    let html =  `<div class="card">
    <div class="card-header"">
    <b>${reviews["username"]}</b>
    </div>
    <div class="card-body">
      <p class="card-text">
      ${reviews["comments"]}
      </p>
    </div>
  </div>`

    $("#reviews").append(html);
}

function appendMenu() {
	menu.forEach(function(menu) {
	    renderMenu(menu);
	})
}

function renderMenu(menu) {

    let html =  `<div class="card">
    <div class="card-header"">
    <b>${menu["fName"]}</b>
    </div>
    <div class="card-body">
      <p class="card-text">
      <div class="row">
      <div class="col-md-4">
      <div class="restaurantHeader">Details</div>
      ${menu["fName"]}<br>
      </div>
      <div class="col-md-4">

      <div class="restaurantHeader">Calories</div>
      Location: ${menu["cal"]}

      </div>
      <div class="col-md-4">
      <div class="restaurantHeader">Price</div>
      ${menu["price"]}
      </div>




      </p>
    </div>
  </div>`

    $("#menu").append(html);
}

function appendRestaurantInfo() {
	restaurantInfo.forEach(function(rInfo) {
	    renderRestaurantInfo(rInfo);
	})
}



function renderRestaurantInfo(restaurantInfo) {

    let html =  `<h3 class="mb-4 bigboy">${restaurantInfo["name"]}</h3>
    <div class="row">
    <div class="col-md-4">
    <div class="restaurantHeader">Details</div>
    Cuisine Type: ${restaurantInfo["cuisine"]}<br>
    Dining Type: ${restaurantInfo["diningTypeName"]}<br>
    </div>
    <div class="col-md-4">
    
    <div class="restaurantHeader">Address</div>
    Location: ${restaurantInfo["locationTag"]} <br>
    ${restaurantInfo["streetName"]},
    ${restaurantInfo["city"]},
    ${restaurantInfo["province"]}<br>
    ${restaurantInfo["postalCode"]}
    </div>
    <div class="col-md-4">
    <div class="restaurantHeader">Contact Info</div>
        <text class="phoneNo">${restaurantInfo["phoneNo"]}</text><br>
        ${restaurantInfo["email"]}<br>
        </div>
        </div>
    
    `

    $("#restaurantInfo").append(html);
}
                   
                   
