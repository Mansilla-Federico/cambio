function convertir() {
    let monto = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 593; 
    let euro = 654;
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

const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
input.classList.add("input");
const commentsContainer = document.querySelector("#comments-container");

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});

function handleEnter(e, current) {
  if (e.key === "Enter" && e.target.value != "") {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };
    if (current === null) {
      comments.unshift(newComment);
    } else {
      current.responses.unshift(newComment);
    }
    e.target.value = "";
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);
    renderComments(comments, commentsContainer);
  }
}

function renderComments(arr, parent) {
  arr.forEach((element) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");
    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    replyButton.textContent = "Respuesta";
    likeButton.textContent = "Me Gusta";
    replyButton.addEventListener("click", (e) => {
      const newInput = inputContainer.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });
      commentContainer.insertBefore(newInput, responsesContainer);
    });
    likeButton.addEventListener("click", (e) => {
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? element.likes : ""
      } Me gusta`;
    });
    const divContent = document.createElement("div");
    divContent.textContent = element.text;
    const divActions = document.createElement("div");
    //commentContainer.appendChild(document.createTextNode(element.text));
    commentContainer.appendChild(divContent);
    commentContainer.appendChild(divActions);
    divActions.appendChild(replyButton);
    divActions.appendChild(likeButton);
    commentContainer.appendChild(responsesContainer);
    if (element.responses.length > 0) {
      renderComments(element.responses, responsesContainer);
    }
    parent.appendChild(commentContainer);
  });
}

let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let encabezado = document.getElementById("encabezado");

signIn.onclick = function(){
  nameInput.style.maxHeight = "0";
  encabezado.innerHTML = "Login";
  signUp.classList.add("disable");
  signIn.classList.remove("disable");
}

signUp.onclick = function(){
  nameInput.style.maxHeight = "60px";
  encabezado.innerHTML = "Registro";
  signUp.classList.remove("disable");
  signIn.classList.add("disable");
}