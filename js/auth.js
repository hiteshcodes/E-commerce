//auth
//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    setupUI(user);
    // console.log(user);
  } else setupUI();
  // fetchMobilePhones([]);
  // fetchAccessories([]);
});

// get current user id
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    // console.log(user.uid);

    //get user cart details
    db.doc(`users/${user.email}`)
      .collection("usercart")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs);
        fetchCart(snapshot.docs);
        // data called on index.js
      });
  } else {
    // User not logged in or has just logged out.
  }
});

//remove items from cart
function removeItem(name, useruid, price) {
  var user = firebase.auth().currentUser;
  totalPriceAfterRemoveITem = 0;
  if (user) {
    // User is signed in.
    console.log(useruid);
  } else {
    // No user is signed in.
  }

  // db.doc(`users/${user.uid}`).collection('usercart').doc(`${name}`).delete()
  db.doc(`users/${user.email}`).collection("usercart").doc(name).delete();
  M.toast({ html: "Item removed" });

  var del = document.querySelector(".remove-from-cart");
  var row = del.parentNode.parentNode;
  row.parentNode.removeChild(row);
  totalPriceAfterRemoveITem -= price;
  document.querySelector(".total-price-count").innerHTML =
    totalPriceAfterRemoveITem;
}

//change ui on auth
const accountDetails = document.querySelector(".account-details");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");

const setupUI = (user) => {
  if (user) {
    //show user info in accounts section when logged in
    const html = `
    <div>You are signed as : ${user.email}</div>
        `;

    accountDetails.innerHTML = html;

    //toggle UI elemnts (nav links)
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide user info in accounts section when logged in
    accountDetails.innerHTML = "";

    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//fetch user cart in modal
// fetch  cart  from database

const cartContainer = document.querySelector(".cartWrapper");
const fetchCart = (data) => {
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
  // console.log(user);
  let html = "";
  let totalPrice = Number(0);
  if (data.length === 0) {
    document.querySelector(".hide-cart").style.display = "block";
    document.querySelector(".show-cart").style.display = "none";
  } else {
    document.querySelector(".show-cart").style.display = "block";
    document.querySelector(".hide-cart").style.display = "none";
    data.forEach((doc) => {
      const cart = doc.data();

      const li = `
      <tr class="cart-row">
      <td><img src="${cart.image}" width="50px" ></td>
      <td>${cart.name}</td>
      <td><i class="material-icons remove-from-cart" onclick="removeItem('${cart.name}', '${cart.price}')">remove_circle_outline</i></td>
      <td class="product-prices">${cart.price}</td>
        </tr>
    `;

      html += li;
      totalPrice += cart.price;
    });

    document.querySelector(".total-price-count").innerHTML = totalPrice;
    cartContainer.innerHTML = html;
  }
};

//signup form
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const password2 = signupForm["signup-password-repeat"].value;
  const phone = signupForm["signup-phone"].value;
  var validatePhone = /^\d{10}$/;

  if (password != password2) {
    signupForm.querySelector(".signup-error").innerHTML =
      "Password dosen't match";
  } else if (phone.match(validatePhone)) {
    signupForm.querySelector(".signup-error").innerHTML =
      "Please enter a valid phone number";
  } else {
    // signup the user and add firestore data
    document.querySelector(".signup-progress").style.visibility = "visible";

    auth // we'll get the email and password from input fields
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        // we will need this uid to specify every user
        return data.user.uid;
      })
      .then((uid) => {
        // this credentials object will be save in users/${user email}
        const credentials = {
          email,
          uid,
          phone,
        };

        // call the reference to the doc and set the credentials object to users/email/
        db.doc(`users/${email}`).set(credentials);
      })

      .then((c) => {
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector(".signup-error").innerHTML = "";
      })
      .catch((err) => {
        signupForm.querySelector(".signup-error").innerHTML = err.message;
        document.querySelector(".signup-progress").style.visibility = "hidden";
      });
  }
});

//logout user
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    M.toast({ html: "User signed out" });
    window.location = "index.html";
  });
});

//login user
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  document.querySelector(".login-progress").style.visibility = "visible";
  auth
    .signInWithEmailAndPassword(email, password)
    .then((c) => {
      //close the login modal and reset the form

      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".signin-error").innerHTML = "";
      location.reload();
    })
    .catch((err) => {
      loginForm.querySelector(".signin-error").innerHTML = err.message;
      document.querySelector(".login-progress").style.visibility = "hidden";
    });
});

// footer content from database
db.collection("footerContent").onSnapshot((snapshot) => {
  footerAddress(snapshot.docs);
});

const footerAddress = (data) => {
  data.forEach((doc) => {
    const footerContent = doc.data();
    let addressHtml = "";
    const address = `
    <a href="https://goo.gl/maps/ZVHQ8i8ViySepJ6t8" class="white-text" target="_blank"><i class="fa fa-map-marker"></i> ${footerContent.address}</a>
    `;
    addressHtml += address;

    let phoneHtml = "";
    const phone = `
    <p><i class="fa fa-phone"></i>Phone -<a href="tel:${footerContent.phone}">${footerContent.phone}</a></p>
    `;
    phoneHtml += phone;
    document.querySelector(".footer-address").innerHTML = addressHtml;
    document.querySelector(".footer-phone").innerHTML = phoneHtml;
  });
};

// --------------------setup materialize component for modals--------------------
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//forget password
function forgetpass() {
  document.querySelector("#login-form").style.display = "none";
  document.querySelector(".reset-form").style.display = "block";
}
//back to Login
function backToLogin() {
  document.querySelector("#login-form").style.display = "block";
  document.querySelector(".reset-form").style.display = "none";
  document.querySelector(".forget-password-success").style.display = "none";
  document.querySelector(".forget-password-content").style.display = "block";
}
// switch to signup from login
const newUser = () => {
  document.querySelector(".signin-content").style.display = "none";
  document.querySelector(".signup-content").style.display = "block";
};
// switch to signin from signup
const oldUser = () => {
  document.querySelector(".signin-content").style.display = "block";
  document.querySelector(".signup-content").style.display = "none";
};
// function reset() password {}
let resetForm = document.querySelector(".reset-form");
resetForm.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.querySelector(".femail").value;
  if (email == "") {
    document.querySelector(".forget-password-error").innerHTML =
      "Email cannot remain empty";
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        document.querySelector(".forget-password-content").style.display =
          "none";
        document.querySelector(".forget-password-success").style.display =
          "block";
      })
      .catch((err) => {
        document.querySelector(".forget-password-error").innerHTML =
          err.message;
      });
  }
});

// scripts for navbar
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
document.addEventListener("DOMContentLoaded", function () {
  var toolTip = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(toolTip);
});
