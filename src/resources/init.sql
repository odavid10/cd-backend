-- init.sql

-- ----------------------------
-- Create Data Base
-- ----------------------------
CREATE DATABASE "ContactDirectory";
ALTER DATABASE "ContactDirectory" 
SET timezone TO 'UTC';

-- ----------------------------
-- Function structure for execute_function_on_sequences
-- ----------------------------
DROP FUNCTION
IF
	EXISTS execute_function_on_sequences;
CREATE 
	OR REPLACE FUNCTION execute_function_on_sequences ( atable_name TEXT, acolumn_name TEXT, sequence_name TEXT ) RETURNS void AS $$ BEGIN
	DECLARE
		ID INTEGER;
	BEGIN
			EXECUTE format ( E'SELECT COALESCE(MAX(%I), 0) FROM %I;', acolumn_name, atable_name ) INTO ID;
		EXECUTE'SELECT restart_sequence(''' || sequence_name || ''', ' || ID || ');';
		
	END;	
END $$ LANGUAGE plpgsql;

-- ----------------------------
-- Tables
-- ----------------------------
CREATE TABLE
IF
	NOT EXISTS "public"."contacts" (
		id_contact BIGSERIAL PRIMARY KEY,
		names VARCHAR ( 100 ) NOT NULL,
		email VARCHAR ( 100 ) NOT NULL,
		phone VARCHAR ( 100 ) NOT NULL,
		active BOOLEAN DEFAULT TRUE,
		enterprise VARCHAR ( 100 ) 
	);

DELETE  FROM "public"."contacts";

INSERT INTO "public"."contacts" ( NAMES, email, phone, enterprise )
VALUES
	( 'Juan Pérez García', 'juan.perez@yopmail.com', '5512345678', 'TechSolutions S.A.' ),
	( 'María López Fernández', 'maria.lopez@yopmail.com', '5523456789', 'Global Consulting' ),
	( 'Carlos Sánchez Ruiz', 'carlos.sanchez@yopmail.com', '5534567890', 'Innovatech' ),
	( 'Ana Martínez Torres', 'ana.martinez@yopmail.com', '5545678901', NULL ),
	( 'Luis Rodríguez Castro', 'luis.rodriguez@yopmail.com', '5556789012', 'Vanguard Corp.' );