FROM mongo:5.0.15
ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}
COPY worldcities.csv /worldcities.csv
CMD ["mongoimport", "--uri", "mongodb://mongo:27017/cities", "--db", "cities", "--collection", "cities", "--file", "./worldcities.csv", "--type", "csv", "--headerline"]


