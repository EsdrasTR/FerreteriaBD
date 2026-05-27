const API = 'http://localhost:3000/productos';


// CARGAR PRODUCTOS

async function cargarProductos(){

    try{

        const res = await fetch(API);

        const productos = await res.json();

        let tabla = '';



        productos.forEach(producto => {

            tabla += `
            
            <tr>

                <td>${producto.idProducto}</td>

                <td>${producto.nombre}</td>

                <td>Q${producto.precio}</td>

                <td>${producto.stock}</td>

                <td>

                    <button class="btn-editar"

                    onclick="editarProducto(
                    ${producto.idProducto},
                    '${producto.nombre}',
                    ${producto.precio},
                    ${producto.stock}
                    )">

                    Editar

                    </button>

                    <button class="btn-eliminar"

                    onclick="eliminarProducto(
                    ${producto.idProducto}
                    )">

                    Eliminar

                    </button>

                </td>

            </tr>

            `;



// parte del dashboard //
 document.getElementById('totalProductos').textContent =
productos.length;



let totalStock = 0;

let valorInventario = 0;

let productoCaro = '';

let precioMayor = 0;

productos.forEach(producto => {

    totalStock += producto.stock;

    valorInventario +=
    producto.precio * producto.stock;



    if(producto.precio > precioMayor){

        precioMayor = producto.precio;

        productoCaro = producto.nombre;
    }
});

document.getElementById('totalStock').textContent =
totalStock;

document.getElementById('valorInventario').textContent =
'Q' + valorInventario;

document.getElementById('productoCaro').textContent =
productoCaro;
// dashboard//



        });

        document.getElementById('tablaProductos').innerHTML = tabla;

    }catch(error){

        console.log(error);
    }
}

limpiar();
cargarProductos();



function buscarProducto(){

    const input =
    document.getElementById('buscador').value.toLowerCase();

    const filas =
    document.querySelectorAll('#tablaProductos tr');



    filas.forEach(fila => {

        const texto =
        fila.textContent.toLowerCase();

        if(texto.includes(input)){

            fila.style.display = '';

        }else{

            fila.style.display = 'none';
        }
    });
}







Swal.fire({

    title:'Producto guardado',

    text:'El producto fue registrado correctamente',

    icon:'success',

    confirmButtonText:'Aceptar'
});


// GUARDAR PRODUCTO

async function guardarProducto(){

    try{

        const id = document.getElementById('idProducto').value;

        const producto = {

            nombre:
            document.getElementById('nombre').value,

            precio:
            document.getElementById('precio').value,

            stock:
            document.getElementById('stock').value,

            idCategoria:
            document.getElementById('categoria').value
        };



       if(id){

    await fetch(`${API}/${id}`, {

        method:'PUT',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify(producto)
    });


    Swal.fire({

        title:'Actualizado',

        text:'Producto actualizado correctamente',

        icon:'success',

        confirmButtonText:'Aceptar'
    });

}else{

            await fetch(API, {

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(producto)
            });
        }


        limpiar();

        cargarProductos();

    }catch(error){

        console.log(error);
    }
}




// EDITAR

function editarProducto(id,nombre,precio,stock){

    document.getElementById('idProducto').value = id;

    document.getElementById('nombre').value = nombre;

    document.getElementById('precio').value = precio;

    document.getElementById('stock').value = stock;
}




// ELIMINAR

async function eliminarProducto(id){

    const resultado = await Swal.fire({

        title:'¿Desea eliminar?',

        text:'No podrá recuperarlo',

        icon:'warning',

        showCancelButton:true,

        confirmButtonText:'Sí, eliminar',

        cancelButtonText:'Cancelar'
    });




    if(resultado.isConfirmed){

        await fetch(`${API}/${id}`, {

            method:'DELETE'
        });

        cargarProductos();

        Swal.fire({

            title:'Eliminado',

            text:'Producto eliminado correctamente',

            icon:'success'
        });
    }
}




// LIMPIAR

function limpiar(){

    document.getElementById('idProducto').value = '';

    document.getElementById('nombre').value = '';

    document.getElementById('precio').value = '';

    document.getElementById('stock').value = '';
}