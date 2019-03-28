
let username = document.getElementById("username").innerText.trim();
function getRestaurantId() {
    var request = new XMLHttpRequest();
    console.log(`/getRestaurantIdByOwnerUsername/${username}`);
    request.open('GET', `/getRestaurantIdByOwnerUsername/${username}`);
    request.responseType = 'json';
    
    request.onload = function() {
      var items = request.response;
      var item = items[0];
      console.log("items: " + items);
      console.log("item: " + item);
      renderRestaurantId(item);
    };
    request.send();
}

getRestaurantId();

function renderRestaurantId(item) {
    window.onload = function() {
        var rid = item["restaurantId"];
        console.log(rid);
        document.getElementById("inputRid").value = rid;
        console.log(document.getElementById("inputRid").value);
    }
    
}
