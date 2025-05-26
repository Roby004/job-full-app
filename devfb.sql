--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-05-26 10:36:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16557)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16649)
-- Name: application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application (
    id integer NOT NULL,
    candidate_id integer NOT NULL,
    job_offer_id integer NOT NULL,
    status character varying(50),
    applied_at timestamp without time zone
);


ALTER TABLE public.application OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16648)
-- Name: application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.application_id_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 232
-- Name: application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.application_id_seq OWNED BY public.application.id;


--
-- TOC entry 225 (class 1259 OID 16592)
-- Name: candidat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidat (
    id integer NOT NULL,
    fullname character varying(150) NOT NULL,
    resume character varying(300),
    user_id integer NOT NULL
);


ALTER TABLE public.candidat OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16591)
-- Name: candidat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.candidat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candidat_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 224
-- Name: candidat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.candidat_id_seq OWNED BY public.candidat.id;


--
-- TOC entry 229 (class 1259 OID 16618)
-- Name: candidateskills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidateskills (
    id integer NOT NULL,
    candidate_id integer NOT NULL,
    skill_id integer NOT NULL
);


ALTER TABLE public.candidateskills OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16617)
-- Name: candidateskills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.candidateskills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candidateskills_id_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 228
-- Name: candidateskills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.candidateskills_id_seq OWNED BY public.candidateskills.id;


--
-- TOC entry 227 (class 1259 OID 16604)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    user_id integer NOT NULL
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16603)
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 226
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- TOC entry 231 (class 1259 OID 16635)
-- Name: offer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer (
    id integer NOT NULL,
    title character varying(150) NOT NULL,
    description text NOT NULL,
    location character varying(100),
    posted_at timestamp without time zone,
    company_id integer NOT NULL,
    statut_offre boolean,
    category character varying(150) NOT NULL,
    type_offre character varying(50) NOT NULL
);


ALTER TABLE public.offer OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16634)
-- Name: offer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offer_id_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 230
-- Name: offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offer_id_seq OWNED BY public.offer.id;


--
-- TOC entry 235 (class 1259 OID 16666)
-- Name: offerskill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offerskill (
    id integer NOT NULL,
    job_offer_id integer NOT NULL,
    skill_id integer NOT NULL
);


ALTER TABLE public.offerskill OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16665)
-- Name: offerskill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offerskill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offerskill_id_seq OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 234
-- Name: offerskill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offerskill_id_seq OWNED BY public.offerskill.id;


--
-- TOC entry 219 (class 1259 OID 16563)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16562)
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_id_seq OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 218
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- TOC entry 221 (class 1259 OID 16572)
-- Name: token_blocklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blocklist (
    id integer NOT NULL,
    token character varying(500) NOT NULL,
    blacklisted_on timestamp without time zone NOT NULL
);


ALTER TABLE public.token_blocklist OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16571)
-- Name: token_blocklist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blocklist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.token_blocklist_id_seq OWNER TO postgres;

--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 220
-- Name: token_blocklist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blocklist_id_seq OWNED BY public.token_blocklist.id;


--
-- TOC entry 223 (class 1259 OID 16583)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(120) NOT NULL,
    password text NOT NULL,
    role character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16582)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4692 (class 2604 OID 16652)
-- Name: application id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application ALTER COLUMN id SET DEFAULT nextval('public.application_id_seq'::regclass);


--
-- TOC entry 4688 (class 2604 OID 16595)
-- Name: candidat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat ALTER COLUMN id SET DEFAULT nextval('public.candidat_id_seq'::regclass);


--
-- TOC entry 4690 (class 2604 OID 16621)
-- Name: candidateskills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidateskills ALTER COLUMN id SET DEFAULT nextval('public.candidateskills_id_seq'::regclass);


