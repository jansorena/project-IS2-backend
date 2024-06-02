-- Poblar tabla usuario
INSERT INTO usuario (rut, nombre, apellido, email, password, fecha_nacimiento, telefono, especialidad, role, foto) VALUES
('12345678-9', 'Juan', 'Pérez', 'juan.perez@example.com', 'admin', '1980-05-15', '123456789', NULL, 'administrador', NULL),
('98765432-1', 'Ana', 'Gómez', 'ana.gomez@example.com', '$2b$10$examplehash2', '1985-08-25', '987654321', 'Cardio', 'entrenador', NULL),
('11223344-5', 'Carlos', 'Lopez', 'carlos.lopez@example.com', '$2b$10$examplehash3', '1975-12-20', '112233445', 'Fuerza', 'entrenador', NULL),
('22334455-6', 'María', 'Fernández', 'maria.fernandez@example.com', '$2b$10$examplehash4', '1990-07-10', '223344556', 'Cardio', 'entrenador', NULL);

-- Poblar tabla cliente
INSERT INTO cliente (rut, nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, foto) VALUES
('33445566-7', 'Luis', 'Martínez', 'luis.martinez@example.com', '1992-03-15', 'mes', '334455667', NULL),
('44556677-8', 'Elena', 'Rodríguez', 'elena.rodriguez@example.com', '1995-11-30', 'trimestre', '445566778', NULL),
('55667788-9', 'Pedro', 'García', 'pedro.garcia@example.com', '1988-01-25', 'semestre', '556677889', NULL),
('66778899-0', 'Laura', 'Jiménez', 'laura.jimenez@example.com', '1993-09-10', 'anual', '667788990', NULL),
('12345678-9', 'Juan', 'Perez', 'juan.perez@example.com', '1980-05-15', NULL, '123456789', NULL),
('23456789-0', 'María', 'Gonzalez', 'maria.gonzalez@example.com', '1992-08-23', NULL, '987654321', NULL),
('34567890-1', 'Carlos', 'Lopez', 'carlos.lopez@example.com', '1985-12-30', NULL, '192837465', NULL),
('45678901-2', 'Ana', 'Martinez', 'ana.martinez@example.com', '1975-03-22', NULL, '5647382910', NULL),
('56789012-3', 'Luis', 'Hernandez', 'luis.hernandez@example.com', '1990-07-14', NULL, '6789012345', NULL),
('67890123-4', 'Lucía', 'Jimenez', 'lucia.jimenez@example.com', '1988-06-09', NULL, '2345678901', NULL),
('78901234-5', 'Marco', 'Ruiz', 'marco.ruiz@example.com', '1973-01-17', NULL, '3456789012', NULL),
('89012345-6', 'Carmen', 'Morales', 'carmen.morales@example.com', '1995-11-25', NULL, '4567890123', NULL),
('90123456-7', 'Jose', 'Navarro', 'jose.navarro@example.com', '1983-04-12', NULL, '5678901234', NULL),
('01234567-8', 'Sofía', 'Díaz', 'sofia.diaz@example.com', '1997-02-07', NULL, '6789012345', NULL);


-- Poblar tabla ejercicio
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

-- Crear circuitos (simplificado para el ejemplo)
INSERT INTO circuito (puntuacion, repeticiones, observaciones) VALUES
('Buena', 10, 'Ejercicio básico'),
('Excelente', 12, 'Ejercicio avanzado');

-- Asociar circuitos con rutinas
INSERT INTO contiene (id_rutina, id_circuito, descanso) VALUES
(1, 1, '1 minuto'),
(2, 2, '2 minutos');

-- Asociar clientes con rutinas
INSERT INTO tiene (id_rutina, id_cliente) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Asociar ejercicios con circuitos
INSERT INTO compone (id_ejercicio, id_circuito, series, frecuencia, orden, descanso) VALUES
(1, 1, 3, '3 min', 1, '1 minuto'),
(2, 1, 4, '3 min', 2, '1 minuto'),
(3, 1, 3, '3 min', 3, '1 minuto'),
(4, 2, 3, '45 seg', 1, '1 minuto'),
(5, 2, 4, '45 seg', 2, '1 minuto'),
(6, 2, 3, '2 min', 3, '1 minuto');

-- Crear evaluaciones
INSERT INTO evaluacion (peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experiencia) VALUES
(80, 1.75, 15, 50, 55, 10, 25, 'intermedio'),
(65, 1.60, 20, 30, 50, 9, 30, 'principiante');

-- Asociar evaluaciones con clientes
INSERT INTO realiza (id_entrenador, id_cliente, id_evaluacion, fecha_evaluacion) VALUES
(1, 1, 1, '2024-05-01'),
(2, 2, 2, '2024-05-02');

-- Entrenadores crean rutinas
INSERT INTO crea (id_entrenador, id_rutina, fecha_rutina) VALUES
(2, 1, '2024-05-10'),
(2, 2, '2024-05-10'),
(3, 3, '2024-05-11'),
(4, 4, '2024-05-12'),
(4, 5, '2024-05-12');

-- Crear máquinas
INSERT INTO maquina (nombre, estado) VALUES
('Cinta de correr', 'disponible'),
('Bicicleta estática', 'disponible'),
('Máquina de remo', 'mantencion'),
('Prensa de piernas', 'disponible');

-- Asociar ejercicios con máquinas
INSERT INTO utiliza (id_ejercicio, id_maquina) VALUES
(1, 4),  -- Press de banca usa la Prensa de piernas (hipotético)
(2, 4),  -- Sentadilla usa la Prensa de piernas
(3, 3),  -- Peso muerto usa la Máquina de remo (hipotético)
(10, 1); -- Pull-up usa la Cinta de correr (hipotético)
