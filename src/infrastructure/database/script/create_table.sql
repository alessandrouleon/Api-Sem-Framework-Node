-- CreateTable
CREATE TABLE users (
    id UUID NOT NULL,
    name VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(3),
    deleted_at TIMESTAMP(3),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);