# transcendence2

To add another component to the html use:\
`<!--#include file="pathTo.html" -->`\
in the index.html

to signup a new user during development use:\
`curl -X POST http://localhost:8000/signup/ \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "a_pasword"}'
`