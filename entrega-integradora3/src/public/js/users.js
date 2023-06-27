console.log('desde hbs');

function changeRole(email, newRole) {
    const url = '/api/users'
  const headers = {
    'Content-Type': 'application/json'
  } 
  const method = 'POST'
  const body = JSON.stringify(obj)

  fetch(url, {
    headers,
    method,
    body
  })  
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
}

function deleteUser(email) {
    // Lógica para eliminar el usuario con el correo electrónico "email"
    // Aquí puedes agregar tu código para enviar una solicitud al servidor y eliminar al usuario de la base de datos
}
