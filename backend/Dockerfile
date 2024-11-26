FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

run apt update && apt upgrade -y
RUN apt install libnss3-tools wget -y
RUN wget -O /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 \
	&& chmod +x /usr/local/bin/mkcert

RUN mkcert -install
RUN mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1
# COPY TO CORRECT DIR?

COPY . /app/
COPY run.sh /app/run.sh

RUN chmod +x /app/run.sh

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

CMD ["sh", "/app/run.sh"]