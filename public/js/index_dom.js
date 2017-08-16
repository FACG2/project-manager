(function() {
  const teamsDiv = document.getElementsByClassName('teams')[0];
  const mainTitleDiv = document.getElementsByClassName('mainTitle')[0]
  apiReq('/getData', 'GET', function(err,data) {
    if (!err) {
      teamsDiv.innerHTML = generateTeams(data)
    }else{
      mainTitleDiv.innerHTML = data;
    }

  });
})();

function generateTeams(teamsArray) {
  return teamsArray.reduce(function(res,team) {
     res += '<section class="teamSec">'+
                '<h2>'+team.name+'</h2>'+
                '<h5>'+team.description+'</h5>'+
                '<ul>';
    res += team.members.reduce(function(res2, member){
      return res2 += '<li><a href="/mem'+member.id+'"><img src="'+member.pic+'" alt="'+member.name+'"></a></li>';
    },"")
    res    += '</ul>'+
            '</section>';
  },"")
}
