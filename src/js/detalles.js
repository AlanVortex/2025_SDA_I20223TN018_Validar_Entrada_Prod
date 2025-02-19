document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
        console.log(id);
        document.getElementById("detallesEmpresa").innerHTML = "<p>Error: No se proporcionó un ID válido.</p>";
        return;
    }

    const empresa = await obtenerEmpresaPorId(id);

    if (empresa) {
        document.getElementById("detallesEmpresa").innerHTML = `
            <p><strong>Razón Social:</strong> ${empresa.razonSocial}</p>
            <p><strong>RFC:</strong> ${empresa.rfc}</p>
            <p><strong>Teléfono:</strong> ${empresa.telefono}</p>
            <p><strong>Contacto:</strong> ${empresa.contacto}</p>
            <p><strong>Correo:</strong> ${empresa.correo}</p>
        `;
    } else {
        document.getElementById("detallesEmpresa").innerHTML = "<p>Error al obtener los detalles de la empresa.</p>";
    }
});

async function obtenerEmpresaPorId(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/empresas/${id}`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return await response.json();
    } catch (error) {
        console.error("Error al obtener la empresa:", error);
        return null;
    }
}
