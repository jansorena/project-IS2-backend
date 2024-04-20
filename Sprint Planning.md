# Sprint 1: Configuración y funcionalidad básica de la plataforma

El sprint 1 esta orientado a la configuración del proyecto, del entorno de desarrollo y funcionalidades básicas para el software. Se enfocara principalmente en el desarrollo de los sistemas de autenticación y roles (administrador, entrenador, cliente) y la creación de la interfaz básica para el manejo de los clientes.
## Historias de usuario y tareas asociadas
### US1
Como administrador quiero entrar a la plataforma mediante un login para poder gestionar usuarios, sesiones de entrenamiento y datos de las máquinas.
#### Criterio de aceptación
Administrador ingresa mediante un login con sus credenciales. Tras la verificación, el administrador es redirigido a la página principal del panel de administración.
#### Tareas
- [ ] Implementación del sistema de autenticación y manejo de sesiones.
- [ ] Diseño e implementación de las interfaces de usuario para el administrador.
### US2
Como administrador quiero poder registrar a los nuevos clientes (nombre, sexo, edad, diagnosticos, etc), para que los entrenadores puedan acceder a esta información y personalizar los entrenamientos.
#### Criterio de aceptación
Cuando el administrador esté logueado, al ingresar un nuevo cliente podré especificar sus datos: rut, nombre, sexo, historial médico, fecha nacimiento, los cuales son almacenados en la plataforma y serán visibles por administradores y entrenadores
#### Tareas
- [ ] Configuración inicial del servidor y modelamiento de la base de datos.
- [ ] Desarrollo de funcionalidades para añadir y gestionar clientes.
### US3
Como administrador quiero actualizar o registrar una membresía posterior al pago de esta para gestionar suscripciones.
#### Criterio de aceptación:
El administrador accede a un formulario donde pueda ingresar o actualizar los detalles de la membresía, incluyendo: Fecha de inicio y fecha de vencimiento de la membresía. Estos datos son almacenados en la plataforma.
#### Tareas
- [ ] Crear formulario para registrar membresías y fechas de inicio y vencimiento.
- [ ] Implementar la funcionalidad para ingresar y actualizar detalles de membresías.
### US4
Como administrador quiero manejar datos del Entrenador y sus horarios para poder agendar sesiones de entrenamiento y evaluaciones.
(Como administrador quiero saber que cliente está a cargo de un determinado Entrenador (máximo 4 por Entrenador)).
#### Criterio de aceptación
El administrador puede acceder al horario específico de un entrenador y agendar o borrar una sesión de entrenamiento o evaluación. La plataforma registra y guarda las modificaciones al horario del entrenador. 
#### Tareas
- [ ] Diseñar la interfaz para manejar datos de entrenadores y sus horarios.
- [ ] Implementar la funcionalidad para agendar sesiones de entrenamiento y evaluaciones.
## Tecnologias
Backend: 
Frontend: 
Autenticación: 
## Demo
- Demostración de inicio de sesión para diferentes roles.
- Función de añadir un nuevo cliente y gestionar sus membresías.
- Función de manejar datos del Entrenador, incluyendo los horarios.
