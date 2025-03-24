/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS "auth_group" (
	"id" INTEGER NOT NULL,
	"name" VARCHAR(150) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_group_name_key" ("name"),
	INDEX "auth_group_name_a6ea08ec_like" ("name")
);

CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id" BIGINT NOT NULL,
	"group_id" INTEGER NOT NULL,
	"permission_id" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ("group_id", "permission_id"),
	INDEX "auth_group_permissions_group_id_b120cbf9" ("group_id"),
	INDEX "auth_group_permissions_permission_id_84c5c92e" ("permission_id"),
	CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id" INTEGER NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"content_type_id" INTEGER NOT NULL,
	"codename" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ("content_type_id", "codename"),
	INDEX "auth_permission_content_type_id_2f476e4b" ("content_type_id"),
	CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" INTEGER NOT NULL,
	"password" VARCHAR(128) NOT NULL,
	"last_login" TIMESTAMPTZ NULL DEFAULT NULL,
	"is_superuser" BOOLEAN NOT NULL,
	"username" VARCHAR(150) NOT NULL,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150) NOT NULL,
	"email" VARCHAR(254) NOT NULL,
	"is_staff" BOOLEAN NOT NULL,
	"is_active" BOOLEAN NOT NULL,
	"date_joined" TIMESTAMPTZ NOT NULL,
	"modificado" DATE NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_user_username_key" ("username"),
	INDEX "auth_user_username_6821ab7c_like" ("username")
);

CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id" BIGINT NOT NULL,
	"user_id" INTEGER NOT NULL,
	"group_id" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_user_groups_user_id_group_id_94350c0c_uniq" ("user_id", "group_id"),
	INDEX "auth_user_groups_user_id_6a12ed8b" ("user_id"),
	INDEX "auth_user_groups_group_id_97559544" ("group_id"),
	CONSTRAINT "auth_user_groups_group_id_97559544_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id" BIGINT NOT NULL,
	"user_id" INTEGER NOT NULL,
	"permission_id" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ("user_id", "permission_id"),
	INDEX "auth_user_user_permissions_user_id_a95ead1b" ("user_id"),
	INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ("permission_id"),
	CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "core_produto" (
	"id" BIGINT NOT NULL,
	"criado" DATE NOT NULL,
	"modificado" DATE NOT NULL,
	"ativo" BOOLEAN NOT NULL,
	"nome" VARCHAR(100) NOT NULL,
	"preco" NUMERIC(8,2) NOT NULL,
	"estoque" INTEGER NOT NULL,
	"imagem" VARCHAR(100) NOT NULL,
	"slug" VARCHAR(100) NOT NULL,
	"descricao" VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "core_produto_slug_2b8518b5" ("slug"),
	INDEX "core_produto_slug_2b8518b5_like" ("slug")
);

CREATE TABLE IF NOT EXISTS "core_servico" (
	"id" BIGINT NOT NULL DEFAULT 'nextval(''produto_id_seq''::regclass)',
	"criado" DATE NOT NULL DEFAULT 'CURRENT_DATE',
	"modificado" DATE NOT NULL DEFAULT 'CURRENT_DATE',
	"ativo" BOOLEAN NOT NULL DEFAULT 'true',
	"nome" VARCHAR(100) NOT NULL,
	"preco" NUMERIC(8,2) NOT NULL,
	"imagem" VARCHAR(255) NULL DEFAULT NULL,
	"slug" VARCHAR(100) NOT NULL,
	"descricao" VARCHAR(255) NULL DEFAULT 'NULL::character varying',
	PRIMARY KEY ("id"),
	UNIQUE INDEX "produto_slug_unique" ("slug")
);

CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id" INTEGER NOT NULL,
	"action_time" TIMESTAMPTZ NOT NULL,
	"object_id" TEXT NULL DEFAULT NULL,
	"object_repr" VARCHAR(200) NOT NULL,
	"action_flag" SMALLINT NOT NULL,
	"change_message" TEXT NOT NULL,
	"content_type_id" INTEGER NULL DEFAULT NULL,
	"user_id" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	INDEX "django_admin_log_content_type_id_c4bce8eb" ("content_type_id"),
	INDEX "django_admin_log_user_id_c564eba6" ("user_id"),
	CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "django_admin_log_user_id_c564eba6_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "django_admin_log_action_flag_check" CHECK (((action_flag >= 0)))
);

CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id" INTEGER NOT NULL,
	"app_label" VARCHAR(100) NOT NULL,
	"model" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ("app_label", "model")
);

CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id" BIGINT NOT NULL,
	"app" VARCHAR(255) NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"applied" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key" VARCHAR(40) NOT NULL,
	"session_data" TEXT NOT NULL,
	"expire_date" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("session_key"),
	INDEX "django_session_session_key_c0390e0f_like" ("session_key"),
	INDEX "django_session_expire_date_a5c62663" ("expire_date")
);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
