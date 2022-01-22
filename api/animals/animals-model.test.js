const Animal = require ("./animals-model");
const db = require("../../data/dbConfig");

const lion = {name: "lion"};
const tiger = {name: "tiger"};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("animals").truncate()
});

afterAll(async () => {
  await db.destroy()
});

describe("Animals Model", () => {
  describe("Insert function", () => {
    it("adds an animal to the database", async () => {
      let all
      await Animal.insert(lion)
      all = await db("animals")
      expect(all).toHaveLength(1)

      await Animal.insert(tiger)
      all = await db("animals")
      expect(all).toHaveLength(2)
    })
    it("values of animals from db", async () => {
      const animal = await Animal.insert(lion);
      expect(animal).toMatchObject({id:1, ...lion})

      const animal2 = await Animal.insert(tiger);
      expect(animal2).toMatchObject({id:2, ...tiger})
    })
  })
  describe("update function", () => {
    it("updates the animal", async () => {
      const [id] = await db("animals").insert(lion)
      await Animal.update(id, {name: "Simba"})
      const updated = await db("animals").where({id}).first()
      expect(updated.name).toBe("Simba")
    })
  })

})