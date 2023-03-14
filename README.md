# biceBirds
Para levantar la app:
- Es necesario hacer un npm install para instalar las dependencias.
- Es necesario tener instalado cocoapods para levantar el proyecto en iOS.
- Hay que hacer un pod install para instalar las dependencias de iOS.
- Es necesario tener instalado Android Studio para levantar el proyecto en Android.

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