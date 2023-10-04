// Array para almacenar usuarios registrados
const usuariosRegistrados = [];

// Función para registrar un usuario
function registrarUsuario() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    
    if (username == '' && password == ''){
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = "Debe Ingresar Usuario y Contraseña";
        mensaje.style.display = 'block';
    } else {

    // Creo un objeto constructor de usuario con uso de this, según observacion solicitada en
    // PreEntrega2
    class Usuario {
        constructor(username, password){
            this.username = username;
            this.password = password;
        }
    };
    
    const userIn = usuariosRegistrados.find(user => user.username === username && user.password === password);
    
    if (userIn){
        // Mostrar el mensaje de usuario existente
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = "Usuario existente.";
        mensaje.style.display = 'block';
    }else{
    // Agregar el usuario al array
    usuariosRegistrados.push(new Usuario(username, password));

    // Almaceno en sessionStorage 
    // Uso stringify para transformar el objeto string en formato JSON. 

    const json = sessionStorage.setItem('loggedInUser', JSON.stringify(usuariosRegistrados));

    // Limpiar los campos del formulario de registro
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';

    const mensaje = document.getElementById('mensaje');
        mensaje.textContent = "Usuario Registrado con EXITO.";
        mensaje.style.display = 'block';
    }
}
}

// Función para iniciar sesión
function iniciarSesion() {
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Obtengo los datos de usuario almacenados en sessionStorage
    // Uso parse para transformar string en formato JSON 
    const storedUsers = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (storedUsers) {
        // Buscar el usuario en los datos almacenados
        const usuario = storedUsers.find(user => user.username === username && user.password === password);

        if (usuario) {
            // Mostrar mensaje de inicio de sesión exitoso
            document.getElementById('loggedInUser').textContent = usuario.username;
            document.getElementById('loggedIn').style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('showRegistrationForm').style.display = 'none';
            document.getElementById('showLoginForm').style.display = 'none';
            // window.location.href = "../pages/reservas.html";
        } else {
            // Mostrar mensaje de error
            const mensaje = document.getElementById('mensaje');
            mensaje.textContent = "Usuario o Contraseña Incorrectos! Intente de nuevo!";
            mensaje.style.display = 'block';
        }
    } else {
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = "No hay usuarios registrados. Por favor, regístrate primero.";
        mensaje.style.display = 'block';
    } 
}

// Función para cambiar entre el formulario de registro y el formulario de inicio de sesión
function cambiarFormulario(formulario) {
    if (formulario === 'registro') {
        document.getElementById('registrationForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        mensaje.style.display = 'none';
    } else if (formulario === 'inicioSesion') {
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        mensaje.style.display = 'none';
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    document.getElementById('loggedIn').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// Agregar eventos a los botones
document.getElementById('registerButton').addEventListener('click', function (e) {
    e.preventDefault();
    registrarUsuario();
});

document.getElementById('loginButton').addEventListener('click', function (e) {
    e.preventDefault();
    iniciarSesion();
});

document.getElementById('logoutButton').addEventListener('click', function () {
    cerrarSesion();
});

// Agregar eventos para mostrar el formulario de registro e inicio de sesión
document.getElementById('showRegistrationForm').addEventListener('click', function () {
    cambiarFormulario('registro');
});

document.getElementById('showLoginForm').addEventListener('click', function () {
    cambiarFormulario('inicioSesion');
});

// Mostrar el formulario de registro por defecto
cambiarFormulario('registro');
