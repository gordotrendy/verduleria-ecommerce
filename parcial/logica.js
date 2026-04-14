
//arreglo de objetos que dentro tienen sus caracteristicas y los identifico con su ID

const productos = [
    {
        id:1,
        nombre:"Banana",
        precio:1800,
        imagen:"imagenes/banana.PNG",
        descripcion:"Bananas Ecuatorianas de Primera Calidad",
        categoria:"Fruta"
    },
    {
        id:2,
        nombre:"Berenjena",
        precio:500,
        imagen:"imagenes/berenjena.PNG",
        descripcion:"Berenjenas Nuevas Recien Traidas del Mercado",
        categoria:"Verdura"
    },
    {
        id:3,
        nombre:"Lechuga Crespa",
        precio:850,
        imagen:"imagenes/lechugacrespa.PNG",
        descripcion:"Lechuga Fresca Recien Cosechada Directo del Campo",
        categoria:"Verdura"
    },
     {
        id:4,
        nombre:"Mandarina",
        precio:1000,
        imagen:"imagenes/mandarina.PNG",
        descripcion:"Mandarinas Recien Traidas de Entre Rios",
        categoria:"Fruta"
    },
     {
        id:5,
        nombre:"Pera",
        precio:1500,
        imagen:"imagenes/pera.PNG",
        descripcion:"Peras de Temporada, Suaves y Jugosas",
        categoria:"Fruta"
    },
     {
        id:6,
        nombre:"Pimiento Verde",
        precio:900,
        imagen:"imagenes/pimientoverde.PNG",
        descripcion:"Pimientos Verdes Grandes y Frescos",
        categoria:"Verdura"
    },
     {
        id:7,
        nombre:"Tomate Perita",
        precio:1600,
        imagen:"imagenes/tomateperita.PNG",
        descripcion:"Tomate Perita Muy Fresco con un Color Espectacular",
        categoria:"Verdura"
    },
     {
        id:8,
        nombre:"Tomate Redondo",
        precio:1800,
        imagen:"imagenes/tomateredondo.PNG",
        descripcion:"Tomate Redondo Fresquisimo con un Color y Sabor Espectacular",
        categoria:"Verdura"
    },
     {
        id:9,
        nombre:"Zanahoria",
        precio:1000,
        imagen:"imagenes/zanahoria.PNG",
        descripcion:"Zanahorias Recien Cosechadas",
        categoria:"Verdura"
    },
     {
        id:10,
        nombre:"Zapallito Verde",
        precio:600,
        imagen:"imagenes/zapallitoverde.PNG",
        descripcion:"Zapallitos Verdes con Delicioso Sabor e Increible Color",
        categoria:"Verdura"
    },
     {
        id:11,
        nombre:"Zapallo Brasilero",
        precio:1000,
        imagen:"imagenes/zapallobrasilero.PNG",
        descripcion:"Zapallo Brasilero de Excelente Calidad y Muy Dulce",
        categoria:"Verdura"
    }
   
];


//creo una variable para mi carrito la cual es un arreglo para guardar lo que se agregue
let carrito=[];

//--------------------------//
//FUNCIONES DEL CARRITO
//--------------------------//

