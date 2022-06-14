// LOG OUT
document.getElementById('logoutButton').addEventListener('click', async (e) => {
  e.preventDefault()
  await fetch('/logout', { method: 'post' })
  window.location.replace('/')
})