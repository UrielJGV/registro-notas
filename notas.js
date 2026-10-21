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
