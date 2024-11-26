#!/bin/sh

python manage.py migrate

python manage.py runserver_plus 0.0.0.0:8000 --cert-file cert.pem --key-file key.pem
