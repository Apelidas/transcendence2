FROM nginx:latest

RUN mkdir -p /etc/ssl/certs/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/certs/private.key -out /etc/ssl/certs/certificate.crt -subj "/C=DE/ST=Germany/L=Wolfsburg/O=42Wolfsburg/CN=www.transcendence.com"

COPY ./default.conf /etc/nginx/conf.d/default.conf