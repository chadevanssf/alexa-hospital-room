-- DROP TABLE IF EXISTS salesforce.hospital_room__c;
-- DROP SEQUENCE IF EXISTS salesforce.hospital_room__c_id_seq;
-- DROP SCHEMA IF EXISTS salesforce;

CREATE SCHEMA salesforce
    AUTHORIZATION postgres;

CREATE SEQUENCE salesforce.hospital_room__c_id_seq
    INCREMENT 1
    START 5
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE salesforce.hospital_room__c
(
    systemmodstamp timestamp without time zone,
    createddate timestamp without time zone,
    floor__c character varying(255) COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('salesforce.hospital_room__c_id_seq'::regclass),
    sfid character varying(18) COLLATE pg_catalog."default",
    _hc_err text COLLATE pg_catalog."default",
    room_id__c character varying(50) COLLATE pg_catalog."default",
    status__c character varying(255) COLLATE pg_catalog."default",
    name character varying(80) COLLATE pg_catalog."default",
    _hc_lastop character varying(32) COLLATE pg_catalog."default",
    ownerid character varying(18) COLLATE pg_catalog."default",
    room__c character varying(10) COLLATE pg_catalog."default",
    isdeleted boolean,
    alexa_is_ready__c boolean,
    CONSTRAINT hospital_room__c_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
