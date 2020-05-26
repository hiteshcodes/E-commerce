//checkout form validation
const proceedPayment = () => {
  var name = document.getElementById("name").value;
  var telephone = document.getElementById("telephone").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zipCode = document.getElementById("zip-code").value;
  var state = document.getElementById("state").value;
  var errors = document.getElementById("checkout-form-errors");
  if (
    name == 0 ||
    telephone == 0 ||
    address == 0 ||
    city == 0 ||
    zipCode == 0 ||
    state == 0
  ) {
    errors.innerHTML = "Fields cannot remain empty";
  } else {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }

    db.doc(`users/${user.email}`)
      .collection("userAddressInfo")
      .doc()
      .set({
        name: name,
        telephone: telephone,
        address: address,
        city: city,
        zipCode: zipCode,
        state: state,
      })
      .then(() => {
        window.location = "payment.html";
        console.log("location reload");
      });
    // save orders from cart info to new document
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    let userDoc = db.doc(`users/${user.email}`);
    userDoc
      .collection("usercart")
      .get()
      .then((data) => {
        let items = [];
        data.forEach((doc) => {
          console.log(doc.exist);
          items.push({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            name: doc.data().name,
            price: doc.data().price,
          });
        });
        for (let i = 0; i < items.length; i++) {
          userDoc.collection(`orders`).add(items[i]);
          userDoc.collection(`usercart`).doc(items[i].name).delete();
        }
      });
  }
};

// fetch orders in cart
// get current user id
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    // console.log(user.uid);
    db.doc(`users/${user.email}`)
      .collection("usercart")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs);
        fetchCheckoutCart(snapshot.docs);
        // data called on index.js
      });
  } else {
    // User not logged in or has just logged out.
  }
});

const checkoutCart = document.querySelector(".checkoutCart");
// fetch  cart  from database
const fetchCheckoutCart = (data) => {
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }

  // console.log(user);

  let totalPriceCheckout = Number(0);
  let html2 = "";
  if (data.length === 0) {
    console.log("no cart");
    document.querySelector(".hide-cart").style.display = "block";
  } else {
    document.querySelector(".show-cart").style.display = "block";
    console.log("cart");
    data.forEach((doc) => {
      const cart = doc.data();

      const li2 = `
    <tr>
    <td><img src="${cart.image}" width="70px" ></td>
    <td>${cart.name}</td>
        <td class="product-prices">${cart.price}</td>
        </tr>
        `;

      html2 += li2;
      totalPriceCheckout += cart.price;
    });

    document.querySelector(
      ".total-price-count-checkout"
    ).innerHTML = `₹ ${totalPriceCheckout}`;
    checkoutCart.innerHTML = html2;
  }
};
