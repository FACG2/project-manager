BEGIN;

DROP TABLE  IF EXISTS references_table cascade;
DROP TABLE  IF EXISTS projects cascade;
DROP TABLE  IF EXISTS tasks  cascade ;
DROP TABLE  IF EXISTS teams cascade;
DROP TABLE  IF EXISTS members cascade;
DROP TABLE  IF EXISTS teams_members cascade;
DROP TABLE  IF EXISTS members_projects cascade;


CREATE TABLE references_table(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL
);




CREATE TABLE teams(
  ID SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description'
);

CREATE TABLE projects(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  state VARCHAR(100) NOT NULL,
  team_id INTEGER REFERENCES teams(id) NOT NULL
);
CREATE TABLE tasks(
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT 'No Description',
  reference_id INTEGER REFERENCES references_table(id),
  state VARCHAR(100) NOT NULL,
  project_id INTEGER REFERENCES projects(id)
);


-- i edited memebers to members after I created this **** DB
CREATE TABLE members(
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

-- insert
INSERT INTO references_table(title , color) VALUES
            ('bug', 'rgb(255, 0, 0)'),
            ('feature' , 'rgb(0 ,255 ,0)'),
            ('enhancement' , 'rgb(0 ,0 ,255)');

INSERT INTO teams(name , description) VALUES
            ('team1' , 'This is test description'),
            ('team2' , 'This is test description'),
            ('team3' , 'This is test description');





INSERT INTO projects(title , description , state , team_id) VALUES
            ('project1' , 'This is test description for project1' , 'on hold' , 1),
            ('project2' , 'This is test description for project2' , 'in progress' , 2),
            ('project3' , 'This is test description for project3' , 'completed' , 3);

INSERT INTO tasks(title , description , reference_id , state , project_id) VALUES
            ('task1' , 'This is task1 description' , 3 , 'on hold' , 1),
            ('task2' , 'This is task2 description' , 2 , 'in progress' , 1),
            ('task3' , 'This is task3 description' , 2 , 'test' , 1),
            ('task4' , 'This is task4 description' , 1 , 'test fail' , 1),
            ('task5' , 'This is task5 description' , 3 , 'done', 1),
            ('task1' , 'This is task1 description' , 1 , 'on hold' , 2),
            ('task2' , 'This is task2 description' , 2 , 'in progress' , 2),
            ('task3' , 'This is task3 description' , 3 , 'done' , 2),
            ('task1' , 'This is task1 description' , 3 , 'on hold' , 3),
            ('task2' , 'This is task2 description' , 2 , 'in progress' , 3),
            ('task3' , 'This is task3 description' , 3 , 'done' , 3);

INSERT INTO memebers(name , bio , pic , github_link) VALUES
            ('member1' , 'This is bio1' , 'pic URL1' , 'github Link'),
            ('member2' , 'This is bio2' , 'pic URL2' , 'github Link'),
            ('member3' , 'This is bio3' , 'pic URL3' , 'github Link'),
            ('member4' , 'This is bio4' , 'pic URL4' , 'github Link'),
            ('member5' , 'This is bio5' , 'pic URL5' , 'github Link'),
            ('member6' , 'This is bio6' , 'pic URL6' , 'github Link'),
            ('member7' , 'This is bio7' , 'pic URL7' , 'github Link'),
            ('member8' , 'This is bio8' , 'pic URL8' , 'github Link'),
            ('member9' , 'This is bio9' , 'pic URL9' , 'github Link');

INSERT INTO teams_members(team_id , member_id) VALUES
            (1 , 1),
            (1 , 2),
            (1 , 3),
            (2 , 4),
            (2 , 5),
            (2 , 6),
            (3 , 7),
            (3 , 8),
            (3 , 9);


INSERT INTO members_projects(project_id , member_id) VALUES
            (1 , 1),
            (2 , 1),
            (1 , 7),
            (2 , 4),
            (3 , 9),
            (3 , 8);



COMMIT;
