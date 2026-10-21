# Registro de notas · Práctica 2

Registro de una clase realizado con JavaScript y arrays. Permite añadir y borrar alumnos, filtrar aprobados o suspensos, ordenar por nombre o nota y consultar las estadísticas de toda la clase.

## Abrir en Visual Studio Code

1. Descomprime el archivo de entrega.
2. En Visual Studio Code selecciona Archivo → Abrir carpeta → registro-notas.
3. Abre index.html en tu navegador. No hace falta instalar paquetes ni usar un servidor.
4. Usa el enlace «Ver ejemplos y comprobaciones» para abrir evidencias.html.

Los archivos están conectados: index.html carga estilos.css, notas.js y app.js, en ese orden lógico. notas.js contiene los datos y las funciones; app.js se ocupa del DOM y los eventos. evidencias.html carga los mismos cálculos y los ejemplos de exploración, depuración y pruebas.

## Funciones que cambian la lista

- anadirAlumno: añade con push y devuelve la nueva longitud.
- quitarUltimo: elimina con pop y devuelve el alumno retirado.
- insertarEn: inserta con splice sin borrar y no devuelve un valor.
- borrarPorNombre: elimina la primera coincidencia con splice; devuelve true o false.

## Funciones que no cambian la lista

- buscarPorNombre: devuelve una coincidencia o undefined.
- ordenarPorNota y ordenarPorNombre: devuelven copias ordenadas.
- notaMedia y notaMaxima: devuelven un dato numérico; en vacío, 0 y null.
- aprobados y nombresAprobados: devuelven arrays nuevos.
- hayAlgunDiez y todosAprobados: devuelven booleanos.
- ranking: devuelve un nuevo array con los mejores alumnos.
- filtrarAlumnos y ordenarAlumnos: devuelven copias para la vista.
- esNotaValida: valida un texto, sin recibir ni modificar arrays.

Las copias de arrays son superficiales. Las funciones de consulta no modifican los objetos de los alumnos. La aplicación sí copia los objetos de ALUMNOS_INICIALES al crear su lista de trabajo.

## Reglas de uso

Los nombres se recortan y se comparan ignorando mayúsculas, pero respetando los acentos. Las notas son números de 0 a 10. Un campo vacío no equivale a cero. El resumen siempre se refiere a toda la clase, aunque la tabla esté filtrada. Los cambios se mantienen en memoria; al recargar se recuperan los diez alumnos iniciales. No se envían datos a ningún servidor.

## Ejecutar las comprobaciones

Abre una terminal en esta carpeta. Con Node.js instalado:

```sh
node pruebas.js
node verificar-interfaz.cjs
node exploracion.js
node depuracion.js
```

Resultados: 71/71 pruebas de funciones y 17/17 comprobaciones con DOM simulado. La depuración provoca y captura los cuatro errores del enunciado de forma intencionada. Las evidencias textuales están en evidencias/. La vista real en navegador y sus capturas quedan pendientes; los ensayos con DOM simulado no verifican el diseño visual.

## Historial de Git

La carpeta incluye .git con cinco commits, uno por fase. Desde su terminal:

```sh
git status
git log --oneline
```

En el ZIP se incluye también registro-notas.bundle, una copia transportable del historial. Si tu descompresor no conserva .git, puedes recuperar el proyecto completo desde la carpeta que contiene el bundle:

```sh
git clone registro-notas.bundle registro-notas-recuperado
```

No ejecutes git init de nuevo para sustituir el historial existente.

## Publicación en GitHub Pages

Pendiente: todavía no hay repositorio remoto ni enlace público verificado para esta práctica. No se ha modificado ningún repositorio ajeno. Cuando exista un repositorio propio y vacío de destino, se podrá enlazar este historial y publicar index.html desde la raíz de la rama main.

## Entrega y errata del enunciado

La memoria Practica2_Arrays_resuelta.pdf incluye respuestas y resultados de las cinco fases. La documentación no contiene capturas de navegador simuladas. El orden correcto de las mejores notas iniciales es Lucía (10), Marta (9,25), Hugo (9); Hugo no es segundo, pese a lo indicado en una comprobación del enunciado.
