# react-python-bike-data

Built with React & Python

Bicicyle and station data called from URLS as CSV files, processed to ignore the shortest of journeys.
Data is stored in MongoDB.
Data compiled into lists displaying the data.
Maps are loaded to show the journey start and stop points (stations).

(Note: A few million lines of data to process, so can tend to be slow on load. Unfortunately, reload might be necessary)

## from directory:
1. cd backend && echo "MONGO_USERNAME=root
MONGO_PASSWORD=very-strong-db-password" > .env.local && cd ..

2. docker-compose up --build -d

3. Runs on: http://localhost:3000

## Stop App:
docker-compose down

## Start App:
docker-compose up -d
