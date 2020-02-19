exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('departments')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('departments').insert([
        { department: 'Admin' },
        { department: 'Student' },
        { department: 'Instructor' },
        { department: 'Booster' }
      ]);
    });
};
