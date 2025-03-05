document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value
    };
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      alert('Usuario registrado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  document.getElementById('btnFetch').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const users = await response.json();
      document.getElementById('response').innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // PUT - Actualizar usuario
  document.getElementById('btnUpdate').addEventListener('click', async () => {
    const id = document.getElementById('updateId').value;
    const nombre = document.getElementById('updateNombre').value;
    const email = document.getElementById('updateEmail').value;

    console.log('Intentando actualizar usuario:', { id, nombre, email });

    if (!id || !nombre || !email) {
        alert('Por favor, completa todos los campos para actualizar.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/data/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar usuario');
        }

        const result = await response.json();
        alert('Usuario actualizado correctamente');
        console.log('Respuesta del servidor:', result);
    } catch (error) {
        console.error('Error:', error);
    }
});


  // DELETE - Eliminar usuario
  document.getElementById('btnDelete').addEventListener('click', async () => {
    const id = document.getElementById('deleteId').value;
    if (!id) {
      alert('Por favor ingrese un ID para eliminar.');
      return;
    }

    try {
      await fetch(`http://localhost:3000/data/${id}`, { method: 'DELETE' });
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo eliminar el usuario.');
    }
  });
