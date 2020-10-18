//default mobile

db.collection("mobilePhones")
  .orderBy("name", "asc")
  .onSnapshot((snapshot) => {
    fetchMobilePhones(snapshot.docs);
  });
  
// ---------------fetch products(mobilePhones) from databse ---------------

const mobilePhonesContainer = document.querySelector(".mobilePhonesWrapper");
const fetchMobilePhones = (data) => {
  let html = "";
  data.map((doc) => {
    const mobilePhones = doc.data();
    const li = `
    <div class="mobile">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${mobilePhones.image}">
      </div>
      <div class="card-content">
          <span class="card-title activator black-text text-darken-1"><h6>${mobilePhones.name}</h6><i class="material-icons three-dots right">more_vert</i></span>
           <h6>₹. ${mobilePhones.price}</h6>
          <button class="btn btn-add-to-cart" type="submit" name="action" onClick="addToCart('${mobilePhones.name}','${mobilePhones.price}', '${mobilePhones.image}')">Add to cart
          <i class="material-icons right">shopping_cart</i>
          </button>
      </div>
      <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Specs<i class="material-icons right">close</i></span>
          <label>Color:</label>
             <li>${mobilePhones.color}</li>
             <label>Storage:</label>
             <li>${mobilePhones.storage}</li>
             <label>Processor:</label>
             <li>${mobilePhones.processor}</li>
             <label>Rear-Camera:</label>
             <li>${mobilePhones.rearcamera}</li>
             <label>Front-Camera:</label>
             <li>${mobilePhones.frontcamera}</li>
             <label>Battery:</label>
             <li>${mobilePhones.battery}</li>
      </div>
    </div>
    </div>

        `;

    html += li;
  });
  mobilePhonesContainer.innerHTML = html;
};
// ----------------add to cart from frontend----------------
function addToCart(name, price, image) {
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    M.toast({ html: "Please Login or Signup" });
  }

  db.doc(`users/${user.email}`)
    .collection("usercart")
    .doc(`${name}`)
    .get()
    .then((doc) => {
      console.log(doc.exists);
      if (doc.exists) {
        M.toast({ html: "Item already added to your cart" });
      } else {
        db.doc(`users/${user.email}`)
          .collection(`usercart`)
          .doc(`${name}`)
          .set({
            useruid: user.uid,
            name: name,
            price: Number(price),
            image: image,
          })
          .then(() => {
            M.toast({ html: "Item added to your cart" });
          });
      }
    });
}

// search result for mobile phones
// search result for mobile phones

const mobileForm = document.querySelector(".search-mobile-form");
mobileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let mobileSearch = document.querySelector(".search-mobile").value;
  let searchToLowerCase = mobileSearch.toLowerCase();
  db.collection("mobilePhones")
    .where("brand", "==", `${searchToLowerCase}`)
    .onSnapshot((snapshot) => {
      fetchMobilePhones(snapshot.docs);
    });

  // ---------------fetch products(mobilePhones) from databse ---------------
  const mobilePhonesContainer = document.querySelector(".mobilePhonesWrapper");
  const fetchMobilePhones = (data) => {
    let html = "";
    data.map((doc) => {
      const mobilePhones = doc.data();
      const li = `
      <div class="mobile">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${mobilePhones.image}">
      </div>
      <div class="card-content">
          <span class="card-title activator black-text text-darken-1"><h6>${mobilePhones.name}</h6><i class="material-icons three-dots right">more_vert</i></span>
           <h6>₹. ${mobilePhones.price}</h6>
          <p><button style= "font-size: 11px" class="btn " type="submit" name="action" onClick="addToCart('${mobilePhones.name}','${mobilePhones.price}', '${mobilePhones.image}')">Add to cart
          <i class="material-icons right">shopping_cart</i>
          </button></p>
      </div>
      <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Specs<i class="material-icons right">close</i></span>
          <label>Color:</label>
             <li>${mobilePhones.color}</li>
             <label>Storage:</label>
             <li>${mobilePhones.storage}</li>
             <label>Processor:</label>
             <li>${mobilePhones.processor}</li>
             <label>Camera:</label>
             <li>${mobilePhones.camera}</li>
             <label>Battery:</label>
             <li>${mobilePhones.battery}</li>
      </div>
    </div>
    </div>
        `;

      html += li;
    });
    mobilePhonesContainer.innerHTML = html;
  };
  // ----------------add to cart from frontend----------------
  function addToCart(name, price, image) {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
      M.toast({ html: "Please Login or Signup" });
    }

    db.doc(`users/${user.email}`)
      .collection("usercart")
      .doc(`${name}`)
      .get()
      .then((doc) => {
        console.log(doc.exists);
        if (doc.exists) {
          M.toast({
            html: "Item already added to your cart",
          });
        } else {
          db.doc(`users/${user.email}`)
            .collection(`usercart`)
            .doc(`${name}`)
            .set({
              useruid: user.uid,
              name: name,
              price: Number(price),
              image: image,
            })
            .then(() => {
              M.toast({ html: "Item added to your cart" });
            });
        }
      });
  }
});

const closeSearch = document.querySelector(".close");
closeSearch.addEventListener("click", (e) => {
  console.log("close Search");
  location.reload();
});
