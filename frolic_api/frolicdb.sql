--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: ankit; Tablespace: 
--

CREATE TABLE categories (
    id bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO ankit;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: ankit
--

CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO ankit;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ankit
--

ALTER SEQUENCE categories_id_seq OWNED BY categories.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: ankit; Tablespace: 
--

CREATE TABLE items (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(250) NOT NULL,
    category_item_fkey bigint NOT NULL,
    long_description text,
    item_photo character varying(250),
    item_user_fkey bigint
);


ALTER TABLE public.items OWNER TO ankit;

--
-- Name: items_category_item_fkey_seq; Type: SEQUENCE; Schema: public; Owner: ankit
--

CREATE SEQUENCE items_category_item_fkey_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_category_item_fkey_seq OWNER TO ankit;

--
-- Name: items_category_item_fkey_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ankit
--

ALTER SEQUENCE items_category_item_fkey_seq OWNED BY items.category_item_fkey;


--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: ankit
--

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO ankit;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ankit
--

ALTER SEQUENCE items_id_seq OWNED BY items.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ankit; Tablespace: 
--

CREATE TABLE users (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO ankit;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ankit
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ankit;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ankit
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);


--
-- Name: category_item_fkey; Type: DEFAULT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY items ALTER COLUMN category_item_fkey SET DEFAULT nextval('items_category_item_fkey_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: ankit
--

COPY categories (id, name) FROM stdin;
1	Soccer
2	Cricket
3	Basketball
4	Hockey
5	Volleyball
6	Golf
7	Tennis
8	Baseball
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ankit
--

SELECT pg_catalog.setval('categories_id_seq', 8, true);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: ankit
--

COPY items (id, title, description, category_item_fkey, long_description, item_photo, item_user_fkey) FROM stdin;
\.


--
-- Name: items_category_item_fkey_seq; Type: SEQUENCE SET; Schema: public; Owner: ankit
--

SELECT pg_catalog.setval('items_category_item_fkey_seq', 1, false);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ankit
--

SELECT pg_catalog.setval('items_id_seq', 76, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ankit
--

COPY users (id, name, email, password) FROM stdin;
2	a	ank.mahule@gmail.com	$5$rounds=535000$fhvw62ab.uSCi6K8$DJ0RKuAXq9JiZXEZO5IJKW52NWIYD9MhP4zg5uqLU9A
4	a	ank@gmail.com	$5$rounds=535000$lkoOtw7nq4df66JS$XdDvNDFkZCQcoK3waPW0NRH1YS.KoW.7o.gpQbxDhz5
5	a	ankit@gmail.com	$5$rounds=535000$4PPYbD4KWlE8jnWF$vLHIJS5n2ltW0bfJSkyQEiMbCbMDT7Dp64Gj274gMN9
6	ankit	ankiti@gmail.com	$5$rounds=535000$0TAIatORvsxM/Npj$dJqpJoGc5DkEBRxgg5utcPURrjSxvuHL34iO11a3sR2
7	a	a@gmail	$5$rounds=535000$sPXT8nz7gpu0sHBz$pmAxIjAt/ZN1sNW3/fO0eFtFqA1V/jevFdnliyDpI91
8	ankit	ankit.mahule@gmail.com	$5$rounds=535000$yS10e52McitASTs7$xkwF8AZwY8oYWuNxm/thqKxHXLsQ9IvgVkBv63CL038
9	amit	amit@gmail.com	$5$rounds=535000$/Qtgjx2gKxU5nbmU$iQx0tP74wDOrEDkneWVjPUWTrkKxj3NSeP4DszxnDN.
10	samruddhi	samruddhi@gmail.com	$5$rounds=535000$eyJjqCkBo8jOvgZN$IcPWF2QAqQCorcNJF4i6qa9lVTUUvzppchx7eKARNj4
11	ankit	ankit@yahoo.com	$5$rounds=535000$rjnc2XnIgQd7UQxK$5lRirgSx2zpLTEwuG5HYTWJbUa6DSYVPFAWzy5T8Ux4
12	amisha	amisha@gmail.com	$5$rounds=535000$WkkZUYD05l0DToc5$l0hNYawB1fyuEzwtJLrp8HcXW.8FlQXlrBZf3Reo8s5
13	ankit	ankit@tyh.com	$5$rounds=535000$4GPbaTllLKznAwQ0$d1L7GT2v7TKoh2UP4JcjLkEDb8DeWYx6LFMBkkjzIW/
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ankit
--

SELECT pg_catalog.setval('users_id_seq', 13, true);


--
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: ankit; Tablespace: 
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items_pkey; Type: CONSTRAINT; Schema: public; Owner: ankit; Tablespace: 
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: ankit; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items_category_item_fkey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_category_item_fkey_fkey FOREIGN KEY (category_item_fkey) REFERENCES categories(id) ON DELETE CASCADE;


--
-- Name: user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ankit
--

ALTER TABLE ONLY items
    ADD CONSTRAINT user_fkey FOREIGN KEY (item_user_fkey) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

