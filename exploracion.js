"use strict";
/** Ejecuta los trece ejemplos y devuelve instantáneas de sus resultados. */
function explorarArrays() {
  const filas = [];
  const a = ['x','y','z'];
  filas.push({linea:1,resultado:a[0]}, {linea:2,resultado:String(a[3])}, {linea:3,resultado:a.length}, {linea:4,resultado:[1,'dos',true].length});
  const c = [1]; const retornoC = c.push(2);
  filas.push({linea:5,resultado:JSON.stringify({retorno:retornoC,c})});
  const p = [1,2,3]; const q = p; const retornoQ = q.push(4);
  filas.push({linea:6,resultado:JSON.stringify({retorno:retornoQ,p})});
  const r = [...p]; r.push(5);
  filas.push({linea:7,resultado:JSON.stringify({r,p})});
  filas.push({linea:8,resultado:JSON.stringify([10,9,1].sort())}, {linea:9,resultado:JSON.stringify([10,9,1].sort((x,y)=>x-y))});
  const operaciones = [n=>n.push(4),n=>n.pop(),n=>n.slice(0,2),n=>n.map(x=>x*2)];
  operaciones.forEach((operacion,i)=>{const n=[3,1,2];const retorno=operacion(n);filas.push({linea:i+10,resultado:JSON.stringify({retorno,n})});});
  console.table(filas);
  return filas;
}
if (typeof module !== 'undefined' && module.exports) module.exports = {explorarArrays};
if (typeof require !== 'undefined' && require.main === module) explorarArrays();
