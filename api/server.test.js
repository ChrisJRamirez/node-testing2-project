const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

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

describe("server", () => {
  describe("[GET] /animaals", () => {
    it("responds with 200 ok", async () => {
      const res = await request(server).get("/animals")
      expect(res.status).toEqual(200)
    })
    it("returns right num of animals", async () => {
      let res
      await db("animals").insert(lion)
      res = await request(server).get("/animals")
      expect(res.body).toHaveLength(1)

      await db("animals").insert(tiger)
      res = await request(server).get("/animals")
      expect(res.body).toHaveLength(2)
    })
    it("returns right format for animals", async () => {
      await db("animals").insert(lion)
      await db("animals").insert(tiger)
      const res = await request(server).get("/animals")
      expect(res.body[0]).toMatchObject({id:1,...lion})
      expect(res.body[1]).toMatchObject({id:2,...tiger})
    })
  })
  describe("[POST] /animals", () => {
    it("responds with the newly created animal", async () => {
      let res
      res = await request(server).post("/animals").send(lion)
      expect(res.body).toMatchObject({id:1, ...lion})

      res = await request(server).post("/animals").send(tiger)
      expect(res.body).toMatchObject({id:2, ...tiger})
    })
  })
})
