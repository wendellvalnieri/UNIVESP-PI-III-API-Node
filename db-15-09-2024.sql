/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS "auth_group";
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id" INTEGER NOT NULL,
	"name" VARCHAR(150) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "auth_group_name_key" ("name"),
	INDEX "auth_group_name_a6ea08ec_like" ("name")
);

/*!40000 ALTER TABLE "auth_group" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_group" ENABLE KEYS */;

DROP TABLE IF EXISTS "auth_group_permissions";
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

/*!40000 ALTER TABLE "auth_group_permissions" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_group_permissions" ENABLE KEYS */;

DROP TABLE IF EXISTS "auth_permission";
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

/*!40000 ALTER TABLE "auth_permission" DISABLE KEYS */;
INSERT INTO "auth_permission" ("id", "name", "content_type_id", "codename") VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can view log entry', 1, 'view_logentry'),
	(5, 'Can add permission', 2, 'add_permission'),
	(6, 'Can change permission', 2, 'change_permission'),
	(7, 'Can delete permission', 2, 'delete_permission'),
	(8, 'Can view permission', 2, 'view_permission'),
	(9, 'Can add group', 3, 'add_group'),
	(10, 'Can change group', 3, 'change_group'),
	(11, 'Can delete group', 3, 'delete_group'),
	(12, 'Can view group', 3, 'view_group'),
	(13, 'Can add user', 4, 'add_user'),
	(14, 'Can change user', 4, 'change_user'),
	(15, 'Can delete user', 4, 'delete_user'),
	(16, 'Can view user', 4, 'view_user'),
	(17, 'Can add content type', 5, 'add_contenttype'),
	(18, 'Can change content type', 5, 'change_contenttype'),
	(19, 'Can delete content type', 5, 'delete_contenttype'),
	(20, 'Can view content type', 5, 'view_contenttype'),
	(21, 'Can add session', 6, 'add_session'),
	(22, 'Can change session', 6, 'change_session'),
	(23, 'Can delete session', 6, 'delete_session'),
	(24, 'Can view session', 6, 'view_session'),
	(25, 'Can add produto', 7, 'add_produto'),
	(26, 'Can change produto', 7, 'change_produto'),
	(27, 'Can delete produto', 7, 'delete_produto'),
	(28, 'Can view produto', 7, 'view_produto');
/*!40000 ALTER TABLE "auth_permission" ENABLE KEYS */;

DROP TABLE IF EXISTS "auth_user";
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

/*!40000 ALTER TABLE "auth_user" DISABLE KEYS */;
INSERT INTO "auth_user" ("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "modificado") VALUES
	(1, '$2b$10$iS84A6Q/NbVHC2BvENDja.ccNaQyDkrpaISC76kgjONeBql6ZZpCC', NULL, 'false', 'usuario123', 'João', 'Silva', 'joao.silva@email.com', 'false', 'true', '2024-09-10 08:40:56.588+01', NULL),
	(2, '$2b$10$iS84A6Q/NbVHC2BvENDja.ccNaQyDkrpaISC76kgjONeBql6ZZpCC', NULL, 'true', 'usuario2', 'João', 'Silva', 'joao.silva@email.com', 'true', 'true', '2024-09-10 08:40:56.588+01', NULL);
/*!40000 ALTER TABLE "auth_user" ENABLE KEYS */;

DROP TABLE IF EXISTS "auth_user_groups";
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

/*!40000 ALTER TABLE "auth_user_groups" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_user_groups" ENABLE KEYS */;

DROP TABLE IF EXISTS "auth_user_user_permissions";
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

/*!40000 ALTER TABLE "auth_user_user_permissions" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_user_user_permissions" ENABLE KEYS */;

DROP TABLE IF EXISTS "compras";
CREATE TABLE IF NOT EXISTS "compras" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''compras_id_seq''::regclass)',
	"produto_id" INTEGER NOT NULL,
	"quantidade" INTEGER NOT NULL,
	"preco_total" NUMERIC(10,2) NOT NULL,
	"data_compra" TIMESTAMP NULL DEFAULT 'now()',
	"usuario_id" INTEGER NOT NULL,
	"preco" NUMERIC NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_produto" FOREIGN KEY ("produto_id") REFERENCES "core_produto" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_usuario" FOREIGN KEY ("usuario_id") REFERENCES "auth_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

/*!40000 ALTER TABLE "compras" DISABLE KEYS */;
INSERT INTO "compras" ("id", "produto_id", "quantidade", "preco_total", "data_compra", "usuario_id", "preco") VALUES
	(1, 3, 1, 5.00, '2024-09-12 23:21:27.787', 1, NULL),
	(2, 11, 1, 1.00, '2024-09-14 00:51:58.294', 2, 339.00);
/*!40000 ALTER TABLE "compras" ENABLE KEYS */;

DROP TABLE IF EXISTS "core_produto";
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

