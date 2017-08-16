const fs = require('fs');
const getData = require('./queries/generic');
const queryString = require('querystring');

const contentTypes = {
  css: 'text/css',
  js: 'application/js',
  ico: 'image/x-icon'
}


/*
  We use GET when we want to send data
  we use POST when we want to recieve data
  we use PUT when we want to UPDATE data
  we use DELETE when we want to Delete data
*/


// GET
function handleHome(req, res){
  fs.readFile(__dirname + '../public/index.html', (err, data) => {
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
    // const data = queryString.parse(content);
    // github.com/samer?name=samer&age=20
    // ==> {name: samer , age: 20}
    const data = {
      name : 'any name',
      description: 'description'
    }
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
  // let teamID = req.url.split('/tm')[1];
  const query = `SELECT * FROM team WHERE id = ${Number(teamID)}`;
  getData(query , (err, result) => {
    if(err){
      res.writeHead(500 , {'Content-Type': 'application/json'});
      res.end(JSON.strigify([{message: 'Team not found'}]));
    }
    else{
      res.writeHead(200 , {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
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
    const data = {
      member_id: 1,
      project_id: 5
    }
    const query = `INSERT INTO teams_members(team_id , member_id) VALUES('${data.team_id}' , '${data.project_id}');`;
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
    // const data = querystring.parse(content);
    const member_id = 1;
    const query = `DELETE FROM teams_members WHERE member_id = ${member_id}`
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
    getData('UPDATE team SET title = value1, description = value2, ...WHERE condition ..',(err,result)=>{
      if(err){
        res.writeHead(500,{'Content-Type':'text/html'});
        res.end('internal server error ,,, in edit Team Route');
      }
      else{
        res.writeHead(200,{'application/json'});
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
    getData('DELETE FROM team WHERE ,,,,,',(err,result)=>{
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

  req.on('end' , () => {
    const data = queryString.parse(content);

    getData("INSERT INTO projects() VALUES() RETURNING .." , (err, result)=>{
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

    getData(" UPDATE projects SET title = value1, description = value2, ...WHERE condition .." ,
     (err, result)=>{
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
let project_title = '';
    getData(`DELETE FROM projects WHERE title = ${projects.title}` ,
       (err, result)=>{
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
    // const data = querystring.parse(content);
    const data = {
      title: 'title',
      description : 'description',
      reference_id: 8,
      state: 'in progress',
      project_id: 5
    }
    const query = `INSERT INTO tasks(title, description , reference_id , state , project_id) VALUES('${data.title}' , '${data.description}' , ${data.reference_id} , '${data.state}' , ${data.project_id});`;
    getData(query,(err.result) =>{
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
    // const data = querystring.parse(content);
    const data = {
      id: 6,
      title: 'new title',
      description : 'blah blah',
      reference_id: 8 ,
      state: 'blah',
      project_id: 5
    }
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
    // const data = querystring.parse(content);
    const taskID = 1;
    const query = `DELETE FROM tasks WHERE id = ${taskID}`;
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
  fs.readFile(__dirname + '../public/404.html', (err, data) => {
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

module.exports = {
  handleAddTeam: handleAddTeam,
  handleTeams: handleTeams,
  handleMembers: handleMembers,
  handleAddMember: handleAddMember,
  handleDeleteMemeber: handleDeleteMemeber,
  handleEditTeam: handleEditTeam,
  handleDeleteTeam: handleDeleteTeam,
  handleAddProject: handleAddProject,
  handleEditProject: handleEditProject,
  handleDeleteProject: handleDeleteProject,
  handleProjectPlan: handleProjectPlan,
  handleAddTask, handleAddTask,
  handleEditTask: handleEditTask,
  handleDeleteTask: handleDeleteTask,
  handleNotFound: handleNotFound
}
