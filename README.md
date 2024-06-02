# Proyecto_IS2 Backend

## Tecnologías utilizadas
- Node.js
- Express
- Turso

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/jansorena/project-IS2-backend.git
```
2. Instalar las dependencias
```bash
npm install
```
3. Modifier el archivo `.env` con las variables de entorno necesarias
4. Correr el servidor en modo desarrollo
```bash 
npm run dev
```

## Estructura de directorios
```
src
├── config
│   ├── db.js
│   ├── passport.config.js
│   └── policies.js
├── controllers
│   ├── authController.js
│   ├── clienteController.js
│   ├── evaluacionController.js
│   └── rutinaController.js
├── middlewares
│   └── handlePolicies.js
├── models
│   ├── clienteModel.js
│   ├── evaluacionModel.js
│   └── rutinaModel.js
├── routes
│   ├── authRoutes.js
│   ├── clienteRoutes.js
│   ├── CustomRouter.js
│   ├── evaluacionRoutes.js
│   └── rutinaRoutes.js
├── services
│   ├── clienteService.js
│   ├── evaluacionService.js
│   └── rutinaService.js
├── utils
│   ├── jwtUtils.js
│   └── passwordUtils.js
└── app.js
```