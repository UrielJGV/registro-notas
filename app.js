"use strict";
// Lista de trabajo independiente de los objetos de partida.
let alumnos = ALUMNOS_INICIALES.map(alumno=>({...alumno}));
const porId = id => document.getElementById(id);

/** Escribe un mensaje de validación o confirmación sin interpretar HTML. */
function mostrarMensaje(texto, error = false) {
  porId('mensaje').textContent = texto;
  porId('mensaje').classList.toggle('error',error);
}

/** Actualiza las cuatro estadísticas de la lista completa, no de la vista filtrada. */
function pintarResumen() {
  const maxima = notaMaxima(alumnos);
  const datos = [
    ['Alumnos',String(alumnos.length)],
    ['Nota media',notaMedia(alumnos).toFixed(2).replace('.',',')],
    ['Nota máxima',maxima === null ? '—' : String(maxima).replace('.',',')],
    ['Aprobados',String(aprobados(alumnos).length)]
  ];
  porId('resumen').replaceChildren(...datos.map(([titulo,valor])=>{
    const dl=document.createElement('dl');dl.className='metrica';
    const dt=document.createElement('dt');dt.textContent=titulo;
    const dd=document.createElement('dd');dd.textContent=valor;
    dl.append(dt,dd);return dl;
  }));
}

/** Único punto de dibujo de las filas. Aplica filtro y orden sobre copias. */
function pintarTabla() {
  const visibles = ordenarAlumnos(filtrarAlumnos(alumnos,porId('filtro').value),porId('orden').value);
  const cuerpo=porId('filas-alumnos');cuerpo.replaceChildren();
  visibles.forEach(alumno=>{
    const fila=document.createElement('tr');
    const nombre=document.createElement('td');nombre.textContent=alumno.nombre;
    const nota=document.createElement('td');const etiqueta=document.createElement('span');
    etiqueta.className='nota '+(alumno.nota>=5?'aprobada':'suspensa');
    etiqueta.textContent=String(alumno.nota).replace('.',',');
    etiqueta.setAttribute('aria-label',`${alumno.nota}: ${alumno.nota>=5?'aprobado':'suspenso'}`);
    nota.append(etiqueta);
    const acciones=document.createElement('td');const boton=document.createElement('button');
    boton.type='button';boton.className='borrar';boton.textContent='×';
    boton.setAttribute('aria-label',`Borrar a ${alumno.nombre}`);
    boton.addEventListener('click',()=>{
      borrarPorNombre(alumnos,alumno.nombre);
      pintarTabla();pintarResumen();
      mostrarMensaje(`${alumno.nombre} se ha eliminado del registro.`);
      porId('nombre').focus();
    });
    acciones.append(boton);fila.append(nombre,nota,acciones);cuerpo.append(fila);
  });
  if (!visibles.length) {
    const fila=document.createElement('tr'),celda=document.createElement('td');
    celda.colSpan=3;celda.className='vacia';
    celda.textContent=alumnos.length?'No hay alumnos que cumplan este filtro.':'Todavía no hay alumnos. Añade el primero con el formulario.';
    fila.append(celda);cuerpo.append(fila);
  }
  porId('cantidad-visible').textContent=`Mostrando ${visibles.length} de ${alumnos.length} alumnos`;
}

/** Valida el formulario, añade y refresca tabla y resumen. */
function manejarAlta(evento) {
  evento.preventDefault();
  const nombre=porId('nombre').value.trim(),nota=porId('nota').value;
  if (!nombre) { mostrarMensaje('Escribe el nombre del alumno.',true);porId('nombre').focus();return; }
  if (buscarPorNombre(alumnos,nombre)) { mostrarMensaje('Ya existe un alumno con ese nombre.',true);porId('nombre').focus();return; }
  if (!esNotaValida(nota)) { mostrarMensaje('Introduce una nota numérica entre 0 y 10.',true);porId('nota').focus();return; }
  const alumno={nombre,nota:Number(nota)};
  anadirAlumno(alumnos,alumno.nombre,alumno.nota);
  porId('formulario-alumno').reset();pintarTabla();pintarResumen();
  const aparece=filtrarAlumnos([alumno],porId('filtro').value).length>0;
  mostrarMensaje(`${nombre} se ha añadido.${aparece?'':' No aparece en la tabla porque no cumple el filtro actual.'}`);
  porId('nombre').focus();
}

porId('filtro').addEventListener('change',pintarTabla);
porId('orden').addEventListener('change',pintarTabla);
porId('formulario-alumno').addEventListener('submit',manejarAlta);
pintarTabla();pintarResumen();
