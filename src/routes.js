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
const handlers = require("./handlers.js");

function router(req, res){
  let url = req.url;
  if (url === '/') {

  }else if (url === '/addteam' && req.method.toUpperCase() === 'POST') {
    //add team
  }else if (url.startsWith('/tm') && req.method.toUpperCase() === 'GET') {
    // list teams
  }else if (url.startsWith('/mem') && req.method.toUpperCase() === 'GET') {
    // member profile
  }else if (url === '/addmember' && req.method.toUpperCase() === 'POST') {
    //add member
  }else if (url === '/deletemember' && req.method.toUpperCase() === 'POST') {
    // delete member with id sent in post
  }else if (url === '/editteam' && req.method.toUpperCase() === 'POST') {
    // edit team with id sent in post
  }else if (url === '/deleteteam' && req.method.toUpperCase() === 'POST') {
    // delete team with id sent in post
  }else if (url === '/addproject' && req.method.toUpperCase() === 'POST') {
    //add project
  }else if (url === '/editproject' && req.method.toUpperCase() === 'POST') {
    //edit project
  }else if (url === '/deleteproject' && req.method.toUpperCase() === 'POST') {
    //delete project
  }else if (url.startsWith('/pj') && req.method.toUpperCase() === 'GET') {
    // get project plan page
  }else if (url === '/addtask' && req.method.toUpperCase() === 'POST') {
    //add task
  }else if (url === '/edittask' && req.method.toUpperCase() === 'POST') {
    //edit task
  }else if (url === '/deletetask' && req.method.toUpperCase() === 'POST') {
    //delete task
  }else if(url == '/404'){
    handlers.handleNotFound(req, res);
  }else{
    handlers.handleGeneric(req, res);
  }
}

module.exports = router;
