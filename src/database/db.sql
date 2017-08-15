BEGIN;

CREATE TABLE tasks(
  ID PRIMARY KEY SERIAL NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  reference_id INTEGER REFERENCES references_table(id),
  state VARCHAR(100) NOT NULL,
  project_id INTEGER REFERENCES projects(id)
);

CREATE TABLE references_table(
  ID PRIMARY KEY SERIAL NOT NULL,
  title VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL
);

CREATE TABLE teams(
  ID PRIMARY KEY SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description'
);

CREATE TABLE memebers(
  ID PRIMARY KEY SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  bio TEXT DEFAULT 'No Bio',
  pic VARCHAR(200) NOT NULL,
  github_link VARCHAR(200) NOT NULL
);

CREATE TABLE projects(
  ID PRIMARY KEY SERIAL NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  state VARCHAR(100) NOT NULL
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
