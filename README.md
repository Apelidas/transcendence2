# transcendence2

To add another component to the html use:\
`<!--#include file="pathTo.html" -->`\
in the index.html

to signup a new user during development use:\
`
curl -X POST http://localhost:8000/signup/ \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "a_pasword"}'
`

if you encounter problems with the database, make sure you migrated all changes.
Make sure your containers are running and then run:

`docker-compose exec backend python manage.py makemigrations` 

`docker-compose exec backend python manage.py migrate` 


For the env to test:
`
export DB_NAME = mydatabase
export DB_USER = myuser
export DB_USER_PASSWORD = mypassword
export DB_HOST = postgres
export DB_DB_PORT = 5432
export POSTGRES_DB = mydatabase
export POSTGRES_USER = myuser
export POSTGRES_PASSWORD = mypassword
`