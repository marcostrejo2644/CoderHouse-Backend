const socket = io.connect();
const productTable = document.querySelector('.productTable');

socket.on('products', (products) => {
  renderProducts(products);
});

socket.emit('newProduct');

socket.on('newProduct', (products) => {
  console.log('andando', products);
  renderProducts(products);
});

const renderProducts = (products) => {
  // productTable.innerHTML = ``;
  const content = `<h2>Productos</h2>
                    <table class="table margin-left">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Thumbnail</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${products.map(
                      (product) =>
                        `<tr>
                        <th class="row">${product.id}</th>
                        <td>${product.product}</td>
                        <td>${product.price}</td>
                        <td> <img src=${product.thumbnail} width="50px" height="50px"> </td>
                      </tr>`
                    )}
                    </tbody>`;
  productTable.innerHTML = content;
};

// Chat

const chatForm = document.querySelector('#form');
const chatMessages = document.querySelector('#messages');
const chatEmail = document.querySelector('#email');
const chatInput = document.querySelector('#input');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (chatEmail && chatInput) {
    socket.emit('chatMessage', chatEmail.value, chatInput.value);
    chatInput.value = '';
  }
});

socket.on('messagesHistory', (messages) => {
  console.log(messages);
  if (messages.length > 0) {
    messages.map((msg) => {
      let item = document.createElement('li');
      item.innerHTML = `
      <p><span class="emailRender">${msg.email}</span><span class="timeRender">${msg.time}</span>: <span class="messageRender">${msg.message}</span></p>
      `;
      chatMessages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
});

socket.on('sendMessage', function (msg) {
  let item = document.createElement('li');
  item.innerHTML = `
  <p><span class="emailRender">${msg.email}</span><span class="timeRender">${msg.time}</span>: <span class="messageRender">${msg.message}</span></p>
  `;
  chatMessages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
