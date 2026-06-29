## Day 6 - Tasks CRUD API

Today I built all 5 REST API endpoints for tasks: 
GET all, GET one, POST, PUT, and DELETE.

I learned how COALESCE works in PostgreSQL to only 
update fields that are provided in the request.

The most important thing I learned is how middleware 
works in Express — the protect middleware runs before 
every task endpoint to verify the JWT token.