// Comprueba flujos de app.js con un DOM mínimo; no sustituye las capturas de navegador.
const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');const assert=require('node:assert/strict');
class Elemento {
  constructor(tag='div'){this.tagName=tag;this.children=[];this.value='';this.textContent='';this.listeners={};this.attributes={};this.className='';this.classList={toggle:(nombre,valor)=>{this.attributes[nombre]=valor;}};}
  append(...hijos){this.children.push(...hijos);}
  replaceChildren(...hijos){this.children=[...hijos];}
  setAttribute(nombre,valor){this.attributes[nombre]=valor;}
  addEventListener(tipo,fn){this.listeners[tipo]=fn;}
  focus(){}
  reset(){elementos.nombre.value='';elementos.nota.value='';}
}
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const elementos=Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Elemento()]));
elementos.filtro.value='todos';elementos.orden.value='nombre';
const contexto={document:{getElementById:id=>{assert.ok(elementos[id],`Existe #${id}`);return elementos[id];},createElement:tag=>new Elemento(tag)},console};
vm.createContext(contexto);
vm.runInContext(fs.readFileSync(path.join(__dirname,'notas.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8'),contexto);
const casos=[];
function prueba(nombre,fn){fn();casos.push(nombre);}
const leer=exp=>vm.runInContext(exp,contexto);
const cambiar=(id,valor)=>{elementos[id].value=valor;elementos[id].listeners.change();};
const alta=(nombre,nota)=>{elementos.nombre.value=nombre;elementos.nota.value=nota;elementos['formulario-alumno'].listeners.submit({preventDefault(){}});};
const filas=()=>elementos['filas-alumnos'].children;
prueba('Inicio con diez alumnos y resumen correcto',()=>{assert.equal(filas().length,10);assert.equal(elementos.resumen.children[1].children[1].textContent,'6,15');assert.equal(elementos.resumen.children[3].children[1].textContent,'7');});
prueba('Orden descendente y errata del enunciado',()=>{cambiar('orden','nota-desc');assert.equal(filas()[0].children[0].textContent,'Lucía');assert.equal(filas()[1].children[0].textContent,'Marta');});
prueba('Filtro de suspensos no altera lista',()=>{const antes=leer('JSON.stringify(alumnos)');cambiar('filtro','suspensos');assert.equal(filas().length,3);assert.equal(leer('JSON.stringify(alumnos)'),antes);});
prueba('Resumen sigue usando toda la clase',()=>assert.equal(elementos.resumen.children[0].children[1].textContent,'10'));
prueba('Nombre vacío rechazado',()=>{alta('  ','8');assert.equal(leer('alumnos.length'),10);assert.equal(elementos.mensaje.attributes.error,true);});
prueba('Duplicado ignorando mayúsculas rechazado',()=>{alta(' ANA ','8');assert.equal(leer('alumnos.length'),10);assert.match(elementos.mensaje.textContent,/Ya existe/);});
prueba('Nota vacía rechazada',()=>{alta('Eva','');assert.equal(leer('alumnos.length'),10);});
prueba('Nota fuera de rango rechazada',()=>{alta('Eva','11');assert.equal(leer('alumnos.length'),10);});
prueba('Nota no numérica rechazada',()=>{alta('Eva','abc');assert.equal(leer('alumnos.length'),10);});
prueba('Alta válida mantiene filtro e informa',()=>{alta('Eva','8');assert.equal(leer('alumnos.length'),11);assert.equal(filas().length,3);assert.match(elementos.mensaje.textContent,/no cumple el filtro/);assert.equal(elementos.resumen.children[3].children[1].textContent,'8');});
prueba('Borrar desde vista filtrada elimina alumno correcto',()=>{const nombre=filas()[0].children[0].textContent;filas()[0].children[2].children[0].listeners.click();assert.equal(leer(`buscarPorNombre(alumnos,${JSON.stringify(nombre)})`),undefined);assert.equal(leer('alumnos.length'),10);});
prueba('Nota cero admitida',()=>{alta('Cero','0');assert.equal(leer('buscarPorNombre(alumnos,"Cero").nota'),0);});
prueba('Nota diez admitida',()=>{alta('Diez','10');assert.equal(leer('buscarPorNombre(alumnos,"Diez").nota'),10);});
prueba('Nombre con HTML permanece texto',()=>{cambiar('filtro','todos');alta('<b>Nombre</b>','5');assert.ok(filas().some(f=>f.children[0].textContent==='<b>Nombre</b>'));});
prueba('Vista vacía tras borrar todos',()=>{while(leer('alumnos.length'))filas()[0].children[2].children[0].listeners.click();assert.equal(filas().length,1);assert.equal(filas()[0].children[0].colSpan,3);assert.match(filas()[0].children[0].textContent,/Todavía no hay/);assert.equal(elementos.resumen.children[2].children[1].textContent,'—');});
prueba('Filtro sin coincidencias muestra mensaje',()=>{cambiar('filtro','suspensos');alta('Único','10');assert.match(filas()[0].children[0].textContent,/No hay alumnos que cumplan/);});
prueba('Datos iniciales permanecen intactos',()=>{assert.equal(leer('ALUMNOS_INICIALES.length'),10);assert.equal(leer('ALUMNOS_INICIALES[0].nombre'),'Ana');});
console.log(casos.map((n,i)=>`${i+1}. OK · ${n}`).join('\n'));
console.log(`${casos.length}/${casos.length} comprobaciones de interfaz correctas con DOM simulado.`);