/*!40000 ALTER TABLE "core_produto" DISABLE KEYS */;
INSERT INTO "core_produto" ("id", "criado", "modificado", "ativo", "nome", "preco", "estoque", "imagem", "slug", "descricao") VALUES
	(4, '2024-05-03', '2024-05-14', 'true', 'KIT WELLA INVIGO', 278.90, 3, '/media/produtos/KIT_INVIGO_COLOR_BRILLIANCE.JPG', 'kit-wella-invigo', NULL),
	(5, '2024-05-03', '2024-05-14', 'true', 'L''OREAL CURL EXPRESSION', 115.90, 2, '/media/produtos/LOréal_Professionnel_Serie_Expert_Curl_Expression.JPG', 'loreal-curl-expression', NULL),
	(12, '2024-05-22', '2024-05-22', 'true', 'shampoo', 200.00, 5, '/media/produtos/LOREAL_ABSOLUT_REPAIR.JPG', 'shampoo', NULL),
	(11, '2024-05-16', '2024-05-16', 'true', 'Kit Wella Professionals Oil Reflections Duo Salão', 339.00, 2, '/media/produtos/oil_reflections_WELLA.JPG', 'kit-wella-professionals-oil-reflections-duo-salao', NULL),
	(9, '2024-05-09', '2024-05-14', 'true', 'shampoo Kérastase', 179.96, 3, '/media/produtos/kerastase_shampoo.JPG', 'shampoo-kerastase', NULL),
	(8, '2024-05-03', '2024-05-14', 'true', 'SCHWARZKOPF CONDICIONADOR', 412.80, 2, '/media/produtos/condicionador.JPG', 'schwarzkopf-condicionador', NULL),
	(7, '2024-05-03', '2024-05-14', 'true', 'L''ANZA VOLUMIZADOR', 284.74, 3, '/media/produtos/VOLUMIZADOR.JPG', 'lanza-volumizador', NULL),
	(6, '2024-05-03', '2024-05-14', 'true', 'CHAPINHA TAIFF', 509.00, 1, '/media/produtos/TAIFF_-_CHAPINHA.JPG', 'chapinha-taiff', NULL),
	(3, '2024-05-03', '2024-05-14', 'true', 'KIT TESOURAS PROFISSIONAL2', 239.96, 2, '/media/produtos/kit_tesouras.JPG', 'kit-tesouras-profissional', NULL);
/*!40000 ALTER TABLE "core_produto" ENABLE KEYS */;

DROP TABLE IF EXISTS "core_servico";
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

/*!40000 ALTER TABLE "core_servico" DISABLE KEYS */;
INSERT INTO "core_servico" ("id", "criado", "modificado", "ativo", "nome", "preco", "imagem", "slug", "descricao") VALUES
	(1, '2024-09-11', '2024-09-11', 'true', 'Smart Escova', 0.00, '/static/images/topics/undraw_Remote_design_team_re_urdx.png', 'smart', 'Limpeza, hidratação, massagem capilar e a finalização que você desejar.'),
	(3, '2024-09-11', '2024-09-11', 'true', 'Hidratação', 0.00, '/static/images/topics/undraw_Podcast_audience_re_4i5q.png', 'hidratacao', 'Limpeza, hidratação e massagem capilar'),
	(4, '2024-09-11', '2024-09-11', 'true', 'Cronogramas', 2.00, '/static/images/topics/1.png', 'cronogramas', 'De 8 a 12 sessões incluindo hidratação, nutrição e recontrução para realizar em 4 semanas.'),
	(5, '2024-09-11', '2024-09-11', 'true', 'Manicure', 0.00, '/static/images/topics/2.png', 'manicure', 'Limpeza, cutilação, e esmaltação das unhas das mãos.'),
	(6, '2024-09-11', '2024-09-11', 'true', 'Pedicure', 0.00, '/static/images/topics/3.png', 'pedicure', '333'),
	(2, '2024-09-11', '2024-09-13', 'true', 'Escova2', 0.00, '/static/images/topics/undraw_online_ad_re_ol62.png', 'escova', 'Limpeza, massagem capilar e secagem');
/*!40000 ALTER TABLE "core_servico" ENABLE KEYS */;

DROP TABLE IF EXISTS "django_admin_log";
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

/*!40000 ALTER TABLE "django_admin_log" DISABLE KEYS */;
/*!40000 ALTER TABLE "django_admin_log" ENABLE KEYS */;

DROP TABLE IF EXISTS "django_content_type";
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id" INTEGER NOT NULL,
	"app_label" VARCHAR(100) NOT NULL,
	"model" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ("app_label", "model")
);

/*!40000 ALTER TABLE "django_content_type" DISABLE KEYS */;
INSERT INTO "django_content_type" ("id", "app_label", "model") VALUES
	(1, 'admin', 'logentry'),
	(2, 'auth', 'permission'),
	(3, 'auth', 'group'),
	(4, 'auth', 'user'),
	(5, 'contenttypes', 'contenttype'),
	(6, 'sessions', 'session'),
	(7, 'core', 'produto');