--
-- TOC entry 4689 (class 2604 OID 16607)
-- Name: company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- TOC entry 4691 (class 2604 OID 16638)
-- Name: offer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer ALTER COLUMN id SET DEFAULT nextval('public.offer_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 16669)
-- Name: offerskill id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerskill ALTER COLUMN id SET DEFAULT nextval('public.offerskill_id_seq'::regclass);


--
-- TOC entry 4685 (class 2604 OID 16566)
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- TOC entry 4686 (class 2604 OID 16575)
-- Name: token_blocklist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blocklist ALTER COLUMN id SET DEFAULT nextval('public.token_blocklist_id_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 16586)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4874 (class 0 OID 16557)
-- Dependencies: 217
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
df0b23e82ebf
\.


--
-- TOC entry 4890 (class 0 OID 16649)
-- Dependencies: 233
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application (id, candidate_id, job_offer_id, status, applied_at) FROM stdin;
7	2	65	en attente	2025-05-26 07:25:06.272738
\.


--
-- TOC entry 4882 (class 0 OID 16592)
-- Dependencies: 225
-- Data for Name: candidat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.candidat (id, fullname, resume, user_id) FROM stdin;
1	RAKOTO Naivo		13
2	RABE Soa		7
3	RAVAO Soa		9
\.


--
-- TOC entry 4886 (class 0 OID 16618)
-- Dependencies: 229
-- Data for Name: candidateskills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.candidateskills (id, candidate_id, skill_id) FROM stdin;
\.


--
-- TOC entry 4884 (class 0 OID 16604)
-- Dependencies: 227
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, name, description, user_id) FROM stdin;
10	TechIn	Une entreprise spécialisée dans les solutions numériques innovantes.	10
11	SantéPlus	Startup dans le domaine de la santé connectée.	11
12	GreenFuture	Entreprise écoresponsable axée sur les énergies renouvelables.	12
13	EduSmart	Plateforme d'apprentissage numérique interactive.	5
\.


--
-- TOC entry 4888 (class 0 OID 16635)
-- Dependencies: 231
-- Data for Name: offer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offer (id, title, description, location, posted_at, company_id, statut_offre, category, type_offre) FROM stdin;
41	Développeur Full Stack	Rejoignez une entreprise en pleine croissance pour participer à des projets ambitieux dans le domaine de la tech et de l'innovation.	Casablanca, Maroc	2025-05-21 16:00:10.92834	10	t	Gestion de projet	Stage
42	Data Scientist	Vous contribuerez à la conception, au développement et au déploiement de solutions innovantes pour nos clients internationaux.	Berlin, Allemagne	2025-05-21 16:00:10.956228	12	f	Data	Stage
43	UX/UI Designer	Cette offre s'adresse à des talents créatifs et motivés, prêts à relever de nouveaux défis dans un environnement stimulant.	Paris, France	2025-05-21 16:00:10.9563	11	f	Sécurité	Stage
44	DevOps Engineer	Vous contribuerez à la conception, au développement et au déploiement de solutions innovantes pour nos clients internationaux.	Paris, France	2025-05-21 16:00:10.956346	10	t	Data	Freelance
45	Chef de projet digital	Rejoignez une entreprise en pleine croissance pour participer à des projets ambitieux dans le domaine de la tech et de l'innovation.	Berlin, Allemagne	2025-05-21 16:00:10.956386	10	f	Sécurité	Freelance
46	Développeur Mobile	Nous recherchons un professionnel passionné pour rejoindre notre équipe dynamique. Le candidat idéal devra posséder de solides compétences techniques et une bonne capacité à travailler en équipe.	Casablanca, Maroc	2025-05-21 16:00:10.956427	11	t	Design	CDI
47	Spécialiste Cloud	Vous contribuerez à la conception, au développement et au déploiement de solutions innovantes pour nos clients internationaux.	Berlin, Allemagne	2025-05-21 16:00:10.956462	11	t	Sécurité	CDI
48	Consultant Cybersécurité	Nous recherchons un professionnel passionné pour rejoindre notre équipe dynamique. Le candidat idéal devra posséder de solides compétences techniques et une bonne capacité à travailler en équipe.	Paris, France	2025-05-21 16:00:10.956494	11	t	Gestion de projet	Stage
49	Ingénieur QA	Nous recherchons un professionnel passionné pour rejoindre notre équipe dynamique. Le candidat idéal devra posséder de solides compétences techniques et une bonne capacité à travailler en équipe.	Casablanca, Maroc	2025-05-21 16:00:10.956526	12	f	Design	Freelance
50	Product Owner	Cette offre s'adresse à des talents créatifs et motivés, prêts à relever de nouveaux défis dans un environnement stimulant.	Casablanca, Maroc	2025-05-21 16:00:10.956558	11	t	Design	CDI
61	Développeur Backend Python	\n**Description générale** :\nNous recherchons un(e) Développeur Backend Python passionné(e) par le domaine de data. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec data\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Lyon, France	2025-05-21 16:10:19.508474	12	t	Infrastructure	Freelance
62	Ingénieur DevOps Cloud	\n**Description générale** :\nNous recherchons un(e) Ingénieur DevOps Cloud passionné(e) par le domaine de design. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec design\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Tunis, Tunisie	2025-05-21 16:10:19.53593	13	f	Développement	Freelance
63	Analyste Données	\n**Description générale** :\nNous recherchons un(e) Analyste Données passionné(e) par le domaine de infrastructure. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec infrastructure\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Dakar, Sénégal	2025-05-21 16:10:19.536002	11	t	Infrastructure	Stage
64	Designer UX Senior	\n**Description générale** :\nNous recherchons un(e) Designer UX Senior passionné(e) par le domaine de design. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec design\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Bruxelles, Belgique	2025-05-21 16:10:19.536045	11	f	Data	CDI
65	Architecte Logiciel	\n**Description générale** :\nNous recherchons un(e) Architecte Logiciel passionné(e) par le domaine de design. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec design\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Antananarivo, Madagascar	2025-05-21 16:10:19.536086	10	t	Éducation	Freelance
66	Scrum Master	\n**Description générale** :\nNous recherchons un(e) Scrum Master passionné(e) par le domaine de infrastructure. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec infrastructure\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Dakar, Sénégal	2025-05-21 16:10:19.536129	10	f	Développement	Freelance
67	Spécialiste Réseaux	\n**Description générale** :\nNous recherchons un(e) Spécialiste Réseaux passionné(e) par le domaine de infrastructure. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec infrastructure\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Dakar, Sénégal	2025-05-21 16:10:19.536165	13	t	Développement	Stage
68	Consultant ERP	\n**Description générale** :\nNous recherchons un(e) Consultant ERP passionné(e) par le domaine de infrastructure. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec infrastructure\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Bruxelles, Belgique	2025-05-21 16:10:19.536198	10	f	Éducation	CDI
69	Formateur IT	\n**Description générale** :\nNous recherchons un(e) Formateur IT passionné(e) par le domaine de éducation. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec éducation\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Antananarivo, Madagascar	2025-05-21 16:10:19.536232	13	t	Design	CDI
70	Développeur Frontend React	\n**Description générale** :\nNous recherchons un(e) Développeur Frontend React passionné(e) par le domaine de développement. Vous intégrerez une équipe dynamique œuvrant sur des projets à fort impact.\n\n**Missions principales** :\n- Analyser les besoins techniques et fonctionnels\n- Développer, tester et maintenir des applications robustes\n- Collaborer avec des équipes multidisciplinaires\n- Participer aux cérémonies agiles (daily, sprint, review)\n\n**Compétences requises** :\n- Excellente maîtrise des outils et langages en lien avec développement\n- Bonne communication, autonomie et sens de l'organisation\n- 2+ années d'expérience (ou équivalent stage pour les juniors)\n\n**Rémunération** :\n1000 $\n	Lyon, France	2025-05-21 16:10:19.53627	12	f	Data	Freelance
\.


--
-- TOC entry 4892 (class 0 OID 16666)
-- Dependencies: 235
-- Data for Name: offerskill; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offerskill (id, job_offer_id, skill_id) FROM stdin;
1	41	11
2	41	23
3	42	25
4	42	23
5	43	14
6	43	9
7	44	1
8	44	15
9	44	8
10	44	3
11	45	12
12	45	18
13	45	13
14	45	11
15	46	11
16	46	26
17	46	7
18	46	17
19	47	17
20	47	3
21	47	7
22	48	1
23	48	4
24	48	2
25	49	3
26	49	27
27	50	11
28	50	13
29	61	1
30	61	19
31	61	5
32	62	3
33	62	20
34	62	22
35	63	13
36	63	21
37	63	16
38	63	3
39	64	20
40	64	21
41	65	16
42	65	20
43	65	12
44	66	20
45	66	5
46	66	12
47	67	16
48	67	19
49	68	10
50	68	16
51	69	8
52	69	13
53	70	1
54	70	8
\.


--
-- TOC entry 4876 (class 0 OID 16563)
-- Dependencies: 219
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (id, name) FROM stdin;
1	Python
2	JavaScript
3	SQL
4	Java
5	C++
6	HTML
7	CSS
8	React
9	Node.js
10	Flask
11	Django
12	PostgreSQL
13	MongoDB
14	Docker
15	Developpement web
16	Developpement mobile
17	Data science
18	Rédaction web
19	Comptabilité
20	Communication
21	Architecture
22	Kubernetes
23	AWS
24	Git
25	Linux
26	TypeScript
27	Figma
\.


--
-- TOC entry 4878 (class 0 OID 16572)
-- Dependencies: 221
-- Data for Name: token_blocklist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.token_blocklist (id, token, blacklisted_on) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJleHAiOjE3NDc4Mzk1NTR9.91RQocEXKXxHfyZhvJYDDyTYds9FSroWosTUMutswCI	2025-05-21 14:51:38.235652
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3NDgyNDM0ODd9.dhvUnpoNtLyi5WWNizEHQriaijTbzn6C7oill9eyWWk	2025-05-26 07:08:40.976714
\.


--
-- TOC entry 4880 (class 0 OID 16583)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role) FROM stdin;
5	edusmartest@gmail.com	scrypt:32768:8:1$V8crTD8vYhiKBtOQ$94999e45d3aee9a2f8575a80dcb00a8694d3a0395c22a8c6ef6126bc0a980d4342392ed08cc81abfd1b600fccb5fa7fa32f0e553fb430c5a3f80803e58a98637	recruteur
6	rabe@gmail.com	scrypt:32768:8:1$ntjey9FmFtKMHGRY$c2705bfc9403b69d82eabf56023e721b4ceefcbf81952958391904060b37106f697d873ed99de7393cd760e0e69efa8da65b218e351f48aa0fac0a26d80a49bf	candidat
7	rabetest@gmail.com	scrypt:32768:8:1$5AQYxDZWmaoIej6b$1b0c9b59cffc83ddb693c2e424773255126afb0c20399f98de569438824940555e094d5275effe106a447aa6dd89d06fe371e5cc5a218e4dafd88a4c9ad9ccac	candidat
9	amboarampitiavana8@gmail.com	scrypt:32768:8:1$e56QM8a8ZPCul6ea$2a914b14c6f91d9f7d50507c48171d8db1c6369678af2998fee226ad7b1db0d5b1a18bf5d95db56824a72194cc5365aa8135285f6992791ed1faccd0fcb45863	candidat
10	techintest@gmail.com	scrypt:32768:8:1$b8LWxJ1n8wiHFOHs$3d6a093face65e990f0e2bd37771f89164490e608ea6c16670e88350527fe93c26c1b8c986fd4b9e55bfd8b273a7fb1c727117a275e5a4c960cfc6769ffb8e2c	recruteur
11	santetest@gmail.com	scrypt:32768:8:1$iL4a384cQXsbIbYo$f81782aea6ce5d3fdaea8ec291dad9281efbeb61619d104f7feff8060c20dcbccefc93a79e656d58734ad9af4e95b87741122acf2b262073328f6a770237e15c	recruteur
12	greentest@gmail.com	scrypt:32768:8:1$O2wtfCH4BWZS8uIn$aebc576fdb7c8dd97036d9b4b9f4d657d99844286298d7f728ab4d47f06a3947b745c6ee4b45137d6b17abd2618b0d41bc43f839c72936f417b4c1287caa8eba	recruteur
13	naivotest@gmail.com	scrypt:32768:8:1$fKeodHVq7BnrRhLl$e5bb7a025f5cd90ce51be43851f2c7b1015787f60ccadc434e44b9e42dd84cf07176b6fa2122192ab4c032fd565c39fce92fedf81b7346668d2cc1b3c21105a9	candidat
\.


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 232
-- Name: application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.application_id_seq', 7, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 224
-- Name: candidat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.candidat_id_seq', 1, true);


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 228
-- Name: candidateskills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.candidateskills_id_seq', 1, false);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 226
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.company_id_seq', 13, true);


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 230
-- Name: offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offer_id_seq', 70, true);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 234
-- Name: offerskill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offerskill_id_seq', 54, true);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 218
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_id_seq', 27, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 220
-- Name: token_blocklist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_blocklist_id_seq', 2, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- TOC entry 4695 (class 2606 OID 16561)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 4717 (class 2606 OID 16654)
-- Name: application application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 16597)
-- Name: candidat candidat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat
    ADD CONSTRAINT candidat_pkey PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 16623)
