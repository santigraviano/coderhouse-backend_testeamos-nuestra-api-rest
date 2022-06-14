$avatarFileInput = document.getElementById('avatarFileInput')
$avatarInput = document.getElementById('avatarInput')

$avatarFileInput.addEventListener('change', async (e) => {
  const avatar = e.target.files[0]

  const body = new FormData()
  body.append('image', avatar)

  const imageUploadResponse = await fetch('/auth/avatar-upload', {
    method: 'post',
    body
  })

  const avatarFilename = await imageUploadResponse.text()

  $avatarInput.value = avatarFilename

})