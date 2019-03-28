

let restaurantId = window.location.search.substring(1);

let username = document.getElementById("username").innerText.trim();

let popularCustomerUsername;
// function getPopularCustomer() {
//     // var request = new XMLHttpRequest();
//     // request.open('GET', '/getRestaurantsWithAtLeastXItemsCustomerCanEat/' + username + '/1');
//     // request.responseType = 'json';
//     // request.onload = function () {
//         // popularCustomerUsername = request.response;
//     // };
//     // request.send();
// }




function renderOwner() {

    let html = `Hello ${username}`

    $("#owner").append(html);
}

renderOwner();

