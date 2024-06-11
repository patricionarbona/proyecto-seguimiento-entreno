CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email CHAR(100) UNIQUE,
    password CHAR(100),
    nombre CHAR(100),
    admin TINYINT(1) CHECK (admin IN (0, 1))
);

CREATE TABLE ejercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ejercicio CHAR(100),
    equipamiento CHAR(100),
    descripcion TEXT,
    foto CHAR(100),
    musculos CHAR(100)
);

CREATE TABLE grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grupo CHAR(100),
    observaciones CHAR(255)
);

CREATE TABLE ejercicios_grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_ejercicio INT,
    fk_grupo INT,
    FOREIGN KEY (fk_ejercicio) REFERENCES ejercicios(id),
    FOREIGN KEY (fk_grupo) REFERENCES grupo(id)
);

CREATE TABLE entreno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT,
    nombre CHAR(100),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE entreno_ejercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_entreno INT,
    fk_ejercicio INT,
    observacion CHAR(255),
    FOREIGN KEY (fk_entreno) REFERENCES entreno(id),
    FOREIGN KEY (fk_ejercicio) REFERENCES ejercicios(id)
);

CREATE TABLE usuario_entreno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario INT,
    fk_entrenos INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_entrenos) REFERENCES entreno(id)
);

CREATE TABLE entreno_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_entreno INT,
    fk_ejercicio INT,
    peso DECIMAL(10,2),
    series INT,
    repeticiones INT,
    observacion VARCHAR(255),
    fecha DATE,
    FOREIGN KEY (fk_entreno) REFERENCES entreno(id),
    FOREIGN KEY (fk_ejercicio) REFERENCES ejercicios(id)
);
