

let restaurantId = window.location.search.substring(1);

let username = document.getElementById("username").innerText.trim();


renderOwner();


function renderOwner() {

    let html =  `Hello ${username}`

    $("#owner").append(html);
}


