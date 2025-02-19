document.addEventListener("DOMContentLoaded", function () {
    // Solo cargar empresas si estamos en la página de ver empresas
    if (document.getElementById("tablaEmpresas")) {
        cargarEmpresas();
    }

    // Código para el formulario de registro
    if (document.getElementById("registroForm")) {
        document.getElementById("registroForm").addEventListener("submit", async function (event) {
            event.preventDefault();

            // Llamar a la función de validación del formulario
            if (!validarFormulario()) {
                return;
            }

            // Crear el objeto con los datos del formulario
            const empresa = {
                razonSocial: document.getElementById("razonSocial").value,
                rfc: document.getElementById("rfc").value,
                telefono: document.getElementById("telefono").value,
                contacto: document.getElementById("contacto").value,
                correo: document.getElementById("correo").value
            };

            // Intentar registrar la empresa
            const success = await registrarEmpresa(empresa);

            // Si el registro es exitoso
            if (success) {
                alert("Empresa registrada con éxito");
                document.getElementById("registroForm").reset();
                await cargarEmpresas();
            } else {
                alert("Error al registrar la empresa");
            }
        });
    }
});

async function cargarEmpresas() {
    const empresas = await obtenerEmpresas();
    let lista = "";

    empresas.forEach(emp => {
        lista += `<tr>
            <td>${emp.razonSocial}</td>
            <td>${emp.rfc}</td>
            <td>${emp.telefono}</td>
            <td>${emp.contacto}</td>
            <td>${emp.correo}</td>
            <td>
                <button onclick="verDetalles('${emp.uuid}')" class="btn btn-info">Ver Detalles</button>
            </td>
        </tr>`;
    });

    const tablaEmpresas = document.getElementById("tablaEmpresas");
    if (tablaEmpresas) {
        tablaEmpresas.innerHTML = lista;
    } else {
        console.error("Elemento con id 'tablaEmpresas' no encontrado.");
    }
}

// Función para redirigir a la vista de detalles
function verDetalles(uuid) {
    window.location.href = `detalles.html?id=${uuid}`;
}



// Función para validar el formulario
function validarFormulario() {
    const razonSocial = document.getElementById("razonSocial");
    const rfc = document.getElementById("rfc");
    const telefono = document.getElementById("telefono");
    const contacto = document.getElementById("contacto");
    const correo = document.getElementById("correo");

    // Verificar si los campos son válidos
    if (!razonSocial.checkValidity()) {
        alert("Razón social no válida");
        return false;
    }

    if (!rfc.checkValidity()) {
        alert("RFC no válido");
        return false;
    }

    if (!telefono.checkValidity()) {
        alert("Teléfono no válido");
        return false;
    }

    if (!contacto.checkValidity()) {
        alert("Nombre de contacto no válido");
        return false;
    }

    if (!correo.checkValidity()) {
        alert("Correo no válido");
        return false;
    }

    // Si todos los campos son válidos
    return true;
}

// Función para registrar la empresa
async function registrarEmpresa(empresa) {
    try {
        const response = await fetch('http://localhost:8080/api/empresas', {  // Cambia esta URL por la correcta en tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresa)
        });

        if (response.ok) {
            return true;  // Registro exitoso
        } else {
            throw new Error('Error al registrar la empresa');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        return false;
    }
}
