function convertir() {
    var monto = parseInt(document.getElementById("valor").value);
    var resultado = 0;
    var dolar = 593; 
    var euro = 654;
    if (document.getElementById("primera").checked){
        resultado = monto / dolar;
        alert("El cambio de Pesos a Dolares es $" + resultado.toFixed(2));
    }
    else if (document.getElementById("segunda").checked){
        resultado = monto / euro;
        alert("El cambio de Pesos a Euros es $" + resultado.toFixed(2));
    }
    else{
        alert("Debes completar los campos requeridos.")
    }
}

const baseDatos = {
    methods: {
      find: (id) => {
        return baseDatos.items.find((item) => item.id === id);
      },
      remove: (items) => {
        items.forEach((item) => {
          const product = baseDatos.methods.find(item.id);
          product.vacantes = product.vacantes - item.vacantes;
        });
  
        console.log(baseDatos);
      },
    },

    items: [
      {
        id: 0,
        title: "Programa Trading",
        price: 25000,
        vacantes: 5,
      },
      {
        id: 1,
        title: "Inversor Bursatil",
        price: 50000,
        vacantes: 40,
      },
      {
        id: 2,
        title: "Finanzas Personales",
        price: 6000,
        vacantes: 36,
      },
    ],
  };
  
  const shoppingCart = {
    items: [],
    methods: {
      add: (id, vacantes) => {
        const cartItem = shoppingCart.methods.get(id);
        if (cartItem) {
          if (shoppingCart.methods.hasInventory(id, vacantes + cartItem.vacantes)) {
            cartItem.vacantes++;
          } else {
            alert("No hay más vacantes");
          }
        } else {
          shoppingCart.items.push({ id, vacantes });
        }
      },
      remove: (id, vacantes) => {
        const cartItem = shoppingCart.methods.get(id);
  
        if (cartItem.vacantes - 1 > 0) {
          cartItem.vacantes--;
        } else {
          shoppingCart.items = shoppingCart.items.filter(
            (item) => item.id !== id
          );
        }
      },
      count: () => {
        return shoppingCart.items.reduce((acc, item) => acc + item.vacantes, 0);
      },
      get: (id) => {
        const index = shoppingCart.items.findIndex((item) => item.id === id);
        return index >= 0 ? shoppingCart.items[index] : null;
      },
      getTotal: () => {
        let total = 0;
        shoppingCart.items.forEach((item) => {
          const found = baseDatos.methods.find(item.id);
          total += found.price * item.vacantes;
        });
        return total;
      },
      hasInventory: (id, vacantes) => {
        return baseDatos.items.find((item) => item.id === id).vacantes - vacantes >= 0;
      },
      purchase: () => {
        baseDatos.methods.remove(shoppingCart.items);
      },
    },
  };
  
  renderStore();
  
  function renderStore() {
    const html = baseDatos.items.map((item) => {
      return `
          <div class="item">
              <div class="title">${item.title}</div>
              <div class="price">${numberToCurrency(item.price)}</div>
              <div class="vacantes">${item.vacantes} Vacantes</div>
              <div class="actions"><button class="add" data-id="${
                item.id
              }">Inscribirme</button></div>
          </div>`;
    });
  
    document.querySelector("#store-container").innerHTML = html.join("");
  
    document.querySelectorAll(".item .actions .add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        const item = baseDatos.methods.find(id);
  
        if (item && item.vacantes - 1 > 0) {
          shoppingCart.methods.add(id, 1);
          console.log(baseDatos, shoppingCart);
          renderShoppingCart();
        } else {
          alert("Ya no hay vacantes de esta formacion");
        }
      });
    });
  }
  
  function renderShoppingCart() {
    const html = shoppingCart.items.map((item) => {
      const baseDatosItem = baseDatos.methods.find(item.id);
      return `
              <div class="item">
                  <div class="title">${baseDatosItem.title}</div>
                  <div class="price">${numberToCurrency(baseDatosItem.price)}</div>
                  <div class="vacantes">${item.vacantes} Formacion</div>
                  <div class="subtotal">
                    Subtotal: ${numberToCurrency(item.vacantes * baseDatosItem.price)}
                  </div>
                  <div class="actions">
                      <button class="addOne" data-id="${baseDatosItem.id}">+</button>
                      <button class="removeOne" data-id="${baseDatosItem.id}">-</button>
                  </div>
              </div>
          `;
    });

    const closeButton = `
    <div class="cart-header">
      <button id="bClose">Cerrar</button>
    </div>`;
    const purchaseButton =
      shoppingCart.items.length > 0 
      ? `
      <div class="cart-actions">
      <button id="bPurchase">Terminar compra</button>
    </div>`
        : "";
    const total = shoppingCart.methods.getTotal();
    const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;
    document.querySelector("#shopping-cart-container").innerHTML =
      closeButton + html.join("") + totalDiv + purchaseButton;
  
    document.querySelector("#shopping-cart-container").classList.remove("hide");
    document.querySelector("#shopping-cart-container").classList.add("show");
  
    document.querySelectorAll(".addOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        shoppingCart.methods.add(id, 1);
        renderShoppingCart();
      });
    });
  
    document.querySelectorAll(".removeOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        shoppingCart.methods.remove(id, 1);
        renderShoppingCart();
      });
    });
  
    document.querySelector("#bClose").addEventListener("click", (e) => {
      document.querySelector("#shopping-cart-container").classList.remove("show");
      document.querySelector("#shopping-cart-container").classList.add("hide");
    });
    const bPurchase = document.querySelector("#bPurchase");
    if (bPurchase) {
      bPurchase.addEventListener("click", (e) => {
        shoppingCart.methods.purchase();
      });
    }
  }
  
  function numberToCurrency(n) {
    return new Intl.NumberFormat("es-US", {
      maximumSignificantDigits: 2,
      style: "currency",
      currency: "USD",
    }).format(n);
  }