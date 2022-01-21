const db = require("../data/dbConfig");

function getAll() {
  return db("animals")
};

async function insert(animal) {
  const [id] = await db("animals").insert(animal)
  return db("animals").where({id}).first()
};

async function update(id, changes) {
  return db("animals").update(changes).where(id)
};

module.exports = {
  getAll,
  insert,
  update
}

