-- Criação das tabelas sem referências primeiro
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"content_type_id" INTEGER NOT NULL,
	"codename" VARCHAR(100) NOT NULL,
	UNIQUE ("content_type_id", "codename")
);

CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" SERIAL PRIMARY KEY,
	"password" VARCHAR(128) NOT NULL,
	"last_login" TIMESTAMPTZ NULL,
	"is_superuser" BOOLEAN NOT NULL,
	"username" VARCHAR(150) NOT NULL UNIQUE,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150) NOT NULL,
	"email" VARCHAR(254) NOT NULL,
	"is_staff" BOOLEAN NOT NULL,
	"is_active" BOOLEAN NOT NULL,
	"date_joined" TIMESTAMPTZ NOT NULL,
	"modificado" DATE NULL
);

CREATE TABLE IF NOT EXISTS "core_produto" (
	"id" SERIAL PRIMARY KEY,
	"criado" DATE NOT NULL,
	"modificado" DATE NOT NULL,
	"ativo" BOOLEAN NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"preco" NUMERIC(8, 2) NOT NULL,
	"estoque" INTEGER NOT NULL,
	"imagem" VARCHAR(100) NOT NULL,
	"slug" VARCHAR(100) NOT NULL,
	"descricao" VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS "core_servico" (
	"id" SERIAL PRIMARY KEY,
	"criado" DATE NOT NULL DEFAULT CURRENT_DATE,
	"modificado" DATE NOT NULL DEFAULT CURRENT_DATE,
	"ativo" BOOLEAN NOT NULL DEFAULT true,
	"nome" VARCHAR(100) NOT NULL,
	"preco" NUMERIC(8, 2) NOT NULL,
	"imagem" VARCHAR(255) NULL,
	"slug" VARCHAR(100) NOT NULL,
	"descricao" VARCHAR(255) NULL DEFAULT NULL
);

-- Criação de tabelas com referências (depois de garantir que as tabelas já existem)
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id" SERIAL PRIMARY KEY,
	"group_id" INTEGER NOT NULL,
	"permission_id" INTEGER NOT NULL,
	UNIQUE ("group_id", "permission_id"),
	CONSTRAINT fk_permission FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id"),
	CONSTRAINT fk_group FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id")
);

CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"group_id" INTEGER NOT NULL,
	UNIQUE ("user_id", "group_id"),
	CONSTRAINT fk_user_group FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id"),
	CONSTRAINT fk_group_user FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id")
);

CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"permission_id" INTEGER NOT NULL,
	UNIQUE ("user_id", "permission_id"),
	CONSTRAINT fk_user_perm FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id"),
	CONSTRAINT fk_perm_user FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id")
);

CREATE TABLE IF NOT EXISTS "compras" (
	"id" SERIAL PRIMARY KEY,
	"produto_id" INTEGER NOT NULL,
	"quantidade" INTEGER NOT NULL,
	"preco_total" NUMERIC(10, 2) NOT NULL,
	"data_compra" TIMESTAMPTZ DEFAULT now(),
	"usuario_id" INTEGER NOT NULL,
	"preco" NUMERIC NULL,
	CONSTRAINT fk_produto FOREIGN KEY ("produto_id") REFERENCES "core_produto" ("id"),
	CONSTRAINT fk_usuario FOREIGN KEY ("usuario_id") REFERENCES "auth_user" ("id")
);

CREATE TABLE IF NOT EXISTS "reservas" (
	"id" SERIAL PRIMARY KEY,
	"servico_id" INTEGER NOT NULL,
	"usuario_id" INTEGER NOT NULL,
	"data_reserva" DATE NOT NULL,
	"hora_reserva" TIME NOT NULL,
	"observacoes" TEXT NULL,
	"status" VARCHAR(50) DEFAULT 'Pendente',
	"data_criacao" TIMESTAMPTZ DEFAULT now(),
	CONSTRAINT fk_servico FOREIGN KEY ("servico_id") REFERENCES "core_servico" ("id"),
	CONSTRAINT fk_usuario FOREIGN KEY ("usuario_id") REFERENCES "auth_user" ("id")
);
