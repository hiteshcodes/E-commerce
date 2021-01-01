firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.doc(`users/${user.email}`).onSnapshot((doc) => {
      const email = doc.data().email;
      const phone = doc.data().phone;
      document.querySelector(".account-email").innerHTML = email;
      document.querySelector(".account-phone").innerHTML = phone;
    });
  } else {
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.doc(`users/${user.email}`)
      .collection("orders")
      .onSnapshot((snapshot) => {
        accountOrders(snapshot.docs);
      });
  } else {
  }
  const accountOrders = (data) => {
    const accountOrdersTable = document.querySelector(".account-orders-table");
    let orderHtml = "";
    if (data != 0) {
      document.querySelector(".account-order-div").style.display = "block";
      document.querySelector(".account-no-orders").style.display = "none";
    } else {
      document.querySelector(".account-no-orders").style.display = "block";
      document.querySelector(".account-order-div").style.display = "none";
    }
    data.map((doc) => {
      const ordersData = doc.data();
      let Id = doc.id.slice(0, 10);
      let date = `${ordersData.createdAt.toDate()}`;
      let dateOnly = date.toString().slice(4, 16);
      let html = `
      <tr>
      <td>${Id.toUpperCase()}</td>
        <td><a class="cursor-pointer black-text" onclick="orderDetails('${
          doc.id
        }')">${ordersData.name}</a></td>
        <td>${dateOnly}</td>
        <td><a class="waves-effect waves-light modal-trigger btn red white-text" href="#modal1" onClick="cancelOrders('${
          doc.id
        }')">Cancel</a></td>
      </tr>
      `;
      orderHtml += html;
    });
    accountOrdersTable.innerHTML = orderHtml;
  };
});

const orderDetails = (orderId) => {
  let user = firebase.auth().currentUser;
  let path = db.doc(`users/${user.email}`);

  path
    .collection("orders")
    .doc(`${orderId}`)
    .get()
    .then((doc) => displayOrderDetail(doc.data()))
    .catch((err) => console.log(err.message));

  document.querySelector("#account-default").style.visibility = "hidden";
  document.querySelector(".account-order-detail").style.display = "block";

  const displayOrderDetail = (data) => {
    let currDate = new Date();
    let orderDeliveryDate =
      currDate.getDate() +
      5 +
      " " +
      currDate.toLocaleString("default", { month: "long" }) +
      " " +
      currDate.getFullYear();
    let html = `
    <div>
    <div class="row">
    <div class="col s12 m8">
    <label><a href="account.html" class="black-text"><i class="material-icons">arrow_back</i></a></label> 
      <div class="card darken-1">
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          <p>Order placed on ${data.createdAt
            .toDate()
            .toString()
            .slice(4, 16)}</p>
          </div>
          <div class="card-content">
          <p>Order Total: ${data.price}</p>
          <p>Your order will be delivered before ${orderDeliveryDate} </p>
        </div>
        <div class="card-action">
          <a class="modal-trigger btn red white-text" href="#modal1" onClick="cancelOrders('${orderId}')">Cancel Order</a>
        </div>
      </div>
    </div>
    </div>
  </div>
    `;
    document.querySelector(".account-order-detail").innerHTML = html;
  };
};

const cancelOrders = (id) => {
  var user = firebase.auth().currentUser;
  if (user) {
    let cancel = document.querySelector(".order-cancel");
    cancel.addEventListener("click", () => {
      db.doc(`users/${user.email}`).collection("orders").doc(`${id}`).delete();
      M.toast({ html: "Order has been cancelled" });

      setInterval(() => {
        location.href = "account.html";
      }, 4000);
    });
  } else {
  }
};
