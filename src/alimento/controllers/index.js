const service = require("../service");

const adicionarAlimento = async (req, res) => {
  const name = req.body.name;
  const carb = req.body.carb;
  const fat = req.body.fat;
  const protein = req.body.protein;
  if (
    typeof name === "string" &&
    typeof carb === "number" &&
    typeof fat === "number" &&
    typeof protein === "number"
  ) {
    const result = await service.adicionarAlimento(name, protein, carb, fat)
    if (result) {
      res.status(200);
      res.send("OK");
    } else {
      res.status(400);
      res.send("ERROR");
    }
  } else {
    res.status(400);
    res.send("ERROR");
  }
};

const acharAlimento = async (req, res) => {
  const name = req.params.name;
  const alimento = await service.obterAlimentoPeloNome(name)
  if (alimento) {
    res.status(200);
    res.send(alimento);
  } else {
    res.sendStatus(404);
  }
}

const obterAlimentos = async (req, res) => {
  const listaAlimentos = await service.obterListaDeAlimentos()
  if (listaAlimentos) {
    res.status(200);
    res.json(listaAlimentos);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  adicionarAlimento,
  acharAlimento,
  obterAlimentos
};
