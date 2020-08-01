openssl req \
       -newkey rsa:2048 -nodes -keyout ./certificates/domain.key \
       -x509 -days 365 -out ./certificates/domain.crt