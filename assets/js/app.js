const listaTareas = document.getElementById('listaTareas');

// eventos
eventListeners();

function eventListeners() {
    // agregar tarea
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);
    // borrar tarea
    listaTareas.addEventListener('click', borrarTarea);

    // cargar tareas almacenadas en local storage
    document.addEventListener('DOMContentLoaded', cargarTareasLocalStorage);
}


// funciones
function agregarTarea(e){
    e.preventDefault();

    // leer el valor del input
    const tarea = document.getElementById('tarea').value;

    if(tarea === "" || tarea.trim() === ""){
        alert("Agrega una tarea valida");
        return;
    }

    // crear boton de eliminar
    const btnBorrar = document.createElement('button');

    btnBorrar.classList.add('borrar-tarea', 'btn-sm', 'btn-danger');
    btnBorrar.innerText = 'X';

    // crear elemento
    const li = document.createElement('li');

    // asignar el texto
    li.innerHTML = tarea;

    // asignar boton borrar.
    li.appendChild(btnBorrar);

    // añadir la tarea a la lista
    listaTareas.appendChild(li);

    // añadir a local storage
    agregarTareaLocalStorage(tarea);

    // limpiar el input
    document.getElementById('tarea').value = '';
}

// eliminar tarea del DOM
function borrarTarea(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-tarea')){
        e.target.parentElement.remove();

        // eliminar de local storage
        borrarTareaLocalStorage(e.target.parentElement.innerText);
    }
}

// agregar tarea al local storage
function agregarTareaLocalStorage(tarea){
    let tareas;
    // leer las tareas del local storage
    tareas = obtenerTareasLocalStorage();
    
    //añadir nueva tarea 
    tareas.push(tarea);

    // convertir de string a arreglo para local storage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// comprobar que haya tareas en local storage, retorna un arreglo
function obtenerTareasLocalStorage(){
    let tareas;
    // revisar valores de local localStorage
    if(localStorage.getItem('tareas') === null){
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    return tareas;
}

// cargar datos de local storage en la lista
function cargarTareasLocalStorage(){
    let tareas;

    tareas = obtenerTareasLocalStorage();

    // if(tareas.length === 0){
    //     return;
    // }else{
        tareas.forEach(function(tarea){
            const btnBorrar = document.createElement('button');

            btnBorrar.classList.add('borrar-tarea', 'btn-sm', 'btn-danger');
            btnBorrar.innerText = 'X';

            // crear elemento
            const li = document.createElement('li');

            // asignar el texto
            li.innerHTML = tarea;

            // asignar boton borrar.
            li.appendChild(btnBorrar);

            // añadir la tarea a la lista
            listaTareas.appendChild(li);
        });
    // }
}

// eliminar tarea de local storage
function borrarTareaLocalStorage(tarea){
    let tareas, tareaBorrar;
    // eliminar X del string la tarea
    tareaBorrar = tarea.substring(0, tarea.length - 1);

    // leer las tareas del local storage
    tareas = obtenerTareasLocalStorage();

    // eliminar de local storage
    tareas.forEach(function(tarea, index){
        if(tareaBorrar === tarea){
            tareas.splice(index, 1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}