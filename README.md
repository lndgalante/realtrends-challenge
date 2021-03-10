# RealTrends

## API

- [ ] Debe exponer un servidor de websocket al que se pueda subscribir.
- [ ] Debe emitir eventos cuando haya votos nuevos.

Se decidió utilizar [Room Service](https://www.roomservice.dev/) como servicio para manejar estado en tiempo real.
Los beneficios son que no tenemos el costo de mantener un backend, y una API fácil de usar con hooks.

## Cliente

- [x] Debe haber al menos dos productos sobre los cuales se pueda votar.
- [x] Se debe mostrar un indicador del porcentaje de votos de cada producto.
- [x] Se debe poder ver quienes fueron los votantes y sus respectivas valoraciónes.
- [x] Cada usuario puede votar una vez, si vota más de una, el voto se transfiere.

## Definiciones técnicas

- [x] El código de la aplicación debe estar subida a un repositorio de público acceso.

## Puntos Extra

- [ ] El usuario puede seleccionar los productos desde el cliente viendo un modal con productos de Mercado Libre.
- [ ] La votación se puede pausar, reanudar y reiniciar desde el cliente.
