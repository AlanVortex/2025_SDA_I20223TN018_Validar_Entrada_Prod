async function registrarEmpresa(empresa) {
    try {
        const response = await fetch("http://localhost:8080/api/empresas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(empresa)
        });

        return response.ok;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function obtenerEmpresas() {
    try {
        const response = await fetch("http://localhost:8080/api/empresas");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}
