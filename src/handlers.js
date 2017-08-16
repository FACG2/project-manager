const fs = require('fs');
const getData = require('./queries/generic');
const queryString = require('querystring');
const request = require('./request');

const contentTypes = {
  css: 'text/css',
  js: 'application/js',
  ico: 'image/x-icon',
  html: 'text/html'
}


/*
  We use GET when we want to send data
  we use POST when we want to recieve data
  we use PUT when we want to UPDATE data
  we use DELETE when we want to Delete data
*/


// GET
function handleHome(req, res){
  fs.readFile(__dirname + '/../public/index.html', (err, data) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'text/plain'});
      res.end('something went wrong in home page');
    }else{
      res.writeHead(200 , {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

// POST request
function handleAddTeam(req, res){
  let content = '';
  req.on('data' , (chunk) => {
    content += chunk;
  });

  req.on('end' , () => {
    const data = queryString.parse(content);
    const query = `INSERT INTO teams(name , description) VALUES('${data.name}' , '${data.description}');`;
    getData(query , (err, result)=>{
      if(err){
        res.writeHead(500 , {'Content-Type': 'application/json'});
        res.end(JSON.stringify([{ message: 'internal server error ,,, in addteam Route'}]));
      }
      else{
        res.writeHead(200 , {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleTeams(req, res){
  let teamID = req.url.slice(3);
  const query = `SELECT * FROM teams WHERE id = ${Number(teamID)}`;
  getData(query , (err, result) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'application/json'});
      res.end(JSON.strigify([{message: 'Team not found'}]));
    }
    else{
      let ids = res.map((obj) => {
        return {id: obj.id , name: obj.name , description: obj.description};
      });
      ids.map((team) => {
        team.projects = [];
        team.members = [];
        getData(`SELECT id , title , description , state FROM projects WHERE team_id=${team.id}` , (err , projectsRes) => {
          if(err){
            console.log('in projects query' , err);
          }
          else{
            team.projects = projectsRes;
            getData(`SELECT member_id , memebers.name FROM teams_members INNER JOIN memebers ON memebers.id = teams_members.member_id WHERE team_id=${team.id}` , (err , membersRes) => {
              if(err){
                console.log('member query error' , err);
              }
              else{
                team.members = membersRes;
                res.writeHead(200 , {'Content-Type': 'application/json'});
                res.end(JSON.stringify(team));
              }
            });
          }
        });
      });
    }
  });

}


function handleMembers(req, res){
  let memberID = req.url.slice(4);
  const query = `SELECT * FROM memebers WHERE id = '${Number(memberID)}'`;
  getData(query , (err, result)=> {
    if(err){
      res.writeHead(500 , {'Content-Type': 'text/plain'});
      res.end(JSON.strigify([{message: 'something went wrong in handleMembers'}]));
    }
    else{
      res.writeHead(200 , {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    }
  });
}

function handleAddMember(req, res){
  let content = '';
  req.on('data',(shunk)=>{
    content += shunk;
  });

  req.on('end',()=>{
    // const data = querystring.parse(content);
    const data = request(queryString.parse(content).username);
    const query = `INSERT INTO members(name , bio , pic , github_link) VALUES('${data.name}' , '${data.bio}' , '${data.pic}' , '${data.github_link}');`;
    getData(query,(err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end([{message: 'Internal Server Error .... AddMember Route' }]);
      }
      else{
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleDeleteMemeber(req, res){
  let content = '';
  req.on('data',(shunk)=>{
    content += shunk;
  });

  req.on('end',()=>{
    const data = querystring.parse(content);
    const query = `DELETE FROM teams_members WHERE member_id = ${data.member_id}`
    getData(query ,(err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify([{message: 'Internal Server Error,,,, DeleteMember Route' }]));
      }
      else{
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleEditTeam(req, res){
  let content = '';
  res.on('data',(shunk)=>{
    content +=shunk;

  });
  res.on('end',()=>{
    const data = querystring.parse(content);
    const query = `UPDATE teams SET title = ${data.title} , description = ${data.description} WHERE id = ${data.id}`;
    getData( query , (err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'text/html'});
        res.end('internal server error ,,, in edit Team Route');
      }
      else{
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });

}

function handleDeleteTeam(req, res){
  let contet = '';
  res.on('data',(shunk)=>{
    content += shunk;

  });
  res.on('end',()=>{
    const data = querystring.parse(content);
    const query = `DELETE FROM teams WHERE id=${data.id}`;
    getData( query , (err,result)=> {
      if(err){
        res.writeHead(500,{'Content-Type':'text/html'});
        res.end('internal server error ,,, in delete Team Route');
      }
      else {
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });

}
/* my section */
function handleAddProject(req, res){

  let content = '';
  req.on('data' , (chunk) => {
    content += chunk;
  });

  // CREATE TABLE projects(
  //   ID SERIAL PRIMARY KEY NOT NULL,
  //   title VARCHAR(100) NOT NULL,
  //   description TEXT DEFAULT 'No Description',
  //   state VARCHAR(100) NOT NULL,
  //   team_id INTEGER REFERENCES teams(id) NOT NULL
  // );

  req.on('end' , () => {
    const data = queryString.parse(content);
    const query = `INSERT INTO projects(title , description , state) VALUES('${data.title}' , '${data.description}' , '${data.state}' , ${data.team_id})`;
    getData(query , (err, result)=>{
      if(err){
        res.writeHead(500 , {'Content-Type': 'text/html'});
        res.end('internal server error ,,, in add projects Route');
      }
      else{
        res.writeHead(200 , {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleEditProject(req, res){

  let content = '';
  req.on('data' , (chunk) => {
    content += chunk;
  });

  req.on('end' , () => {
    const data = queryString.parse(content);
    const query = `UPDATE projects SET title = '${data.title}' , description= '${data.description}' , state='${data.state}' , team_id=${data.team_id} WHERE id = ${data.project_id}`;
    getData(query , (err, result)=>{
      if(err){
        res.writeHead(500 , {'Content-Type': 'text/html'});
        res.end('internal server error ,,, in edit project Route');
      }
      else{
        res.writeHead(200 , {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });

}

function handleDeleteProject(req, res){
    let data = queryString.parse;
    getData(`DELETE FROM projects WHERE title = ${data.title}` , (err, result)=>{
        if(err){
          res.writeHead(500 , {'Content-Type': 'text/html'});
          res.end('internal server error ,,, in delete project Route');
        }
        else{
          res.writeHead(200 , {'Content-Type': 'application/json'});
          res.end(JSON.stringify(result));
        }
      });
    }

/* end of my section */

// incomplete handler
function handleProjectPlan(req, res){
  let planID = req.url.slice(3);
  const query = `SELECT * FROM `
  getData('SELECT * FROM  ...' , (err, result)=> {
    if(err){
      res.writeHead(500 , {'Content-Type': 'application/json'});
      res.end(JSON.strigify(JSON.stringify([{message: 'something went wrong in handleMembers'}])));
    }
    else{
      res.writeHead(200 , {'Content-Type': 'application.json'});
      res.end(JSON.stringify(result));
    }
  });
}

function handleAddTask(req, res){
  let content = '';
  req.on('data',(shunk) =>{
    content += shunk;
  });

  req.on('end',() =>{
    const data = querystring.parse(content);
    // const data = {
    //   title: 'title',
    //   description : 'description',
    //   reference_id: 8,
    //   state: 'in progress',
    //   project_id: 5
    // }
    const query = `INSERT INTO tasks(title, description , reference_id , state , project_id) VALUES('${data.title}' , '${data.description}' , ${data.reference_id} , '${data.state}' , ${data.project_id});`;
    getData(query,(err,result) =>{
      if(err){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify([{message: 'Internal Server Error ... in AddTask Route'}]));
      }
      else{
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });

}

function handleEditTask(req, res){
  let content = '';
  req.on('data',(shunk)=>{
    content += shunk;
  });
  req.on('end',()=>{
    const data = querystring.parse(content);
    // const data = {
    //   id: 6,
    //   title: 'new title',
    //   description : 'blah blah',
    //   reference_id: 8 ,
    //   state: 'blah',
    //   project_id: 5
    // }
    const query = `UPDATE tasks SET title='${data.title}' , description = '${data.description}' , reference_id=${data.reference_id} , state = '${data.state}' ,project_id=${data.project_id} WHERE id = ${data.id}`;
    getData( query ,(err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify([{message: 'Internal Server Error ... EditTask Route' }]));
      }
      else {
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleDeleteTask(req, res){
  let content = '';
  req.on('data',(shunk)=>{
    content += shunk;
  });
  req.on('end',()=>{
    const data = querystring.parse(content);
    // const taskID = 1;
    const query = `DELETE FROM tasks WHERE id = ${data.task_id}`;
    getData(query ,(err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify([{message: 'Internal Server Error ..... DeleteTask Route' }]));
      }
      else {
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });

}

function handleNotFound(req, res){
  fs.readFile(__dirname + '/../public/404.html', (err, data) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'text/html'});
      res.end('Oops!!, something went wrong');
    }
    else{
      res.writeHead(200 , {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleGeneric(req, res){
  fs.readFile(__dirname + "/../public" + req.url, (err, data) => {
    if(err){
      res.writeHead(302 , {'Location': '/404'});
      res.end();
    }
    else{
      let parts = req.url.split('.');
      let fileExtension = parts[parts.length - 1];
      res.writeHead(200 , {'Content-Type': contentTypes[fileExtension]});
      res.end(data);
    }
  });
}

function handleGetData(req,res){

  const query = `SELECT  teams.name AS team_name, teams.id  AS team_id, teams.description, memebers.id ,memebers.id AS member_id , memebers.pic , memebers.name FROM teams_members
                 INNER JOIN memebers ON memebers.id = teams_members.member_id
                 INNER JOIN teams ON teams.id = teams_members.team_id;`;
  getData(query , (err, result) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'application/json'});
      res.end(JSON.stringify([{message: 'No Data Found'}]));
    }else{
      let temp=[];
      let newArr = result.reduce((acc , team) => {
        if(temp.includes(team.team_id)){
          acc[temp.indexOf(team.team_id)].members.push({id:team.member_id,name:team.member_name,pic:team.pic});
          // console.log(team.member_name);
        }else{
          acc.push({id:team.team_id ,name:team.team_name ,description:team.description, members:[{id:team.member_id,name:team.member_name,pic:team.pic}]});
          temp.push(team.team_id);
        }
        return acc;
      } , []);
      // console.log(newArr);
      res.writeHead(200 , {'Content-Type': 'application/json'});
      res.end(JSON.stringify(newArr));
    }
  })
}
// SELECT  teams.name, teams.id , teams.description, memebers.id , memebers.pic , memebers.name FROM teams_members INNER JOIN memebers ON memebers.id = teams_members.member_id INNER JOIN teams ON teams.id = teams_members.team_id

module.exports = {
  handleHome,
  handleAddTeam,
  handleTeams,
  handleMembers,
  handleAddMember,
  handleDeleteMemeber,
  handleEditTeam,
  handleDeleteTeam,
  handleAddProject,
  handleEditProject,
  handleDeleteProject,
  handleProjectPlan,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleNotFound,
  handleGetData,
  handleGeneric
}
