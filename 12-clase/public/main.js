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
