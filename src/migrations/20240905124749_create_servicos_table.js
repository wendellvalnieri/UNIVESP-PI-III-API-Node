export const up = function (knex) {
    return knex.schema.createTable('servicos', function (table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.decimal('preco', 10, 2).notNullable();
        table.text('descricao').notNullable();
        table.integer('estoque').unsigned().notNullable();
        table.timestamp('criado_em').defaultTo(knex.fn.now());
    });
};

export const down = function (knex) {
    return knex.schema.dropTable('servicos');
};