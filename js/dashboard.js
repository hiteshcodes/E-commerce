const mobilesList = document.querySelector(".mobiles-table-content");

const fetchMobilePhones = (data) => {
  let mobilelist = "";

  data.map((doc) => {
    const mobilePhonesList = doc.data();
    const li = `
        <tr>
            <td>${mobilePhonesList.name}</td>
            <td contenteditable="true">${mobilePhonesList.color}</td>
             <td contenteditable="true"><img src=${mobilePhonesList.image} width="50px"></td>
            <td contenteditable="true">${mobilePhonesList.price}</td>
            <td contenteditable="true">${mobilePhonesList.storage}</td>
            <td contenteditable="true">${mobilePhonesList.processor}</td>
            <td contenteditable="true">${mobilePhonesList.camera}</td>
            <td contenteditable="true">${mobilePhonesList.battery}</td>
            <td><i class="material-icons" onClick="updateItem('${mobilePhonesList.name}')">check</i></td>
            
        </tr>
        `;

    mobilelist += li;
  });
  mobilesList.innerHTML = mobilelist;
};
const updateItem = (name) => {
  console.log(name);
};
