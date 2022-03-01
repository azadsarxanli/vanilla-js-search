const inputv = document.querySelector(".modal-input");
let container = document.querySelector(".table-data tbody");

let letters = /^[A-Za-z]+$/;
inputv.addEventListener("keyup", (e) => {
  const inputField = inputv.value;
  const string = inputField.replace(/\s+/, " ");
  const regEx = new RegExp(string, "i");
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://avanqardups.az/search?string=${string}`);
  xhr.onload = function () {
    // container.innerHTML = "";

    if (this.status === 200) {
      const responseTxt = JSON.parse(this.responseText);
      const result = responseTxt.filter((item) =>
        item.Name.toLowerCase().includes(string.toLowerCase())
      );
      console.log(result, "result");
      container.innerHTML = "";
      console.log(responseTxt.length, "responsetxt");
      if (result.length > 0) {
        result.map(function (element) {
          //ma series
          const detailsName = element.Name.split(" ").join("_");
          const detailsUrl = `https://avanqardups.az/product?productName=${detailsName}`;
          if (result) {
            container.parentElement.classList.add("active");
            container.innerHTML += `
            <tr class="product-tr">
               <td class="product-link"><a class="product-link-color" href=${detailsUrl}> ${element.Name}</a> </td>
              </tr>
                  `;
          } else {
            container.innerHTML = `
          <div class="not-found">daxil etdiyiniz kelime tapilmadi.</div>
        `;
            console.log("birtinci elsededir");
          }
        });
      } else {
        container.parentElement.classList.add("active");

        container.innerHTML = `
          <div class="not-found">daxil etdiyiniz kelime tapilmadi.</div>
        `;

        //
      }
    }
  };
  xhr.send();
});