/*!40000 ALTER TABLE "django_content_type" ENABLE KEYS */;

DROP TABLE IF EXISTS "django_migrations";
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id" BIGINT NOT NULL,
	"app" VARCHAR(255) NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"applied" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("id")
);

/*!40000 ALTER TABLE "django_migrations" DISABLE KEYS */;
INSERT INTO "django_migrations" ("id", "app", "name", "applied") VALUES
	(1, 'contenttypes', '0001_initial', '2024-09-03 23:22:49.697194+01'),
	(2, 'auth', '0001_initial', '2024-09-03 23:22:49.769018+01'),
	(3, 'admin', '0001_initial', '2024-09-03 23:22:49.789182+01'),
	(4, 'admin', '0002_logentry_remove_auto_add', '2024-09-03 23:22:49.794183+01'),
	(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-09-03 23:22:49.798182+01'),
	(6, 'contenttypes', '0002_remove_content_type_name', '2024-09-03 23:22:49.807971+01'),
	(7, 'auth', '0002_alter_permission_name_max_length', '2024-09-03 23:22:49.815077+01'),
	(8, 'auth', '0003_alter_user_email_max_length', '2024-09-03 23:22:49.819272+01'),
	(9, 'auth', '0004_alter_user_username_opts', '2024-09-03 23:22:49.824319+01'),
	(10, 'auth', '0005_alter_user_last_login_null', '2024-09-03 23:22:49.82997+01'),
	(11, 'auth', '0006_require_contenttypes_0002', '2024-09-03 23:22:49.831001+01'),
	(12, 'auth', '0007_alter_validators_add_error_messages', '2024-09-03 23:22:49.834948+01'),
	(13, 'auth', '0008_alter_user_username_max_length', '2024-09-03 23:22:49.843276+01'),
	(14, 'auth', '0009_alter_user_last_name_max_length', '2024-09-03 23:22:49.847907+01'),
	(15, 'auth', '0010_alter_group_name_max_length', '2024-09-03 23:22:49.854864+01'),
	(16, 'auth', '0011_update_proxy_permissions', '2024-09-03 23:22:49.859506+01'),
	(17, 'auth', '0012_alter_user_first_name_max_length', '2024-09-03 23:22:49.864511+01'),
	(18, 'core', '0001_initial', '2024-09-03 23:22:49.873823+01'),
	(19, 'core', '0002_alter_produto_imagem', '2024-09-03 23:22:49.875886+01'),
	(20, 'sessions', '0001_initial', '2024-09-03 23:22:49.886631+01');
/*!40000 ALTER TABLE "django_migrations" ENABLE KEYS */;

DROP TABLE IF EXISTS "django_session";
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key" VARCHAR(40) NOT NULL,
	"session_data" TEXT NOT NULL,
	"expire_date" TIMESTAMPTZ NOT NULL,
	PRIMARY KEY ("session_key"),
	INDEX "django_session_session_key_c0390e0f_like" ("session_key"),
	INDEX "django_session_expire_date_a5c62663" ("expire_date")
);

/*!40000 ALTER TABLE "django_session" DISABLE KEYS */;
/*!40000 ALTER TABLE "django_session" ENABLE KEYS */;

DROP TABLE IF EXISTS "reservas";
CREATE TABLE IF NOT EXISTS "reservas" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''reservas_id_seq''::regclass)',
	"servico_id" INTEGER NOT NULL,
	"usuario_id" INTEGER NOT NULL,
	"data_reserva" DATE NOT NULL,
	"hora_reserva" TIME NOT NULL,
	"observacoes" TEXT NULL DEFAULT NULL,
	"status" VARCHAR(50) NULL DEFAULT 'Pendente',
	"data_criacao" TIMESTAMP NULL DEFAULT 'now()',
	PRIMARY KEY ("id"),
	CONSTRAINT "fk_servico" FOREIGN KEY ("servico_id") REFERENCES "core_servico" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_usuario" FOREIGN KEY ("usuario_id") REFERENCES "auth_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

/*!40000 ALTER TABLE "reservas" DISABLE KEYS */;
INSERT INTO "reservas" ("id", "servico_id", "usuario_id", "data_reserva", "hora_reserva", "observacoes", "status", "data_criacao") VALUES
	(6, 1, 1, '2024-09-17', '00:20:00', '', '1', '2024-09-14 00:19:24.467'),
	(1, 1, 2, '2024-09-12', '14:30:00', '', '1', '2024-09-12 23:21:27.787'),
	(13, 1, 1, '2024-09-10', '00:31:00', '', '1', '2024-09-14 00:24:05.187');
/*!40000 ALTER TABLE "reservas" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
