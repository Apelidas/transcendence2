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