-- Name: candidateskills candidateskills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidateskills
    ADD CONSTRAINT candidateskills_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 16611)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 16642)
-- Name: offer offer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT offer_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 16671)
-- Name: offerskill offerskill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerskill
    ADD CONSTRAINT offerskill_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 16570)
-- Name: skills skills_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_name_key UNIQUE (name);


--
-- TOC entry 4699 (class 2606 OID 16568)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 16579)
-- Name: token_blocklist token_blocklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blocklist
    ADD CONSTRAINT token_blocklist_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 16581)
-- Name: token_blocklist token_blocklist_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blocklist
    ADD CONSTRAINT token_blocklist_token_key UNIQUE (token);


--
-- TOC entry 4705 (class 2606 OID 16590)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4707 (class 2606 OID 16588)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 16655)
-- Name: application application_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidat(id);


--
-- TOC entry 4726 (class 2606 OID 16660)
-- Name: application application_job_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_job_offer_id_fkey FOREIGN KEY (job_offer_id) REFERENCES public.offer(id);


--
-- TOC entry 4720 (class 2606 OID 16598)
-- Name: candidat candidat_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat
    ADD CONSTRAINT candidat_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4722 (class 2606 OID 16624)
-- Name: candidateskills candidateskills_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidateskills
    ADD CONSTRAINT candidateskills_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidat(id);


--
-- TOC entry 4723 (class 2606 OID 16629)
-- Name: candidateskills candidateskills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidateskills
    ADD CONSTRAINT candidateskills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id);


--
-- TOC entry 4721 (class 2606 OID 16612)
-- Name: company company_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4724 (class 2606 OID 16643)
-- Name: offer offer_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT offer_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- TOC entry 4727 (class 2606 OID 16672)
-- Name: offerskill offerskill_job_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerskill
    ADD CONSTRAINT offerskill_job_offer_id_fkey FOREIGN KEY (job_offer_id) REFERENCES public.offer(id);


--
-- TOC entry 4728 (class 2606 OID 16677)
-- Name: offerskill offerskill_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerskill
    ADD CONSTRAINT offerskill_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id);


-- Completed on 2025-05-26 10:36:11

--
-- PostgreSQL database dump complete
--

