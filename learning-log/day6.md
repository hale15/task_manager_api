## Day 6 - Tasks CRUD API

Today I built all 5 REST API endpoints for tasks: 
GET all, GET one, POST, PUT, and DELETE.

I learned how COALESCE works in PostgreSQL to only 
update fields that are provided in the request.

The most important thing I learned is how middleware 
works in Express — the protect middleware runs before 
every task endpoint to verify the JWT token.
## Day 7 - Docker

Docker solves the "it works on my machine" problem by 
packaging the app and its environment together into a container.

A Dockerfile is a recipe that tells Docker how to build 
an image. An image is a blueprint. A container is a 
running instance of that image.

Docker Compose lets you run multiple containers together 
with one command — today I ran my Node.js API and 
PostgreSQL database together using docker-compose up.