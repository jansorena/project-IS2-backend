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
```plaintext
src
├── config                   
│   ├── db.js                # Configuración de la base de datos
│   ├── passport.config.js   # Configuración de Passport para la autenticación
│   └── policies.js          # Definición de políticas de acceso
├── controllers              # Controladores que manejan las solicitudes HTTP
│   ├── authController.js    
│   ├── clienteController.js 
│   ├── evaluacionController.js 
│   └── rutinaController.js  
├── middlewares             
│   └── handlePolicies.js    # Middleware para manejar políticas de acceso
├── models                   # Modelos de datos (interacción con la base de datos)
│   ├── clienteModel.js      
│   ├── evaluacionModel.js   
│   ├── rutinaModel.js       
│   └── usuarioModel.js      
├── routes                   # Definición de las rutas de la API
│   ├── authRoutes.js        
│   ├── clienteRoutes.js     
│   ├── CustomRouter.js      # Clase base para la definición de rutas personalizadas
│   ├── evaluacionRoutes.js  
│   └── rutinaRoutes.js      
├── services                 # Lógica de negocio y servicios
│   ├── clienteService.js    
│   ├── evaluacionService.js 
│   ├── rutinaService.js     
│   └── userService.js       
├── utils                    # Utilidades y funciones auxiliares
│   ├── jwtUtils.js          
│   └── passwordUtils.js     
└── app.js                   # Punto de entrada principal de la aplicación
```

# API Documentation

## Authentication Endpoints

| HTTP Method | Endpoint         | Description                   | Policies        |
| ----------- | ---------------- | ----------------------------- | --------------- |
| POST        | `/auth/login`    | Login a user                  | `PUBLIC`        |
| POST        | `/auth/register` | Register a new user           | `PUBLIC`        |
| GET         | `/auth/profile`  | Get profile of logged-in user | `AUTHENTICATED` |
| GET         | `/auth/logout`   | Logout the current user       | `AUTHENTICATED` |

## Cliente Endpoints

| HTTP Method | Endpoint                           | Description                       | Policies |
| ----------- | ---------------------------------- | --------------------------------- | -------- |
| GET         | `/api/clientes`                    | Get all clients                   | `PUBLIC` |
| GET         | `/api/clientes/:clienteId`         | Get details of a specific client  | `PUBLIC` |
| GET         | `/api/clientes/:clienteId/rutinas` | Get routines of a specific client | `PUBLIC` |
| POST        | `/api/clientes`                    | Create a new client               | `PUBLIC` |

## Rutina Endpoints

| HTTP Method | Endpoint  | Description          | Policies |
| ----------- | --------- | -------------------- | -------- |
| POST        | `/rutina` | Create a new routine | `PUBLIC` |

## Evaluacion Endpoints

| HTTP Method | Endpoint      | Description             | Policies |
| ----------- | ------------- | ----------------------- | -------- |
| POST        | `/evaluacion` | Create a new evaluation | `PUBLIC` |

## Custom Router

| HTTP Method | Endpoint | Description   | Policies |
| ----------- | -------- | ------------- | -------- |
| GET         | `/`      | Home endpoint | `PUBLIC` |
