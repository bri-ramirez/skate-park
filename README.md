# SkatePark

## DEV

1. acceder a la carpeta backend `cd backend`
2. crear archivo `.env` a partir del archivo `.env.template` y luego y reemplazar los datos correspondientes
```
cp .env.template .env
```

3. crear una base de datos llamada `skatepark`
```
CREATE TABLE skatepark;
```
4. crear una tabla
```
CREATE TABLE users (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL,
	name VARCHAR(25) NOT NULL, 
	password VARCHAR(100) NOT NULL,
	expertise INT NOT NULL, 
	specialty VARCHAR(50) NOT NULL, 
	role VARCHAR(50) NOT NULL,
	photo VARCHAR(255) NULL, 
	status BOOLEAN NOT NULL
);
```
5. levantar servidor backend
```
cd backend/
npm run start
```
6. para levantar el front podemos hacer uso del plugin `Live Server`