"use strict";
/** Ejecuta los cuatro errores de forma aislada, captura sus mensajes y muestra las correcciones. */
function ejecutarDepuracion(base) {
  const casos=[];
  const notas=[10,9,1,5];
  notas.sort();
  console.log('Fallo 1: orden como texto',notas);
  casos.push({fallo:1,obtenido:[...notas],corregido:[10,9,1,5].sort((a,b)=>a-b),causa:'sort sin comparador ordena como texto.'});
  const alumnos=base.map(a=>({...a}));
  const antes=alumnos.map(a=>a.nombre);
  const copia=alumnos;copia.sort((a,b)=>a.nota-b.nota);
  console.table(alumnos);
  casos.push({fallo:2,mismaReferencia:copia===alumnos,antes,despues:alumnos.map(a=>a.nombre),correccion:'const copia = [...alumnos]; copia.sort((a,b)=>a.nota-b.nota);'});
  try { [].reduce((a,b)=>a+b); } catch (error) {
    console.log('Fallo 3:',error.message);
    casos.push({fallo:3,error:error.name+': '+error.message,corregido:[].reduce((a,b)=>a+b,0)});
  }
  let leidos=0;
  try {for(let i=0;i<=alumnos.length;i++){console.log(alumnos[i].nombre);leidos++;}} catch(error) {
    console.log('Fallo 4:',error.message);
    casos.push({fallo:4,leidos,error:error.name+': '+error.message,correccion:'Usar i < alumnos.length o for...of.'});
  }
  console.table(base);
  console.table(base.map(a=>a.nota));
  return casos;
}
if (typeof module !== 'undefined' && module.exports) module.exports={ejecutarDepuracion};
if (typeof require !== 'undefined' && require.main===module) ejecutarDepuracion(require('./notas.js').ALUMNOS_INICIALES);
