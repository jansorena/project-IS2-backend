-- Creación de la tabla cliente
CREATE TABLE cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    rut VARCHAR(20) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    fecha_nacimiento DATE,
    suscripcion VARCHAR(50) DEFAULT 'mes' CHECK (suscripcion IN ('mes', 'trimestre', 'semestre', 'anual')),
    telefono VARCHAR(20)
);

-- Creación de la tabla entrenador
CREATE TABLE entrenador (
    id_entrenador INTEGER PRIMARY KEY AUTOINCREMENT,
    rut VARCHAR(20) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    fecha_nacimiento DATE,
    telefono VARCHAR(20),
    especialidad VARCHAR(100) NOT NULL
);

-- Creación de la tabla ejercicio
CREATE TABLE ejercicio (
    id_ejercicio INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    clasificacion VARCHAR(100) NOT NULL
);

-- Creación de la tabla rutina
CREATE TABLE rutina (
    id_rutina INTEGER PRIMARY KEY AUTOINCREMENT,
    clasificacion VARCHAR(100) NOT NULL
);

-- Creación de la tabla circuito
CREATE TABLE circuito (
    id_circuito INTEGER PRIMARY KEY AUTOINCREMENT,
    puntuacion VARCHAR(100),
    repeticiones INTEGER NOT NULL,
    observaciones VARCHAR(500)
);

-- Creación de la tabla contiene
CREATE TABLE contiene (
    id_rutina INTEGER,
    id_circuito INTEGER,
    descanso VARCHAR(100) DEFAULT 'N/A',
    PRIMARY KEY (id_rutina, id_circuito),
    FOREIGN KEY (id_rutina) REFERENCES rutina(id_rutina) ON DELETE CASCADE,
    FOREIGN KEY (id_circuito) REFERENCES circuito(id_circuito) ON DELETE CASCADE
);

-- Creacion de la tabla compone
CREATE TABLE compone (
    id_ejercicio INTEGER,
    id_circuito INTEGER,
    series INTEGER DEFAULT 1,
    frecuencia VARCHAR(100) NOT NULL,
    orden INTEGER NOT NULL,
    descanso VARCHAR(100) DEFAULT 'sin descanso',
    PRIMARY KEY (id_ejercicio, id_circuito),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id_ejercicio) ON DELETE CASCADE,
    FOREIGN KEY (id_circuito) REFERENCES circuito(id_circuito) ON DELETE CASCADE
);

-- Creación de la tabla evaluacion
CREATE TABLE evaluacion (
    id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
    peso FLOAT NOT NULL,
    estatura FLOAT NOT NULL,
    grasa FLOAT NOT NULL,
    masa_muscular FLOAT NOT NULL,
    agua FLOAT NOT NULL,
    masa_osea FLOAT NOT NULL,
    edad INTEGER NOT NULL,
    experiencia VARCHAR(15) DEFAULT 'principiante' CHECK (experiencia IN ('principiante', 'intermedio', 'avanzado'))
);

-- Creación de la tabla maquina
CREATE TABLE maquina (
    id_maquina INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'mantencion', 'reparacion'))
);

-- Creación de la tabla tiene
CREATE TABLE tiene (
    id_rutina INTEGER,
    id_cliente INTEGER,
    PRIMARY KEY (id_rutina, id_cliente),
    FOREIGN KEY (id_rutina) REFERENCES rutina(id_rutina) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

-- Creación de la tabla realiza
CREATE TABLE realiza (
    id_entrenador INTEGER,
    id_cliente INTEGER,
    id_evaluacion INTEGER,
    fecha_evaluacion DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id_entrenador, id_cliente, id_evaluacion),
    FOREIGN KEY (id_entrenador) REFERENCES entrenador(id_entrenador),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_evaluacion) REFERENCES evaluacion(id_evaluacion)
);

-- Creación de la tabla utiliza
CREATE TABLE utiliza (
    id_ejercicio INTEGER,
    id_maquina INTEGER,
    PRIMARY KEY (id_ejercicio, id_maquina),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id_ejercicio),
    FOREIGN KEY (id_maquina) REFERENCES maquina(id_maquina)
);

-- Creación de la tabla crea
CREATE TABLE crea (
    id_entrenador INTEGER,
    id_rutina INTEGER,
    fecha_rutina DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id_entrenador, id_rutina),
    FOREIGN KEY (id_entrenador) REFERENCES entrenador(id_entrenador),
    FOREIGN KEY (id_rutina) REFERENCES rutina(id_rutina)
);
