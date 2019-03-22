

let items = null;



function getRestrictions() {
var request = new XMLHttpRequest();
request.open('GET', '/getRestrictions');
request.responseType = 'json';

request.onload = function() {
  items = request.response;
  appendSpaceItems();
};
request.send();
}

getRestrictions();








function appendSpaceItems() {
	items.forEach(function(item) {
    console.log(item);
	    renderItem(item);
	})
}

function renderItem(item) {

    let html =  `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="${item["name"]}" value="${item["restrictionId"]}">
    <label class="form-check-label" for="inlineCheckbox1"> ${item["name"]}</label>
  </div>`

    $(".restrictions").append(html);

    let html2 = `                    <li>
    <label>
        <input type="checkbox" name="${item["name"]}" value="${item["restrictionid"]}"> ${item["name"]}
    </label>
</li>`

$(".dropdown-menu").append(html2);
}