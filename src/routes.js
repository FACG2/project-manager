const handlers = require("./handlers.js");

function router(req, res){
  let url = req.url;
  if (url === '/') {
    // home page
    handlers.handleHome(req,res);

  }else if (url === '/addteam' && req.method.toUpperCase() === 'POST') {
    //add team
    handlers.handleAddTeam(req, res);

  }else if (url.startsWith('/tm')) {
    // list teams
    if (req.method.toUpperCase() === 'POST') {
      handlers.handleTeams(req, res);
    }else{
      req.url = '/team.html';
      handlers.handleGeneric(req, res);
    }
  }else if (url.startsWith('/mem')) {
    // member profile
    if (req.method.toUpperCase() === 'POST') {
      handlers.handleMembers(req, res);
    }else{
      req.url = '/member.html';
      handlers.handleGeneric(req, res);
    }
  }else if (url === '/addmember' && req.method.toUpperCase() === 'POST') {
    //add member
    handlers.handleAddMember(req, res);

  }else if (url === '/deletemember' && req.method.toUpperCase() === 'POST') {
    // delete member with id sent in post
    handlers.handleDeleteMemeber(req, res);

  }else if (url === '/editteam' && req.method.toUpperCase() === 'POST') {
    // edit team with id sent in post
    handlers.handleEditTeam(req, res);

  }else if (url === '/deleteteam' && req.method.toUpperCase() === 'POST') {
    // delete team with id sent in post
    handlers.handleDeleteTeam(req ,res)

  }else if (url === '/addproject' && req.method.toUpperCase() === 'POST') {
    //add project
    handlers.handleAddProject(req, res);

  }else if (url === '/editproject' && req.method.toUpperCase() === 'POST') {
    //edit project
    handlers.handleEditProject(req, res);

  }else if (url === '/deleteproject' && req.method.toUpperCase() === 'POST') {
    //delete project
    handlers.handleDeleteProject(req , res);

  }else if (url.startsWith('/pj') && req.method.toUpperCase() === 'GET') {
    // get project plan page
    handlers.handleProjectPlan(req, res);

  } else if (url === '/addtask' && req.method.toUpperCase() === 'POST') {
    //add task
    handlers.handleAddTask(req, res);

  }else if (url === '/edittask' && req.method.toUpperCase() === 'POST') {
    //edit task
    handlers.handleEditTask(req, res);

  }else if (url === '/deletetask' && req.method.toUpperCase() === 'POST') {
    //delete task
    handlers.handleDeleteTask(req, res);

  }else if(url == '/404'){
    // handle not found page
    handlers.handleNotFound(req, res);
  }else{
    // handle generic requests
    handlers.handleGeneric(req, res);
  }
}

module.exports = router;

/*
'/' => home => teams
'/addteam' => POST
'/tm:id' => team profile
'/mem:id' =>member profile
'/addmember' => POST
'/deletemember' => POST
'/editteam' => POST
'/deleteteam' => POST
'/pj:id' =>project plan
'/addproject' => POST
'/editproject' => POST
'/deleteproject' => POST
'/addtask' => POST
'/edittask' => POST
'/deletetask' => POST
'/404'
'else' => generic handler
*/
