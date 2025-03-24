INSERT INTO "auth_user" ("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined") VALUES
(1, 'pbkdf2_sha256$260000$fake_salt$hash_senha1', '2023-09-01 08:00:00', TRUE, 'admin', 'Carlos', 'Silva', 'admin@example.com', TRUE, TRUE, '2023-01-01 12:00:00'),
(2, 'pbkdf2_sha256$260000$fake_salt$hash_senha2', '2023-08-21 09:30:00', FALSE, 'jdoe', 'João', 'Doe', 'jdoe@example.com', TRUE, TRUE, '2022-05-15 10:00:00'),
(3, 'pbkdf2_sha256$260000$fake_salt$hash_senha3', NULL, FALSE, 'maria123', 'Maria', 'Oliveira', 'maria123@example.com', FALSE, TRUE, '2020-03-22 14:30:00'),
(4, 'pbkdf2_sha256$260000$fake_salt$hash_senha4', '2023-09-01 11:00:00', FALSE, 'pedror', 'Pedro', 'Rocha', 'pedror@example.com', FALSE, FALSE, '2021-08-10 16:45:00'),
(5, 'pbkdf2_sha256$260000$fake_salt$hash_senha5', '2023-09-01 12:00:00', TRUE, 'superuser', 'Ana', 'Santos', 'ana@example.com', TRUE, TRUE, '2023-07-20 08:15:00');


INSERT INTO "core_produto" ("id", "criado", "modificado", "ativo", "nome", "preço", "estoque", "imagem", "slug") VALUES
(1, '2023-01-10', '2023-09-01', TRUE, 'Shampoo Hidratante', 49.90, 150, 'shampoo_hidratante.jpg', 'shampoo-hidratante'),
(2, '2022-11-05', '2023-08-20', TRUE, 'Condicionador Reparador', 59.90, 100, 'condicionador_reparador.jpg', 'condicionador-reparador'),
(3, '2023-03-15', '2023-09-01', TRUE, 'Máscara Capilar Nutritiva', 79.50, 50, 'mascara_capilar_nutritiva.jpg', 'mascara-capilar-nutritiva'),
(4, '2022-12-01', '2023-08-01', FALSE, 'Óleo de Argan', 99.90, 0, 'oleo_argan.jpg', 'oleo-argan'),
(5, '2023-02-20', '2023-09-05', TRUE, 'Gel Modelador', 35.00, 200, 'gel_modelador.jpg', 'gel-modelador'),
(6, '2023-04-10', '2023-08-25', TRUE, 'Leave-in Protetor Térmico', 65.90, 75, 'leave_in_protetor_termico.jpg', 'leave-in-protetor-termico');


INSERT INTO "core_servico" ("id", "criado", "modificado", "ativo", "nome", "preço", "imagem", "slug") VALUES
(1, '2023-01-10', '2023-09-01', TRUE, 'Corte de Cabelo Feminino', 150.00, 'corte_cabelo_feminino.jpg', 'corte-cabelo-feminino'),
(2, '2022-11-05', '2023-08-20', TRUE, 'Corte de Cabelo Masculino', 80.00, 'corte_cabelo_masculino.jpg', 'corte-cabelo-masculino'),
(3, '2023-03-15', '2023-09-01', TRUE, 'Coloração Completa', 300.00, 'coloracao_completa.jpg', 'coloracao-completa'),
(4, '2022-12-01', '2023-08-01', TRUE, 'Progressiva', 400.00, 'progressiva.jpg', 'progressiva'),
(5, '2023-02-20', '2023-09-05', TRUE, 'Hidratação Capilar', 120.00, 'hidratacao_capilar.jpg', 'hidratacao-capilar'),
(6, '2023-04-10', '2023-08-25', TRUE, 'Luzes', 350.00, 'luzes.jpg', 'luzes');
