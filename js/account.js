firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.doc(`users/${user.uid}`).onSnapshot((doc) => {
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
    db.doc(`users/${user.uid}`)
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
      let html = `
      <tr>
        <td>${ordersData.name}</td>
        <td>${Id}</td>
        <td><a class="waves-effect waves-light modal-trigger" href="#modal1"
                onClick="cancelOrders('${doc.id}')">Cancel</a></td>
      </tr>
      `;
      orderHtml += html;
    });
    accountOrdersTable.innerHTML = orderHtml;
  };
});
const cancelOrders = (id) => {
  var user = firebase.auth().currentUser;
  if (user) {

    let cancel = document.querySelector(".order-cancel");
    cancel.addEventListener("click", () => {
      db.doc(`users/${user.uid}`).collection("orders").doc(`${id}`).delete();
      M.toast({ html: "Order has been cancelled" });
    });
  } else {
  }
};
