CREATE TABLE IF NOT EXISTS "tipo_chave_pix" (
	"id"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "recebedor" (
	"id"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"cpf"	TEXT NOT NULL UNIQUE,
	"email"	TEXT NOT NULL,
	"id_tipo_chave_pix"	INTEGER NOT NULL,
	"chave_pix"	TEXT NOT NULL,
	"validado"	INTEGER NOT NULL DEFAULT 0 CHECK("validado" IN (0, 1)),
	PRIMARY KEY("id"),
	FOREIGN KEY("id_tipo_chave_pix") REFERENCES "tipo_chave_pix"("id")
);

INSERT INTO "tipo_chave_pix" ("id", "nome") VALUES
    (1, 'CPF'),
    (2, 'CNPJ'),
    (3, 'EMAIL'),
    (4, 'TELEFONE'),
    (5, 'CHAVE_ALEATORIA');

