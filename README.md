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

curl -X GET http://127.0.0.1:8000/mfa_data/ \
-H "Content-Type: application/json"
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

to delete postgress Database content:

`
docker exec -it my_postgres_container psql -U myuser -c "SELECT 'DROP DATABASE ' || datname || ';' FROM pg_database WHERE datistemplate = false;" | grep 'DROP DATABASE' | docker exec -i my_postgres_container psql -U postgres
`

to access the database:
`
docker exec -it my_postgres_container
 psql -U myuser -d mydatabase
`