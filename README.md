# 🐦 biceBirds

Aplicación mobile desarrollada en **React Native** para visualizar información sobre aves de Chile.  

## ✨ Features
- Listado de especies con imágenes.
- Detalle de cada ave con información obtenida desde APIs externas.
- Manejo de casos sin información (fallback “No disponible”).
- Testeada en dispositivo físico iOS.

---

## 🛠️ Tech Stack
- **React Native** (Expo/CLI)
- **Cocoapods** (iOS dependencies)
- **Android Studio** (Android build)
- **Jest** para pruebas unitarias
- **APIs externas** (ej: IUCN Red List)

---

## 📸 Screenshots
*(Agrega capturas reales del simulador o fotos del dispositivo)*  

👉 Guarda tus imágenes en `/docs/screenshots/` dentro del repo para mantenerlo ordenado.

---

## 🚀 Instalación y ejecución
### 1. Clonar repo e instalar dependencias
bash:
- git clone https://github.com/malagosr/biceBirds.git
- cd biceBirds
- npm install
### 2. iOS
bash:
- cd ios
- pod install
- cd ..
- npx react-native run-ios
### 3. Android
bash:
- npx react-native run-android

---

## 🧪 Testing
bash:
- npm test

Se probaron las llamadas a APIs para asegurar resolución de promesas.
Actualmente probado en dispositivo físico iOS (pendiente test Android).

---

## 🔗 Demo con Expo
Expo Go link

---

## 📌 Notas

Algunas aves no poseen información en IUCN → se muestra como No disponible.
La app puede tardar algunos segundos en obtener los datos de cada llamada.

---

## 📄 Licencia

