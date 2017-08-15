BEGIN;

-- insert
INSERT INTO references_table(title , color) VALUES
            ('bug', 'rgb(255, 0, 0)'),
            ('feature' , 'rgb(0 ,255 ,0)'),
            ('enhancement' , 'rgb(0 ,0 ,255)');

INSERT INTO projects(title , description , state) VALUES
            ('project1' , 'This is test description for project1' , 'on hold'),
            ('project2' , 'This is test description for project2' , 'in progress'),
            ('project3' , 'This is test description for project3' , 'completed');

INSERT INTO tasks(title , description , reference_id , state , project_id) VALUES
            ('task1' , 'This is task1 description' , 9 , 'on hold' , 5),
            ('task2' , 'This is task2 description' , 8 , 'in progress' , 5),
            ('task3' , 'This is task3 description' , 8 , 'test' , 5),
            ('task4' , 'This is task4 description' , 7 , 'test fail' , 5),
            ('task5' , 'This is task5 description' , 9 , 'done', 5),
            ('task1' , 'This is task1 description' , 7 , 'on hold' , 6),
            ('task2' , 'This is task2 description' , 8 , 'in progress' , 6),
            ('task3' , 'This is task3 description' , 9 , 'done' , 6),
            ('task1' , 'This is task1 description' , 7 , 'on hold' , 7),
            ('task2' , 'This is task2 description' , 8 , 'in progress' , 7),
            ('task3' , 'This is task3 description' , 9 , 'done' , 7);

INSERT INTO teams(name , description) VALUES
            ('team1' , 'This is test description'),
            ('team2' , 'This is test description'),
            ('team3' , 'This is test description');

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
            (5 , 1),
            (6 , 1),
            (5 , 7),
            (6 , 4),
            (7 , 9),
            (7 , 8);


COMMIT;
