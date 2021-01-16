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

```sh
docker-compose up
docker exec -it c-database-modeling_db_1 /bin/bash
> psql -U postgres
```