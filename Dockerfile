FROM docker

WORKDIR /myapp

COPY compose.yaml .

CMD [ "docker-compose", "up","-d" ]