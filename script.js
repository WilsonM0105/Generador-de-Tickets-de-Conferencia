document.getElementById('ticket-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const avatarInput = document.getElementById('avatar');
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const github = document.getElementById('github').value.trim();
  const errorBox = document.getElementById('form-errors');
  errorBox.textContent = '';

  const avatarFile = avatarInput.files[0];

  // Validaciones
  if (!fullName || !email || !github || !avatarFile) {
    errorBox.textContent = 'Por favor, completa todos los campos.';
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    errorBox.textContent = 'El correo electrónico no es válido.';
    return;
  }

  if (!['image/jpeg', 'image/png'].includes(avatarFile.type)) {
    errorBox.textContent = 'Solo se permiten imágenes JPG o PNG.';
    return;
  }

  if (avatarFile.size > 500 * 1024) {
    errorBox.textContent = 'La imagen debe pesar menos de 500KB.';
    return;
  }

  // Mostrar ticket
  document.getElementById('ticket-name').textContent = fullName;
  document.getElementById('ticket-email').textContent = email;
  document.getElementById('ticket-github').textContent = github;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('ticket-avatar').src = e.target.result;
    document.getElementById('ticket-result').hidden = false;
  };
  reader.readAsDataURL(avatarFile);

  // Limpiar formulario (opcional)
  this.reset();
});
