FROM postgres:16.1

COPY init.sql /docker-entrypoint-initdb.d/
RUN chmod 777 /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432

CMD ["postgres"]