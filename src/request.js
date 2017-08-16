const request = require('request');
require('env2')('config.env');

function getFromGithubAPI(username , callback){
  const url = `https://api.github.com/users/${username}?access_token=${process.env.ACCESS_TOKEN}`;
  request( {url: url , headers: {'user-agent': 'nodejs'}} , (err, response , body) => {
    if(err){
      callback(err);
    }
    else{
      const allData = JSON.parse(body);
      const data = {
        name: allData.login,
        bio: allData.bio,
        pic: allData.avatar_url,
        github_link: allData.html_url
      }
      callback(null , data);
    }
  });
}


getFromGithubAPI('samerelaila' , (err, data) => {
  console.log(data);
});
