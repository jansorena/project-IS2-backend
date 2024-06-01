INSERT INTO cliente (rut, nombre, apellido, email, password, fecha_nacimiento, telefono) VALUES
('12345678-9', 'Juan', 'Perez', 'juan.perez@example.com', 'hashed_password', '1980-05-15', '123456789'),
('23456789-0', 'María', 'Gonzalez', 'maria.gonzalez@example.com', 'hashed_password', '1992-08-23', '987654321'),
('34567890-1', 'Carlos', 'Lopez', 'carlos.lopez@example.com', 'hashed_password', '1985-12-30', '192837465'),
('45678901-2', 'Ana', 'Martinez', 'ana.martinez@example.com', 'hashed_password', '1975-03-22', '5647382910'),
('56789012-3', 'Luis', 'Hernandez', 'luis.hernandez@example.com', 'hashed_password', '1990-07-14', '6789012345'),
('67890123-4', 'Lucía', 'Jimenez', 'lucia.jimenez@example.com', 'hashed_password', '1988-06-09', '2345678901'),
('78901234-5', 'Marco', 'Ruiz', 'marco.ruiz@example.com', 'hashed_password', '1973-01-17', '3456789012'),
('89012345-6', 'Carmen', 'Morales', 'carmen.morales@example.com', 'hashed_password', '1995-11-25', '4567890123'),
('90123456-7', 'Jose', 'Navarro', 'jose.navarro@example.com', 'hashed_password', '1983-04-12', '5678901234'),
('01234567-8', 'Sofía', 'Díaz', 'sofia.diaz@example.com', 'hashed_password', '1997-02-07', '6789012345');


INSERT INTO entrenador (rut, nombre, apellido, email, password, fecha_nacimiento, telefono, especialidad) VALUES
('98765432-1', 'David', 'Fernandez', 'david.fernandez@example.com', 'hashed_password', '1982-09-15', '912345678', 'Fitness'),
('87654321-2', 'Marta', 'Alvarez', 'marta.alvarez@example.com', 'hashed_password', '1990-03-18', '823456789', 'Cardio'),
('76543210-3', 'Pedro', 'Garcia', 'pedro.garcia@example.com', 'hashed_password', '1984-12-22', '734567890', 'Peso');


INSERT INTO ejercicio (nombre, descripcion, clasificacion) VALUES
('Press de banca', 'Ejercicio para pecho', 'Fuerza'),
('Sentadilla', 'Ejercicio completo para piernas', 'Fuerza'),
('Peso muerto', 'Ejercicio de fuerza de agarre', 'Potencia'),
('Curl de bíceps', 'Ejercicio para bíceps', 'Hipertrofia'),
('Tríceps en polea', 'Ejercicio para tríceps', 'Hipertrofia'),
('Jalón al pecho', 'Ejercicio para espalda', 'Fuerza'),
('Plancha', 'Ejercicio de core para estabilización', 'Core'),
('Zancadas', 'Ejercicio para piernas y glúteos', 'Fuerza'),
('Press militar', 'Ejercicio para hombros', 'Potencia'),
('Pull-up', 'Ejercicio para espalda y bíceps', 'Fuerza');


-- Crear rutinas
INSERT INTO rutina (clasificacion) VALUES
('Rutina de Fuerza'),
('Rutina de Hipertrofia'),
('Rutina de Cardio'),
('Rutina de Flexibilidad'),
('Rutina de Potencia');


-- Asociar clientes con rutinas
INSERT INTO tiene (id_rutina, id_cliente) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Asociar circuitos con rutinas
INSERT INTO contiene (id_rutina, id_circuito, descanso) VALUES
(20, 7, '1 minuto'),
(20, 10, '2 minutos'),
(21, 9, '3 minutos'),
(21, 8, '4 minutos'),
(22, 6, '5 minutos');

-- Asociar ejercicios con circuitos
INSERT INTO compone (id_ejercicio, id_circuito, series, frecuencia, orden, descanso) VALUES
(41, 6, 3, '3 min', 1, '1 minuto'),
(42, 6, 4, '3 min', 2, '1 minuto'),
(43, 6, 3, '3 min', 3, '1 minuto'),
(44, 7, 3, '45 seg', 1, '1 minuto'),
(45, 7, 4, '45 seg', 2, '1 minuto'),
(46, 7, 3, '2 min', 3, '1 minuto'),
(47, 8, 3, '2 min', 1, '1 minuto'),
(48, 8, 4, '2 min', 2, '1 minuto'),
(49, 9, 3, '1 min', 3, '1 minuto'),
(50, 10, 3, '1 min', 1, '1 minuto');


-- Crear evaluaciones (simplificado)
INSERT INTO evaluacion (peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experiencia) VALUES
(80, 1.75, 15, 50, 55, 10, 25, 'intermedio'),
(65, 1.60, 20, 30, 50, 9, 30, 'principiante');

-- Asociar evaluaciones con clientes
INSERT INTO posee (id_evaluacion, id_cliente) VALUES
(1, 1),
(2, 2);

-- Entrenadores realizan evaluaciones
INSERT INTO realiza (id_entrenador, id_cliente, id_evaluacion, fecha_evaluacion) VALUES
(1, 1, 1, '2024-05-01'),
(2, 2, 2, '2024-05-02');

-- Entrenadores crean rutinas
INSERT INTO crea (id_entrenador, id_rutina, fecha_rutina) VALUES
(1, 1, '2024-05-10'),
(1, 2, '2024-05-10'),
(2, 3, '2024-05-11'),
(3, 4, '2024-05-12'),
(3, 5, '2024-05-12');


-- Asumiendo que las máquinas ya están creadas y sus IDs son conocidos.
INSERT INTO maquina (nombre, estado) VALUES
('Cinta de correr', 'disponible'),
('Bicicleta estática', 'disponible'),
('Máquina de remo', 'mantencion'),
('Prensa de piernas', 'disponible');

-- Asociando ejercicios con máquinas
INSERT INTO utiliza (id_ejercicio, id_maquina) VALUES
(1, 4),  -- Press de banca usa la Prensa de piernas (hipotético)
(2, 4),  -- Sentadilla usa la Prensa de piernas
(3, 3),  -- Peso muerto usa la Máquina de remo (hipotético)
(10, 1); -- Pull-up usa la Cinta de correr (hipotético)


