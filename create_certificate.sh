#!/bin/bash


# Extract the local IP address (adjust interface name if needed, e.g., "eth0" or "wlan0")
IP=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}' | awk 'NR==3')

# Set other variables
EMAIL="admin@example.com"
COUNTRY="DE"
STATE="Niedersachsen"
CITY="Wolfsburg"
ORG="42Wolfsburg"
CERT_DIRECTORY="nginx/ssl"

# Ensure an IP address was found
if [ -z "$IP" ]; then
  echo "Error: Could not determine local IP address. Please ensure 'ifconfig' is installed and you are connected to a network."
  exit 1
fi

# Generate Private Key
openssl genrsa -out "$CERT_DIRECTORY/private.key" 2048

# Generate CSR
openssl req -new -key "$CERT_DIRECTORY/private.key" -out "$CERT_DIRECTORY/request.csr" -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORG/CN=$IP/emailAddress=$EMAIL"

# Generate Self-Signed Certificate
openssl x509 -req -days 365 -in "$CERT_DIRECTORY/request.csr" -signkey "$CERT_DIRECTORY/private.key" -out "$CERT_DIRECTORY/certificate.crt"

echo "Self-signed certificate and key have been created:"
echo " - Certificate: certificate.crt"
echo " - Private Key: private.key"
echo " - For IP address: $IP"
