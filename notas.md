# Práctica 2 · Registro de notas

## Fase 1 · Exploración de arrays

Predicciones orientativas para comparar con la ejecución. Los bloques se ejecutan en el orden indicado; en el bloque D se crea de nuevo n antes de cada operación.

| Línea | Predicción | Resultado observado |
|---|---|---|
| 1 · a[0] | "x" | "x" |
| 2 · a[3] | undefined | undefined |
| 3 · a.length | 3 | 3 |
| 4 · [1, "dos", true].length | 3 | 3 |
| 5 · const c = [1]; c.push(2); c | [1, 2] | push devuelve 2; c queda [1, 2] |
| 6 · q.push(4); mirar p | p también cambia | push devuelve 4; p queda [1, 2, 3, 4] |
| 7 · let r = [...p]; r.push(5); mirar p | p no cambia | r queda [1, 2, 3, 4, 5]; p sigue [1, 2, 3, 4] |
| 8 · [10, 9, 1].sort() | [1, 10, 9] | [1, 10, 9] |
| 9 · sort((x, y) => x - y) | [1, 9, 10] | [1, 9, 10] |
| 10 · n.push(4) | Devuelve longitud 4 y cambia n | 4; n = [3, 1, 2, 4] |
| 11 · n.pop() | Devuelve 2 y cambia n | 2; n = [3, 1] |
| 12 · n.slice(0, 2) | Copia [3, 1]; n no cambia | [3, 1]; n = [3, 1, 2] |
| 13 · n.map(x => x * 2) | Copia [6, 2, 4]; n no cambia | [6, 2, 4]; n = [3, 1, 2] |

1. a[3] devuelve undefined: tres elementos ocupan los índices 0, 1 y 2; el índice 3 no existe.
2. q = p copia la referencia, por lo que ambas variables apuntan al mismo array. [...p] crea otro array y añadir un elemento a r no cambia p. Es una copia superficial: si los elementos fueran objetos, seguirían siendo referencias a los mismos objetos.
3. sort sin comparador compara representaciones de texto; "10" va antes que "9". Para números se usa (x, y) => x - y.
4. push y pop modifican el original; slice y map devuelven arrays nuevos. const impide reasignar la variable, pero no impide cambiar el contenido del array.
