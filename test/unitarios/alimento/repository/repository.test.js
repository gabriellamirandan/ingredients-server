const request = require('supertest');
const assert = require("assert");
const repository = require("../../../../src/alimento/repository");
const bancoDados = require('../../../../src/infra/db');


describe("Teste unitario do modulo de repositorio de alimentos", () => {
  afterEach(async () => {
    await bancoDados.getCollection('alimentos').deleteMany();
  });

  describe("Testes para adicionar alimentos", () => {
    it("Deve adicionar um alimento em um repositório vazio", async () => {
      const alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 0);
      await repository.addAlimento("batata", 4, 2, 5);
      const alimListPosAdd = await repository.getAlimentos();
      assert.strictEqual(alimListPosAdd.length, 1);
      assert.strictEqual(alimListPosAdd[0].name, "batata");
      assert.strictEqual(alimListPosAdd[0].protein, 4);
      assert.strictEqual(alimListPosAdd[0].carb, 2);
      assert.strictEqual(alimListPosAdd[0].fat, 5);
    });

    it("Deve adicionar um alimento em um repositório vazio", async () => {
      const alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 0);
      await repository.addAlimento("cenoura", 4, 2, 5);
      const alimListPosAdd = await repository.getAlimentos();
      assert.strictEqual(alimListPosAdd.length, 1);
      assert.strictEqual(alimListPosAdd[0].name, "cenoura");
      assert.strictEqual(alimListPosAdd[0].protein, 4);
      assert.strictEqual(alimListPosAdd[0].carb, 2);
      assert.strictEqual(alimListPosAdd[0].fat, 5);
    });

    it("Deve adicionar mais um alimento em um repositório preenchido", async () => {
      let alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 0);
      await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 2);
      assert.strictEqual(alimList[1].name, "feijao");
      assert.strictEqual(alimList[1].protein, 10);
      assert.strictEqual(alimList[1].carb, 3);
      assert.strictEqual(alimList[1].fat, 4);
    });

    it("Não deve adicionar alimento repetido na lista", async () => {
      await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("batata", 5, 2, 1);
      await repository.addAlimento("batata", 5, 2, 1);
      let alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 3);
    });

    it("Deve adicionar um alimento novo depois de bloquear um alimento repetido", async () => {
      await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("batata", 5, 2, 1);
      await repository.addAlimento("batata", 5, 2, 1);
      await repository.addAlimento("arroz", 1, 6, 8);
      let alimList = await repository.getAlimentos();
      assert.strictEqual(alimList.length, 4);
      assert.notStrictEqual(alimList[3].name, "feijao");
    });
  });

  describe("Testes para obter um alimento pelo nome", () => {
    it("Deve retornar o alimento buscado pelo nome", async () => {
      await repository.addAlimento("cenoura", 4, 2, 5);
      let idFeijao = await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("abobora", 9, 5, 2);
      let alim = await repository.getAlimento("feijao");
      assert.deepStrictEqual(alim, {
        _id: idFeijao,
        name: "feijao",
        protein: 10,
        carb: 3,
        fat: 4,
      });
    });
    it("Deve buscar um número e não retornar nada", async () => {
      await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("abobora", 9, 5, 2);
      let alim = await repository.getAlimento(7);
      assert.ok(!alim);
    });
    it("Deve retornar null caso seja buscado um item não inserido na lista", async () => {
      await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("abobora", 9, 5, 2);
      let alimento = await repository.getAlimento("tomate");
      assert.strictEqual(alimento, null);
    });
    it("Deve testar se outro alimento chamado é o retornado", async () => {
      let idCenoura = await repository.addAlimento("cenoura", 4, 2, 5);
      await repository.addAlimento("feijao", 10, 3, 4);
      await repository.addAlimento("abobora", 9, 5, 2);
      let alimento = await repository.getAlimento("cenoura");
      assert.deepStrictEqual(alimento, {
        _id: idCenoura,
        name: "cenoura",
        protein: 4,
        carb: 2,
        fat: 5,
      });
    });
  });

  describe("Testes para obter a lista de alimentos disponíveis", () => {
    it("Deve retornar a lista de alimentos adicionados", async () => {
      let idAlimentoUm = await repository.addAlimento("cenoura", 4, 2, 5);
      let idAlimentoDois = await repository.addAlimento("feijao", 10, 3, 4);
      let alimList = await repository.getAlimentos();
      assert.deepStrictEqual(alimList, [
        {
          _id: idAlimentoUm,
          name: "cenoura",
          protein: 4,
          carb: 2,
          fat: 5,
        },
        {
          _id: idAlimentoDois, 
          name: "feijao",
          protein: 10,
          carb: 3,
          fat: 4,
        },
      ]);
    });

    it("Deve retornar uma lista vazia no caso de nenhum alimento adicionado", async () => {
      let alimList = await repository.getAlimentos();
      assert.deepStrictEqual(alimList, []);
    });
  });
});
