const repository = require("../repository");

const adicionarAlimento = async (name, protein, carb, fat) => {
  if (protein >= 0 && carb >= 0 && fat >= 0 && name !== "") {
    let newName = name.toLowerCase();
    const inserted = await repository.addAlimento(newName, protein, carb, fat);
    return inserted
  }
};

const obterAlimentoPeloNome = async (name) => {
  let newName = name.toLowerCase();
  const alimento = await repository.getAlimento(newName);
  if (alimento) {
    alimento.energy = alimento.carb * 4 + alimento.protein * 4 + alimento.fat * 9 // fazer um if pra se não tiver alimento cadastrado
    alimento.unit = "kcal/g"
  }
  return alimento
  // TODO verificar se precisa validar o name
  // if name =! undefined
  //{name to lower case + getAlimento}
};

const obterListaDeAlimentos = async () => {
  // TODO verificar se precisa de validação
  return await repository.getAlimentos();
};

module.exports = {
  adicionarAlimento,
  obterAlimentoPeloNome,
  obterListaDeAlimentos,
};
