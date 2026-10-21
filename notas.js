"use strict";

/** Datos de partida. Se copian los objetos al iniciar la aplicación. */
const ALUMNOS_INICIALES = [
  {nombre:'Ana',nota:7.5}, {nombre:'Luis',nota:4},
  {nombre:'Marta',nota:9.25}, {nombre:'Pablo',nota:5},
  {nombre:'Lucía',nota:10}, {nombre:'Diego',nota:3.5},
  {nombre:'Elena',nota:6.75}, {nombre:'Hugo',nota:9},
  {nombre:'Sara',nota:1}, {nombre:'Iván',nota:5.5}
];

/** Añade un alumno al final. Modifica la lista recibida.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {string} nombre Nombre del alumno.
 * @param {number} nota Nota numérica.
 * @returns {number} Nueva longitud.
 */
function anadirAlumno(lista, nombre, nota) { return lista.push({nombre,nota}); }

/** Quita el último alumno. Modifica la lista recibida.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {{nombre:string, nota:number}|undefined} Alumno retirado o undefined.
 */
function quitarUltimo(lista) { return lista.pop(); }

/** Busca un alumno por nombre ignorando mayúsculas y espacios exteriores. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {string} nombre Nombre que se busca; se conservan los acentos.
 * @returns {{nombre:string, nota:number}|undefined} Primera coincidencia o undefined.
 */
function buscarPorNombre(lista, nombre) {
  return lista.find(alumno => alumno.nombre.trim().toLocaleLowerCase('es') === nombre.trim().toLocaleLowerCase('es'));
}

/** Inserta sin borrar. Modifica la lista; la posición sigue las reglas de splice.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {number} posicion Índice de inserción.
 * @param {string} nombre Nombre del alumno.
 * @param {number} nota Nota numérica.
 * @returns {undefined} No devuelve un valor.
 */
function insertarEn(lista, posicion, nombre, nota) { lista.splice(posicion,0,{nombre,nota}); }

/** Borra la primera coincidencia por nombre. Modifica la lista si encuentra al alumno.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {string} nombre Nombre que se busca.
 * @returns {boolean} Si se ha borrado un alumno.
 */
function borrarPorNombre(lista, nombre) {
  const alumno = buscarPorNombre(lista,nombre);
  if (alumno === undefined) return false;
  lista.splice(lista.indexOf(alumno),1);
  return true;
}

/** Ordena de mayor a menor nota. No modifica la lista; crea una copia superficial.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {{nombre:string, nota:number}[]} Copia ordenada, conservando el orden de los empates.
 */
function ordenarPorNota(lista) { return [...lista].sort((a,b)=>b.nota-a.nota); }

/** Ordena alfabéticamente en español. No modifica la lista; crea una copia superficial.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {{nombre:string, nota:number}[]} Copia ordenada por nombre.
 */
function ordenarPorNombre(lista) { return [...lista].sort((a,b)=>a.nombre.localeCompare(b.nombre,'es',{sensitivity:'base'})); }

/** Calcula la media sin redondear. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {number} Media o 0 si la lista está vacía.
 */
function notaMedia(lista) { return lista.length ? lista.reduce((suma,alumno)=>suma+alumno.nota,0)/lista.length : 0; }

/** Busca la nota máxima. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {number|null} Nota máxima o null si no hay alumnos.
 */
function notaMaxima(lista) { return lista.length ? Math.max(...lista.map(alumno=>alumno.nota)) : null; }

/** Selecciona notas de cinco o más. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {{nombre:string, nota:number}[]} Nuevo array con aprobados.
 */
function aprobados(lista) { return lista.filter(alumno=>alumno.nota>=5); }

/** Obtiene nombres usando aprobados y map. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {string[]} Nombres de los aprobados.
 */
function nombresAprobados(lista) { return aprobados(lista).map(alumno=>alumno.nombre); }

/** Comprueba si existe una nota diez. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {boolean} Si algún alumno tiene diez.
 */
function hayAlgunDiez(lista) { return lista.some(alumno=>alumno.nota===10); }

/** Comprueba que no haya suspensos. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @returns {boolean} Si todos aprueban; true en la lista vacía.
 */
function todosAprobados(lista) { return lista.every(alumno=>alumno.nota>=5); }

/** Selecciona los mejores alumnos. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {number} n Número de puestos, entero no negativo.
 * @returns {{nombre:string, nota:number}[]} Nuevo array con hasta n alumnos; vacío si n es inválido.
 */
function ranking(lista,n) { return Number.isInteger(n) && n>=0 ? ordenarPorNota(lista).slice(0,n) : []; }

/** Filtra los alumnos. No modifica la lista y siempre devuelve otro array.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {string} filtro todos, aprobados o suspensos.
 * @returns {{nombre:string, nota:number}[]} Copia filtrada; filtros desconocidos muestran todos.
 */
function filtrarAlumnos(lista,filtro) {
  if (filtro === 'aprobados') return aprobados(lista);
  if (filtro === 'suspensos') return lista.filter(alumno=>alumno.nota<5);
  return [...lista];
}

/** Ordena mediante las funciones de la fase 2. No modifica la lista.
 * @param {{nombre:string, nota:number}[]} lista Alumnos.
 * @param {string} criterio nombre, nota-desc o nota-asc.
 * @returns {{nombre:string, nota:number}[]} Copia ordenada; por defecto, alfabéticamente.
 */
function ordenarAlumnos(lista,criterio) {
  if (criterio === 'nota-desc') return ordenarPorNota(lista);
  if (criterio === 'nota-asc') return ordenarPorNota(lista).reverse();
  return ordenarPorNombre(lista);
}

/** Comprueba que el texto represente una nota finita entre 0 y 10. No recibe ni modifica listas.
 * @param {string} texto Valor del campo numérico, con punto decimal.
 * @returns {boolean} Si el campo no está vacío y la nota es válida.
 */
function esNotaValida(texto) {
  return typeof texto === 'string' && texto.trim() !== '' && Number.isFinite(Number(texto)) && Number(texto)>=0 && Number(texto)<=10;
}

// Permite probar las mismas funciones con Node.js, sin dependencias.
if (typeof module !== 'undefined' && module.exports) module.exports = {
  ALUMNOS_INICIALES,anadirAlumno,quitarUltimo,buscarPorNombre,insertarEn,borrarPorNombre,
  ordenarPorNota,ordenarPorNombre,notaMedia,notaMaxima,aprobados,nombresAprobados,
  hayAlgunDiez,todosAprobados,ranking,filtrarAlumnos,ordenarAlumnos,esNotaValida
};
