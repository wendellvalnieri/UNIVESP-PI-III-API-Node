export const up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('senha').notNullable();
        table.enu('tipo', ['admin', 'usuario']).notNullable().defaultTo('usuario');
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.boolean('ativado').defaultTo(true);
    });
};

export const down = function (knex) {
    return knex.schema.dropTable('usuarios');
};
