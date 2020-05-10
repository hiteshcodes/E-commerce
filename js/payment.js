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
  }
  window.location = "index.html";
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

// // fetch orders in cart
// // get current user id
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User logged in already or has just logged in.
//     // console.log(user.uid);

//     db.doc(`users/${user.uid}`)
//       .collection("usercart")
//       .onSnapshot((snapshot) => {
//         // console.log(snapshot.docs);
//         fetchPaymentCart(snapshot.docs);
//         // data called on index.js
//       });
//   } else {
//     // User not logged in or has just logged out.
//   }
// });

// const paymentCart = document.querySelector(".paymentCart");
// // fetch  cart  from database
// const fetchPaymentCart = (data) => {
//   var user = firebase.auth().currentUser;
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }

//   // console.log(user);

//   let totalPriceCheckout = Number(0);
//   let html2 = "";
//   if (data.length === 0) {
//     console.log("no cart");
//     document.querySelector(".hide-cart").style.display = "block";
//   } else {
//     document.querySelector(".show-cart").style.display = "block";
//     console.log("cart");
//     data.forEach((doc) => {
//       const cart = doc.data();

//       const li2 = `
//     <tr>
//     <td><img src="${cart.image}" width="70px" ></td>
//     <td>${cart.name}</td>
//         <td class="product-prices">${cart.price}</td>
//         </tr>
//         `;

//       html2 += li2;
//       totalPriceCheckout += cart.price;
//     });

//     document.querySelector(
//       ".total-price-count-checkout"
//     ).innerHTML = `₹ ${totalPriceCheckout}`;
//     paymentCart.innerHTML = html2;
//   }
// };
