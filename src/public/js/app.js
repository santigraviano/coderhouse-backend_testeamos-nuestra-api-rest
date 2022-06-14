(async () => {

  const pug = require('pug')

  // LOAD CART
  const cartResponse = await fetch('/api/carrito')
  const cart = await cartResponse.json()

  // LOAD PRODUCTS
  const productTemplateResponse = await fetch('/templates/product.pug')
  const productTemplate = await productTemplateResponse.text()

  const productsResponse = await fetch('/api/productos')
  const products = await productsResponse.json()

  const $productsContainer = document.getElementById('productsContainer')

  function appendProduct(product) {

    product.inCart = cart.products.some(p => p._id == product._id)

    console.log(product)

    let $productTemplate = document.createElement('template')
    $productTemplate.innerHTML = pug.render(productTemplate, product)

    $productsContainer.appendChild($productTemplate.content)
  }

  products.forEach(appendProduct)

  // ADD TO CART

  async function addToCart(e) {
    const id = e.target.dataset.product
    await fetch(`/api/carrito/productos/${id}`, { method: 'post' })
    e.target.innerHTML = 'Quitar del carrito'
    e.target.className = e.target.className.replace('btn-add-to-cart', 'btn-remove-from-cart').replace('btn-primary', 'btn-danger')
  }

  /*
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', addToCart)
  })
  */

  // REMOVE FROM CART

  async function removeFromCart(e) {
    const id = e.target.dataset.product
    await fetch(`/api/carrito/productos/${id}`, { method: 'delete' })
    e.target.innerHTML = 'Agregar al carrito'
    e.target.className = e.target.className.replace('btn-remove-from-cart', 'btn-add-to-cart').replace('btn-danger', 'btn-primary')
  }

  /*
  document.querySelectorAll('.btn-remove-from-cart').forEach(btn => {
    btn.addEventListener('click', removeFromCart)
  })
  */

  document.getElementById('app').addEventListener('click', (e) => {
    if (e.target.className.includes('btn-add-to-cart')) addToCart(e)
    if (e.target.className.includes('btn-remove-from-cart')) removeFromCart(e)
  })

  

})()