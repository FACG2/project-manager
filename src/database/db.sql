BEGIN;

CREATE TABLE references_table(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL
);

CREATE TABLE projects(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  state VARCHAR(100) NOT NULL
);

CREATE TABLE tasks(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  reference_id INTEGER REFERENCES references_table(id),
  state VARCHAR(100) NOT NULL,
  project_id INTEGER REFERENCES projects(id)
);


CREATE TABLE teams(
  ID SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description'
);

CREATE TABLE memebers(
  ID SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  bio TEXT DEFAULT 'No Bio',
  pic VARCHAR(200) NOT NULL,
  github_link VARCHAR(200) NOT NULL
);



CREATE TABLE teams_members(
  team_id INTEGER REFERENCES teams(id),
  member_id INTEGER REFERENCES memebers(id)
);


CREATE TABLE members_projects(
  project_id INTEGER REFERENCES projects(id),
  member_id INTEGER REFERENCES memebers(id)
);

COMMIT;
