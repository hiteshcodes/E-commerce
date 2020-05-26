function orderPlacedOnline() {
  var nameOnCard = document.getElementById("name-on-card").value;
  var cardNumber = document.getElementById("card-number").value;
  var expDate = document.getElementById("exp-date").value;
  var cvv = document.getElementById("cvv").value;
  var errors = document.getElementById("checkout-form-errors");

  if (nameOnCard == 0 || cardNumber == 0 || expDate == 0 || cvv == 0) {
    errors.innerHTML = `Fields can't remain empty`;
  } else {
    errors.style.display = "none";
    var toastHTML =
      '<span>Order Placed Successfully</span> <i class="material-icons">check_circle</i>';
    M.toast({ html: toastHTML });
    console.log("else statement");
    window.location = "index.html";
  }
}

function onlinePayChecked() {
  document.getElementById("online-pay-label").style.color = "#000000";
  document.getElementById("cod-pay-label").style.color = "#9e9e9e";
  document.getElementById("form-card-payment").style.display = "block";
  document.getElementById("form-cod-payment").style.display = "none";
}
function codChecked() {
  document.getElementById("online-pay-label").style.color = "#9e9e9e";
  document.getElementById("cod-pay-label").style.color = "#000000";
  document.getElementById("form-card-payment").style.display = "none";
  document.getElementById("form-cod-payment").style.display = "block";
}

function orderPlacedCod() {
  var toastHTML =
    '<span>Order Placed Successfully</span>&nbsp;&nbsp; <i class="material-icons">check_circle</i>';
  M.toast({ html: toastHTML });
  window.location = "index.html";
}
