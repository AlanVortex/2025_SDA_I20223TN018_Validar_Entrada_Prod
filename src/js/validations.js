document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const inputs = form.querySelectorAll('input');
    const submitButton = form.querySelector('button[type="submit"]');
    const codigoPaisBtn = document.getElementById('codigoPaisBtn');
    const codigoPaisMenu = document.getElementById('codigoPaisMenu');
    const telefonoInput = document.getElementById('telefono');

    // Deshabilita el botón de envío por defecto
    submitButton.disabled = true;

    // Expresiones regulares para las validaciones
    const patterns = {
        telefono: /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/, // Solo números y espacios entre los números
        rfc: /^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{2,3}$/, // RFC sin símbolos
        // contacto: /^[A-Za-z\s]+$/, // Contacto sin números ni símbolos
        contacto: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
        email: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|utez\.edu\.mx)$/, // Correos válidos con dominios permitidos
    };

    // Función para validar un campo específico
    function validarCampo(input) {
        const { id, value } = input;
        let isValid = true;

        // Valida si el campo está vacío o no cumple con la regex
        if (!value.trim()) {
            isValid = false;
        } else if (patterns[id] && !patterns[id].test(value)) {
            isValid = false;
        }

        // Aplica clases de validación
        if (!isValid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }

        return isValid;
    }

    // Función para validar el formulario completo
    function validarFormulario() {
        let formularioValido = true;

        inputs.forEach((input) => {
            if (!validarCampo(input)) {
                formularioValido = false;
            }
        });

        submitButton.disabled = !formularioValido;
    }

    // Cambiar el código de país seleccionado
    codigoPaisMenu.addEventListener('click', (event) => {
        const selectedCode = event.target.getAttribute('data-code');
        if (selectedCode) {
            // Actualizar el botón con el código seleccionado
            codigoPaisBtn.textContent = selectedCode;
            codigoPaisBtn.setAttribute('data-code', selectedCode);
        }
    });

    // Validar el campo del teléfono
    telefonoInput.addEventListener('input', function () {
        validarFormulario();
    });

    // Validar formulario al cambiar los inputs
    inputs.forEach((input) => {
        input.addEventListener('input', validarFormulario);
    });

    // Validar al enviar el formulario
    form.addEventListener('submit', function (event) {
        let formularioValido = true;

        inputs.forEach((input) => {
            if (!validarCampo(input)) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            event.preventDefault();
            alert('Por favor, completa todos los campos correctamente.');
        } else {
            event.preventDefault();
            alert('¡Formulario enviado correctamente!');
            form.reset();
            submitButton.disabled = true;
        }
    });
});
