#!/bin/sh
while true; do
  echo "Trying to connect to ${DB_NAME} \n"
  pg_isready -U $DB_USER -h $DB_HOST -d $DB_NAME -p $DB_PORT

  if [ $? -eq 0 ]; then
    break;
  else
    sleep 10
  fi
done
python manage.py makemigrations
python manage.py migrate

python manage.py runserver 0.0.0.0:8000
