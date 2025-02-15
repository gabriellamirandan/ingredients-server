const { MongoClient } = require('mongodb');
const env = require('../../../env')
let mongoClient

const connect = async function () {
  const url = env.MONGO_DATABASE_URL;
  console.log(7, url);
  mongoClient = new MongoClient(url);
  await mongoClient.connect();
  console.log('Conectado à base de dados');
}

const getCollection = (collectionName) => {
  const dbName = env.MONGO_DATABASE_NAME;
  console.log(15, dbName);
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  return collection
}

const disconnect = async () => {
  await mongoClient.close();
  console.log('Desconectado da base de dados');
}

module.exports = {
  connect,
  getCollection,
  disconnect
}