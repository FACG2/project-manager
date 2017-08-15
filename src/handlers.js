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
  res.on('data' , (chunk) => {
    content += chunk;
  });

  res.on('end' , () => {
    const data = queryString.parse(content);
    // github.com/samer?name=samer&age=20
    // ==> {name: samer , age: 20}
    getData("INSERT INTO teams() VALUES() RETURNING .." , (err, result)=>{
      if(err){
        res.writeHead(500 , {'Content-Type': 'text/html'});
        res.end('internal server error ,,, in addteam Route');
      }
      else{
        res.writeHead(200 , {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    });
  });
}

function handleTeams(req, res){

}


function handleMembers(req, res){

}

function handleAddMember(req, res){

}

function handleDeleteMemeber(req, res){

}

function handleEditTeam(req, res){

}

function handleDeleteTeam(req, res){

}

function handleAddProject(req, res){

}

function handleEditProject(req, res){

}

function handleDeleteProject(req, res){

}


function handleProjectPlan(req, res){

}

function handleAddTask(req, res){

}

function handleEditTask(req, res){

}

function handleDeleteTask(req, res){

}

function handleNotFound(req, res){

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
