FROM postgres:16.1

ENV POSTGRES_DB=$DB_NAME
ENV POSTGRES_USER=$DB_USER
ENV POSTGRES_PASSWORD=$DB_USER_PASSWORD

COPY init.sql /docker-entrypoint-initdb.d/
RUN chmod 777 /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432

CMD ["postgres"]