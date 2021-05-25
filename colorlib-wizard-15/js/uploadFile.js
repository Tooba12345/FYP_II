async function SavePhoto(inp) {
  let user = { name: 'john', age: 34 }
  let formData = new FormData()
  let photo = inp.files[0]

  formData.append('photo', photo)
  formData.append('user', JSON.stringify(user))

  const ctrl = new AbortController() // timeout
  setTimeout(() => ctrl.abort(), 5000)

  try {
    let r = await fetch('/upload/image', {
      method: 'POST',
      body: formData,
      signal: ctrl.signal,
    })
    console.log('HTTP response code:', r.status)
  } catch (e) {
    console.log('Huston we have problem...:', e)
  }
}
const uploadButton = document.querySelector('#imgfile')
uploadButton.addEventListener('change', function () {
  SavePhoto(this)
})
