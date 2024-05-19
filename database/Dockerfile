FROM postgres:latest

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

COPY init.sql /docker-entrypoint-initdb.d/
RUN chmod 777 /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432

CMD ["postgres"]