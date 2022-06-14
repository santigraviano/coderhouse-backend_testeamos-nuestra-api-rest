document.getElementById('sendOrder').addEventListener('click', (e) => {
  e.preventDefault()
  console.log('Sending order...')
  fetch('/send-order', { method: 'post' })
  window.location.replace('/success')
})