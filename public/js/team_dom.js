(function() {
  const mainDiv = document.getElementsByClassName('main')[0];
  const teamSidebarDiv = document.getElementsByClassName('teamSidebar')[0];

  apiReq(window.location.pathname+'/getData', 'GET', function(err,data) {
    if (!err) {
      const deleteMemberI= document.querySelectorAll(' .deleteMember')
      /*Adding members in asside div*/
      document.querySelector('.teamSidebar h1').textContent=data.name;
      document.querySelector('.teamSidebar ul').innerHTML = generateMembersList(data.members);
      /*Even listener for delete member*/
      let deleteDivs = document.getElementsByClassName('deleteMember');
      deleteDivs = Array.from(deleteDivs);
      deleteDivs.forEach(function(deleteDiv){
        deleteDiv.addEventListener('click',function(){
          //delete pleaseeeeee
        })
      });
      /*Adding projects divs*/
      teamsDiv.innerHTML = generateProjects(data.projects);

    }else{
      mainDiv.innerHTML = '<h1>'+data+'</h1>';
    }
  });
})()

function generateProjects(projectsArray) {
  return projectsArray.reduce(function(res, project){
    res +='<div class="teamProjectDiv">'
            '<a href="'+window.location.origin+'/pj'+project.id+'"><h3>'+project.name+'</h3></a>'+
            '<h4>'+project.description+'</h4>'+
            '<p>'+project.status+'</p>'+
            '<ul>';
    res += project.members.reduce(function(res2 , member) {
      return res2 += '<li><a href="/mem'+member.id+'"><img src="'+member.pic+'" alt="'+member.name+'"></a></li>';
    })
    return res += '</ul></div>';
  },"")
}
function generateMembersList(membersArray) {
  let addMemberLi = '<li class="addNewMember"><i>Add new Member</i></li>';
  return membersArray.reduce(function(res, member) {
    return res += '<li><i class="deleteMember" id="'+member+'">DELETE</i> '+member+'</li>'
  },addMemberLi);// added membername as id to delete to delete user by username
}
/*
i need team = {
name , description ,
members => [names]
projects =>[{id,name,description,status,members[{id,pic,name}]}]
}
*/
