//const list = [];
const db = require('../../infra/db')

const addAlimento = async (name, protein, carb, fat) => {
  const collection = db.getCollection('alimentos')
  let item = await collection.findOne({
    name
  })
  if (!item){
    let alimento = await collection.insertOne({
      name, 
      protein, 
      carb, 
      fat
    })
    return alimento.insertedId
  }
  /*let item = getAlimento(name);
  if (item === undefined) {
    list.push({
      name,
      protein,
      carb,
      fat,
    });
    return true;
  } 
  }*/
};

const getAlimento = async (name) => {
  const collection = db.getCollection('alimentos')
  return item = await collection.findOne({
    name
  })
}


/*const getAlimento = (name) => {
  return list.find((element) => {
    return element.name === name;
  });
};*/

const getAlimentos = () => {
  const collection = db.getCollection('alimentos')
  return collection.find({}).toArray();
};

/*const getAlimentos = () => {
  return list.slice();
};*/

//função será removida depois quando for usado banco de dados
/*const limparArray = () => {
  list.splice(0);
};*/

module.exports = {
  addAlimento,
  getAlimento,
  getAlimentos
};
