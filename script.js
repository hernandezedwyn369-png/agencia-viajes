const API_URL =
"https://agencia-viajes-g1fu.onrender.com";

let idEditar = null;

async function cargarDestinos(){

    const res =
    await fetch(`${API_URL}/destinos`);

    const datos =
    await res.json();

    renderizar(datos);
}

async function guardarDestino(){

    const destino =
    document.getElementById("destino").value;

    const pais =
    document.getElementById("pais").value;

    const precio =
    document.getElementById("precio").value;

    const datos = {
        destino,
        pais,
        precio
    };

    if(idEditar){

        await fetch(
            `${API_URL}/editar/${idEditar}`,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(datos)
            }
        );

        idEditar = null;
        document.getElementById("btnGuardar").innerText =
        "Guardar Viaje";
    }else{

        await fetch(
            `${API_URL}/guardar`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(datos)
            }
        );

    }

    document.getElementById("destino").value = "";
    document.getElementById("pais").value = "";
    document.getElementById("precio").value = "";

    cargarDestinos();
}

async function buscarDestino(){

    const termino =
    document.getElementById("buscar").value;

    const res =
    await fetch(
    `${API_URL}/buscar/${termino}`
    );

    const datos =
    await res.json();

    renderizar(datos);
}

async function eliminarDestino(id){

    await fetch(
    `${API_URL}/eliminar/${id}`,
    {
        method:"DELETE"
    });

    cargarDestinos();
}

function editarDestino(
    id,
    destino,
    pais,
    precio
){

    idEditar = id;

    document.getElementById("destino").value = destino;
    document.getElementById("pais").value = pais;
    document.getElementById("precio").value = precio;

    document.getElementById("btnGuardar").innerText="Actualizar viaje";
}

function renderizar(destinos){

    const contenedor =
    document.getElementById("contenedor");

    contenedor.innerHTML =
    destinos.map(v=>`

        <div class="card">

            <h3>🌎 ${v.destino}</h3>

            <p><strong>País:</strong>
            ${v.pais}</p>

            <p><strong>Costo:</strong>
            $${v.precio}</p>

            <button onclick="editarDestino(
            '${v._id}',
            '${v.destino}',
            '${v.pais}',
            '${v.precio}'
            )">
            Editar
            </button>

            <button
            class="btnEliminar"
            onclick="eliminarDestino('${v._id}')">

            Eliminar

            </button>

        </div>

    `).join("");
}

cargarDestinos();