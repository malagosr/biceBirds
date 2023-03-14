# biceBirds

Para correr la app:
- Desde la terminal para levantar en simulador y dispositivo fisico iOS:

$ npx react-native run-ios

- Desde la terminal para levantar en emulador de Android

$ npx react-native run-android

Supuestos:

- La aplicación puede tomar unnos segundos en obtener la data de cada llamada.
- Se hizo tests de las llamadas a las apis para ver que la promesa se resolviera correctamente.
- Solo se probó en dispositivo físico iOS. No se probó en dispositivo Android.
- Para el caso de las aves que no tienen información proveniente de IUCN, se deja como No disponible.