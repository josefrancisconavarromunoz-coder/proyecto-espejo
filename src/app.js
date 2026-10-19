let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

let filtroActual = 'Todas';

const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');


async function inicializarApp() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  loadingState.style.display = 'none';
  pintarTareas();
}

function pintarTareas() {}

inicializarApp();

function pintarTareas() {
  listaContenedor.innerHTML = '';

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtroActual === 'Pendientes') return !tarea.completada;
    if (filtroActual === 'Completadas') return tarea.completada;
    return true;
  });

  tareasFiltradas.forEach((tarea) => {
    const li = document.createElement('li');
    li.classList.add('item-tarea', tarea.prioridad);

    const spanTitulo = document.createElement('span');
    spanTitulo.textContent = tarea.titulo;
    if (tarea.completada) {
      spanTitulo.classList.add('completada');
    }

    const btnEstado = document.createElement('button');
    btnEstado.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
    btnEstado.addEventListener('click', () => {
      tareas = tareas.map((t) =>
        t.id === tarea.id ? { ...t, completada: !t.completada } : t
      );
      pintarTareas();
    });

    li.appendChild(spanTitulo);
    li.appendChild(btnEstado);
    listaContenedor.appendChild(li);
  });
}