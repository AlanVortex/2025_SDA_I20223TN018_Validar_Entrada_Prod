document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const inputs = form.querySelectorAll('input');
    const submitButton = form.querySelector('button[type="submit"]');
    const codigoPaisBtn = document.getElementById('codigoPaisBtn');
    const codigoPaisMenu = document.getElementById('codigoPaisMenu');
    const telefonoInput = document.getElementById('telefono');

    submitButton.disabled = true;

    const patterns = {
        telefono: /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/, 
        rfc: /^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{2,3}$/, 
        contacto: /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?:\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/, 
        razon_social: /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?:\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/,
        email: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|utez\.edu\.mx)$/, 
    };

    function validarCampo(input) {
        const { id, value } = input;
        let isValid = true;

        if (!value.trim()) {
            isValid = false;
        } else if (patterns[id] && !patterns[id].test(value)) {
            isValid = false;
        }

        if (!isValid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }

        return isValid;
    }

    function validarFormulario() {
        let formularioValido = true;

        inputs.forEach((input) => {
            if (!validarCampo(input)) {
                formularioValido = false;
            }
        });

        submitButton.disabled = !formularioValido;
    }

    codigoPaisMenu.addEventListener('click', (event) => {
        const selectedCode = event.target.getAttribute('data-code');
        if (selectedCode) {
            codigoPaisBtn.textContent = selectedCode;
            codigoPaisBtn.setAttribute('data-code', selectedCode);
        }
    });

    telefonoInput.addEventListener('input', function () {
        validarFormulario();
    });

    inputs.forEach((input) => {
        input.addEventListener('input', validarFormulario);
    });

    // Solo se encarga de validar campos visualmente, no maneja el submit
});
