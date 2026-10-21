"use strict";
/** Pruebas repetibles, aisladas y sin modificar los datos de partida. */
function ejecutarPruebas() {
  const f = typeof module !== 'undefined' && module.exports ? require('./notas.js') : {
    ALUMNOS_INICIALES,anadirAlumno,quitarUltimo,buscarPorNombre,insertarEn,borrarPorNombre,ordenarPorNota,ordenarPorNombre,
    notaMedia,notaMaxima,aprobados,nombresAprobados,hayAlgunDiez,todosAprobados,ranking,filtrarAlumnos,ordenarAlumnos,esNotaValida
  };
  const resultados=[];
  const lista=()=>[{nombre:'Ana',nota:7.5},{nombre:'Luis',nota:4}];
  const nombres=l=>l.map(a=>a.nombre);
  function comprobar(descripcion,obtenido,esperado) {
    const correcta=Object.is(obtenido,esperado)||JSON.stringify(obtenido)===JSON.stringify(esperado);
    console.assert(correcta,descripcion,{obtenido,esperado});
    resultados.push({descripcion,correcta,obtenido:obtenido===undefined?'undefined':obtenido,esperado:esperado===undefined?'undefined':esperado});
  }
  let a=lista();comprobar('Añadir devuelve longitud',f.anadirAlumno(a,'Eva',8),3);comprobar('Añadir modifica la lista',nombres(a),['Ana','Luis','Eva']);
  a=[];comprobar('Añadir a lista vacía',f.anadirAlumno(a,'Eva',0),1);
  a=lista();comprobar('Quitar devuelve último',f.quitarUltimo(a),{nombre:'Luis',nota:4});comprobar('Quitar modifica lista',nombres(a),['Ana']);comprobar('Quitar de vacía',f.quitarUltimo([]),undefined);
  a=lista();comprobar('Buscar existente',f.buscarPorNombre(a,'Ana'),a[0]);comprobar('Buscar inexistente',f.buscarPorNombre(a,'Pepe'),undefined);comprobar('Buscar sin mayúsculas ni espacios exteriores',f.buscarPorNombre(a,' ANA '),a[0]);
  a=lista();comprobar('Insertar no devuelve valor',f.insertarEn(a,1,'Eva',8),undefined);comprobar('Insertar sin borrar',nombres(a),['Ana','Eva','Luis']);
  a=[];f.insertarEn(a,0,'Eva',8);comprobar('Insertar en vacía',a,[{nombre:'Eva',nota:8}]);
  a=lista();comprobar('Borrar existente',f.borrarPorNombre(a,'Luis'),true);comprobar('Borrar modifica lista',nombres(a),['Ana']);comprobar('Borrar inexistente',f.borrarPorNombre(a,'Pepe'),false);comprobar('Borrar inexistente conserva lista',nombres(a),['Ana']);comprobar('Borrar en vacía',f.borrarPorNombre([],'Ana'),false);
  a=[{nombre:'Luis',nota:4},{nombre:'Ana',nota:7.5},{nombre:'Lucía',nota:10}];
  comprobar('Orden por nota',nombres(f.ordenarPorNota(a)),['Lucía','Ana','Luis']);comprobar('Orden por nombre español',nombres(f.ordenarPorNombre(a)),['Ana','Lucía','Luis']);comprobar('Ordenar no modifica origen',nombres(a),['Luis','Ana','Lucía']);
  comprobar('Orden nota devuelve copia',f.ordenarPorNota(a)!==a,true);comprobar('Orden nombre devuelve copia',f.ordenarPorNombre(a)!==a,true);
  comprobar('Orden numérico 10, 9, 1',f.ordenarPorNota([{nota:1},{nota:10},{nota:9}]).map(a=>a.nota),[10,9,1]);
  comprobar('Ranking inicial corrige errata',nombres(f.ranking(f.ALUMNOS_INICIALES,3)),['Lucía','Marta','Hugo']);
  a=[...lista(),{nombre:'Marta',nota:9.25},{nombre:'Pablo',nota:5}];
  comprobar('Media ejemplo',f.notaMedia(a),6.4375);comprobar('Media vacía',f.notaMedia([]),0);comprobar('Máxima ejemplo',f.notaMaxima(a),9.25);comprobar('Máxima vacía',f.notaMaxima([]),null);
  comprobar('Aprobados incluye el cinco',nombres(f.aprobados(a)),['Ana','Marta','Pablo']);comprobar('Aprobados vacía',f.aprobados([]),[]);comprobar('Nombres de aprobados',f.nombresAprobados(a),['Ana','Marta','Pablo']);comprobar('Nombres vacía',f.nombresAprobados([]),[]);
  comprobar('No hay diez en ejemplo',f.hayAlgunDiez(a),false);comprobar('Hay diez en iniciales',f.hayAlgunDiez(f.ALUMNOS_INICIALES),true);comprobar('Hay diez en vacía',f.hayAlgunDiez([]),false);
  comprobar('No todos aprobados',f.todosAprobados(a),false);comprobar('Todos aprobados',f.todosAprobados([{nota:5},{nota:10}]),true);comprobar('Todos aprobados en vacía',f.todosAprobados([]),true);
  comprobar('Ranking de dos',nombres(f.ranking(a,2)),['Marta','Ana']);comprobar('Ranking de cero',f.ranking(a,0),[]);comprobar('Ranking vacía',f.ranking([],2),[]);comprobar('Ranking mayor que lista',f.ranking(a,20).length,4);comprobar('Ranking negativo',f.ranking(a,-1),[]);
  comprobar('Filtro aprobados',nombres(f.filtrarAlumnos(a,'aprobados')),['Ana','Marta','Pablo']);comprobar('Filtro suspensos',nombres(f.filtrarAlumnos(a,'suspensos')),['Luis']);comprobar('Filtro todos conserva datos',f.filtrarAlumnos(a,'todos'),a);comprobar('Filtro todos devuelve copia',f.filtrarAlumnos(a,'todos')!==a,true);
  comprobar('Orden descendente',f.ordenarAlumnos(a,'nota-desc').map(x=>x.nota),[9.25,7.5,5,4]);comprobar('Orden ascendente',f.ordenarAlumnos(a,'nota-asc').map(x=>x.nota),[4,5,7.5,9.25]);comprobar('Orden nombre',nombres(f.ordenarAlumnos(a,'nombre')),['Ana','Luis','Marta','Pablo']);
  for(const [valor,esperado] of [['7.5',true],['0',true],['10',true],['',false],['   ',false],['11',false],['-1',false],['abc',false],['7px',false],['Infinity',false],['NaN',false]]) comprobar(`Validar nota ${JSON.stringify(valor)}`,f.esNotaValida(valor),esperado);
  const protegido=Object.freeze(f.ALUMNOS_INICIALES.map(a=>Object.freeze({...a})));
  for(const nombre of ['ordenarPorNota','ordenarPorNombre','notaMedia','notaMaxima','aprobados','nombresAprobados','hayAlgunDiez','todosAprobados']) {
    try { f[nombre](protegido);comprobar(`${nombre} acepta lista congelada`,true,true); } catch { comprobar(`${nombre} acepta lista congelada`,false,true); }
  }
  comprobar('Media de la clase',f.notaMedia(f.ALUMNOS_INICIALES),6.15);comprobar('Aprobados de la clase',f.aprobados(f.ALUMNOS_INICIALES).length,7);
  return resultados;
}
if (typeof module !== 'undefined' && module.exports) module.exports={ejecutarPruebas};
if (typeof require !== 'undefined' && require.main===module) {
  const r=ejecutarPruebas();console.table(r);console.log(`${r.filter(x=>x.correcta).length}/${r.length} pruebas superadas`);
  if(r.some(x=>!x.correcta))process.exitCode=1;
}
