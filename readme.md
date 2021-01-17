# Technical Problem Solutions for Gridics

## A.) Code Writing

To determine the total number of parcels and to compute the average parcel size, run:
```sh
cd a-code-writing
npm install
npm start
```

## B.) Component Design 

To validate the requirements for Component Design, run:
```sh
cd b-component-design 
npm install
npm test 
```

## C.) Database Modeling

docker-entrypoint-initdb.d/ contains the sql that will initialize the database when the docker container is started via Docker Compose

Executing demo/calculations.sql will print out the solutions.

To run interactively:
```sh
docker-compose up
docker exec -it c-database-modeling_db_1 /bin/bash
# Once insite the container run:
> psql -U postgres -f /tmp/demo/calculations.sql
```