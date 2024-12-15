#!/bin/bash


# Extract the local IP address (adjust interface name if needed, e.g., "eth0" or "wlan0")
IP=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}' | awk 'NR==3')

# Set other variables
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

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "$CERT_DIRECTORY/private.key" -out "$CERT_DIRECTORY/certificate.crt" -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORG/CN=$IP"

echo "Self-signed certificate and key have been created:"
echo " - Certificate: certificate.crt"
echo " - Private Key: private.key"
echo " - For IP address: $IP"
