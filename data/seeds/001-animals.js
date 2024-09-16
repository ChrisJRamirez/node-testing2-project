exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('animals')
    .truncate()
    .then(function() {
      return knex('animals').insert([
        { name: 'lion' },
        { name: 'tiger' },
        { name: 'cheetah' },
        { name: 'jaguar' },
      ]);
    });
};
