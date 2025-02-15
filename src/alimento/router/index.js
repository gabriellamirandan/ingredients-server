const controller = require("../controllers");

const rotearAlimento = (instExpress) => {
  instExpress.post("/api/alimentos", controller.adicionarAlimento);
  instExpress.get("/api/alimentos/:name", controller.acharAlimento);
  instExpress.get('/api/alimentos', controller.obterAlimentos);
};

/*const buscarAlimento = (instExpress) => {
  instExpress.get("/api/alimento/:name", controller.acharAlimento)
}*/

module.exports = 
  rotearAlimento
;
