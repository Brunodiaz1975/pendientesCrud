//variables globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];


//funciones

const CrearItem = (actividad) =>{
    let item ={
        actividad : actividad,
        estado : false
    }
    if (actividad == null || actividad == '' )  {
        alert("Tienes que Ingresar Dato");
        return
    }
    arrayActividades.push(item);
    return item;
}

const GuardarBD = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    pintarBD();
};

pintarBD = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if (arrayActividades === null) {
        arrayActividades = []
    } else {
        arrayActividades.forEach(element => {

            if (element.estado) {
                listaActividadesUI.innerHTML += `
                <div class="alert alert-success " role="alert" >
                    <b>${element.actividad}</b> ${element.estado}
                    <span class="float-right">
                        <i class="fas fa-edit">done</i>
                        <i  class="fas fa-trash-alt">delete</i>
                    </span>
                </div>`
            } else {
                listaActividadesUI.innerHTML += `
                <div class="alert alert-danger " role="alert" >
                    <b>${element.actividad}</b> ${element.estado}
                    <span class="float-right">
                        <i class="fas fa-edit">done</i>
                        <i  class="fas fa-trash-alt">delete</i>
                    </span>
                </div>`
            }


        });
    }
};

const EliminarBD = (actividad) =>{
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad == actividad) {
            indexArray = index;
        }
    })
        arrayActividades.splice(indexArray, 1);
        GuardarBD();
};

const EditarBD = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento) => elemento.actividad === actividad);
    console.log(arrayActividades[indexArray]);
    arrayActividades[indexArray].estado = true;
    GuardarBD();
}

//EventListener
formularioUI.addEventListener('submit', (e)=>{
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    CrearItem(actividadUI);
    GuardarBD();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', pintarBD);

listaActividadesUI.addEventListener('click', (e) =>{

    e.preventDefault();
    //console.log(e);
    
    
    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = e.path[2].childNodes[1].innerHTML;
        if (e.target.innerHTML === 'delete') {
            //accion de eliminar
            EliminarBD(texto);
        }
        if (e.target.innerHTML === 'done') {
            //accion de editar
            EditarBD(texto);
        }
    } 
});