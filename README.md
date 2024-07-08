  <h1 align="center"> Prueba tecnica para Apuesta Total </h1>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

</p>

## Descripcion

Prueba tecnica para Apuesta total, realizada con NestJs con un proceso de compra de boletos de avion

a. Proyecto desarrollador bajo arquitectura DDD con Microservicios, para mejorar la flexibilidad, adaptabilidad y mantenibilidad de todo el proyecto. Asi mismo, Un mejor entendimiento del dominio y una comunicación clara pueden ayudar a identificar y mitigar riesgos potenciales más temprano en el proceso de desarrollo.

## Buenas practicas aplicadas

b. Las buenas practicas que se pueden encontrar es la creacion de interfaces y entidades para facilitar la comprension y el mantenimiento de codigo

c. La inyeccion de dependencias facilita la prueba y el mantenimiento del código al desacoplar las dependencias de la clase.

d. La utilizacion de set lo cual proporciona una manera eficiente de manejar estados temporales y verificar la existencia de elementos.

e. Entre otros

## Principios SOLID aplicados

1. Responsabilidad Unica : Facilita la comprensión, mantenimiento y prueba del código al asegurarse de que cada clase/método haga solo una cosa.

2. Sustitucion de Liskov : Permite que las clases derivadas o tipos concretos se puedan usar de manera intercambiable sin alterar el comportamiento esperado.

3. Principio de Inversion de Dependencia : Por ejemplo en el uso de inyecion de dependencia FLightService se asegura que las clases dependen de abstracciones (interfaces) en lugar de implementaciones concretas, facilitando el desacoplamiento y la prueba del código.

4. Entre otros.

## Instalacion

1. Instalacion de plugins completos del proyecto

```bash
$ npm install
```

2. Es necesario instalar [REDIS](https://redis.io/downloads/) para correr las colas de Bull para ejecutar SAGA services

```bash
-- Instalacion para MacOs
$ brew install redis
```

## Running the app

1. Se necesita levantar redis de manera manual en algunos de los casos

```bash
$ redis-server
```

2. Levantar el proyecto

```bash
# development
$ npm run start
```

## Pruebas Individuales con Swagger

Se puede probar los endpoints con el link http://localhost:3000/swagger#/ una vez iniciado proyecto,