//esta funcion carga los productos en el HTML
function cargarProductos()
{
    //busco el elemento lista-producto para luego insertar los productos
    const contenedordeproductos=document.getElementById('lista-productos');

    //paso por cada uno de los productos
    productos.forEach
    (producto=>
    {
        //utilizo comilla invertida para insertar las variables mas facilmente y asi cada producto genere una seccion de boostrap
        const productoHTML= `
            <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text flex-grow-1">${producto.descripcion}</p>
                        <p class="fw-bold text-success">$${producto.precio}</p>
                        <button class="btn btn-success btn-agregar" data-id="${producto.id}">
                            🛒 Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        //el innerHTML es para que agregue en el HTML y utilizo el += para sumar en el contenedor
        contenedordeproductos.innerHTML+=productoHTML;
        
    }
    );

}

//esta funcion pide el carrito del localstorage
function obtenerCarrito()
{
    //pido el item carrito del localstorage y los devuelvo en la variable
    const carritoGuardado=localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado):[];
}

//esta funcion guarda el carrito en el localstorage
function guardarCarrito()
{
    //el stringify es para convertir el array en cadena de texto
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

// esta funcion para el contador del carrito
function actualizarContadordelCarrito()
{
    //busca el elemento en el HTML donde mostrara la cantidad
    const contador= document.getElementById('carrito-contador');
    //uso .reduce para recorrer el array y me cuente cuantos items hay en el carrito
    const totalItems=carrito.reduce((total, item)=>total+item.cantidad, 0);
    //muesto el total de items
    contador.textContent= totalItems > 0 ? totalItems:'';
}

//esta funcion para los botones de agregado
function configurarBotonesAgregar()
{
    //consulta en el HTML
    const botonesAgregar=document.querySelectorAll('.btn-agregar');

    botonesAgregar.forEach
    (boton =>
    {
        boton.addEventListener
        ('click', function()
        {
            const idProducto=parseInt(this.getAttribute('data-id'));
            agregarProductoAlCarrito(idProducto);
        }
        );
    }
    );

}

//esta funcion para agregar productos al carrito y verificar si esta logeado para agregar productos
function agregarProductoAlCarrito(idProducto)
{

    //verifico si el usuario está logueado
    if (!usuarioLogueado()) {
        alert('Debes iniciar sesión para agregar productos al carrito');
        
        //si no lo esta muestre el modal de login
        const loginModalElement = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
        
        return;
    }

    //busco el producto en el array
    const productoEncontrado=productos.find(producto=>producto.id===idProducto);
    
    //verifico si esta
    const productoEnCarrito=carrito.some(item=>item.producto.id===idProducto);

   
    if (productoEnCarrito)
    {
         //verifico si esta en el carrito
        const itemExistente=carrito.find(item=>item.producto.id===idProducto);
        
        itemExistente.cantidad+=1;
        
    }
    else
    {
        carrito.push(
            {
                producto: productoEncontrado,
                cantidad: 1 
            }
        );
    }

    guardarCarrito();
    actualizarContadordelCarrito();
}

//esta funcion muestra el modal del carrito
function mostrarCarrito()
{

    //verifico si el usuario está logueado
    if (!usuarioLogueado()) {
        alert('Debes iniciar sesión para ver el carrito');
        
        //si no lo esta que muestre el modal de login
        const loginModalElement = document.getElementById('loginModal');
        const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalElement);
        loginModal.show();
        
        return;
    }

    //busco en el HTML
    const carritoItems=document.getElementById('carrito-items');
    let total=0;

    carritoItems.innerHTML='';

    //si esta vacio avise
    if(carrito.length===0)
    {
        carritoItems.innerHTML='<p class="text-center">El carrito esta vacio</p>';
        document.getElementById('carrito-total').textContent='0';
    }
    else
    {

        //recorro cada item y genero el HTML
        carrito.forEach(item=>{
            const subtotal=item.producto.precio*item.cantidad;
            total+=subtotal;
            
            //hago un html para el item y lo agrego al contenedor
            carritoItems.innerHTML+= `
            <div class="carrito-item border-bottom pb-3 mb-3">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <strong>${item.producto.nombre}</strong>
                    </div>
                    <div class="col-md-2">
                        $${item.producto.precio}
                    </div>
                    <div class="col-md-2">
                        ${item.cantidad}
                    </div>
                    <div class="col-md-2">
                        $${subtotal}
                    </div>
                </div>
            </div>
            `;
        });
        //para mostrar el total
        document.getElementById('carrito-total').textContent= total;
    }



   
    const modalElement=document.getElementById('carritoModal');
    const modalExistente=bootstrap.Modal.getInstance(modalElement);

    if (modalExistente) modalExistente.hide(); //cierra si esta abierto

    //getorcreateinstance busca si el modal existe
    const modal=bootstrap.Modal.getOrCreateInstance(modalElement);
   //si existe abro el modal
    modal.show();
}
    
//funcion vaciar carrito
function vaciarCarrito()
{
    carrito=[];
    guardarCarrito();
    actualizarContadordelCarrito();
    mostrarCarrito();
    document.getElementById('carrito-total').textContent = '0';
}


//esta funcion inicializa las funciones del carrito cuando la pagina carga osea DOM loaded (document objet model)
document.addEventListener
('DOMContentLoaded', function()
{

    cerrarSesion();

    carrito=obtenerCarrito();

    cargarProductos();

    configurarBotonesAgregar();

    //para que al hacer click muestre el carrito
    document.getElementById('btn-carrito').addEventListener('click', function(){
        mostrarCarrito();
    })

    //para que al hacer click se vacie el carrito
    document.getElementById('vaciar-carrito').addEventListener('click',vaciarCarrito);


    actualizarContadordelCarrito();

    //inicializo el estado del login al cargar la pagina
    actualizarEstado();
}
);


//-------------------------------//
//FUNCIONES DE LOGIN
//-------------------------------//

function usuarioLogueado()
{
    return localStorage.getItem('usuarioLogueado')==='true';
}

function estadodelLogin(estado)
{
    localStorage.setItem('usuarioLogueado', estado);
    actualizarEstado();
}

function actualizarEstado()
{
    const btnCarrito = document.getElementById('btn-carrito');
    const btnLogin = document.getElementById('btn-login');
    
    if (usuarioLogueado()) {
        //si esta logueado abra el carrito
        if (btnCarrito) {
            btnCarrito.disabled = false;
            btnCarrito.classList.remove('btn-secondary');
            btnCarrito.classList.add('btn-success');
        }
        //oculte el boton
        if (btnLogin) {
            btnLogin.style.display = 'none';
        }
        } 
        else 
        {
        //si no esta logueado le deshabilite el carrito
        if (btnCarrito) {
            btnCarrito.disabled = true;
            btnCarrito.classList.remove('btn-success');
            btnCarrito.classList.add('btn-secondary');
        }
        //y le lance el modal de login
        if (btnLogin) {
            btnLogin.style.display = 'block';
        }
    }
}

function cerrarSesion()
{
    localStorage.removeItem('usuarioLogueado');
    actualizarEstado();
    
}

document.addEventListener('DOMContentLoaded', function()
    {   
        //traigo los elementos del DOM
        const loginForm=document.getElementById('login-form');
        const loginError=document.getElementById('login-error');
        const loginModalElement=document.getElementById('loginModal');
        //revisa si hay instancia sino la crea para controlarlo
        const loginModal=bootstrap.Modal.getOrCreateInstance(loginModalElement);

        loginForm.addEventListener('submit', function (e)
            {
                //esto evita que se recargue la pagina al enviar el formulario
                e.preventDefault();

                const usuario=document.getElementById('usuario').value.trim();
                const password=document.getElementById('password').value.trim();

                //verifico si estan vacios los campos
                if(usuario==='' || password==='')
                {
                    //muestra el error al remover lo que lo hace invisible
                    loginError.classList.remove('d-none');
                    loginError.textContent='Por favor completa todos los campos, asi inicias sesion re facil :D';
                    return;
                }

                //creo un usuario admin para un ingreso simple
                if (usuario==='admin' && password==='admin')
                {
                    //al agregarlo, hago invisible el error
                    loginError.classList.add('d-none');
                    loginModal.hide();
                    //lo agrego luego de que inicie sesion asi se guarde en el localstorage
                    estadodelLogin(true);
                    alert(`Bienvenido, ${usuario}`);
                }
                else
                {
                    loginError.classList.remove('d-none');
                    loginError.textContent='Usuario o contraseña incorrectas';
                }

                
            }
        );
    }
);
