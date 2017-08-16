// const dbConnection = require('./database/db_connection');
const getData = require('./queries/generic');


function test(query , cb){
  let obj = {};
  // const query = `SELECT teams.id AS team_id, teams.name AS team_name , teams.description AS team_description
  //                 , memebers.name AS member_name ,
  //                 projects.id AS project_id , projects.title AS project_name , projects.state AS project_state FROM teams_members
  //                 INNER JOIN memebers ON memebers.id = teams_members.member_id
  //                 INNER JOIN teams ON teams.id = teams_members.team_id
  //                 INNER JOIN projects ON projects.team_id = teams.id;`;
  // const query =
  getData(query , (err, res)=>{
      if(err){
        cb(err);
      }else{
        cb(null , res);
      }
    });
  }


test('SELECT DISTINCT id , name , description FROM teams', (err, res) => {
  if(err){
    console.log(err);
  }
  else{
    let ids = res.map((obj) => {
      return {id: obj.id , name: obj.name , description: obj.description};
    });
    ids.map((team) => {
      team.projects = [];
      team.members = [];
      test(`SELECT id , title , description , state FROM projects WHERE team_id=${team.id}` , (err , projectsRes) => {
        if(err){
          console.log('in projects query' , err);
        }
        else{
          team.projects = projectsRes;
          test(`SELECT member_id , memebers.name FROM teams_members INNER JOIN memebers ON memebers.id = teams_members.member_id WHERE team_id=${team.id}` , (err , membersRes) => {
            if(err){
              console.log('member query error' , err);
            }
            else{
              team.members = membersRes;
              console.log(team);
            }
          });
        }
      });
    });
  }
});


  //
  // test((err, res) =>{
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     let temp=[];
  //     let temp2 = [];
  //     // console.log(res);
  //     let walid = res.reduce((resulta, key)=>{
  //        resulta.push(key.team_id);
  //        return resulta;
  //     },[]);
  //     let myArray = walid.filter(function(item, pos) {
  //       return walid.indexOf(item) == pos;
  //     })
  //       myArray.forEach((myId)=>{
  //         res.forEach((team)=>{
  //           if(myId == team.team_id){
  //             if (team.members.includes()) {
  //
  //             }
  //           }else{
  //             acc.push({id:team.team_id ,name:team.team_name ,description:team.description, members:[team.member_name] , projects: [{id: team.project_id , title: team.project_name , state: team.project_state}]});
  //           }
  //         });
  //
  //
  //     },[])
  //     // console.log(uniqueArray);
  //     let newArr = res.reduce((acc , team) => {
  //       if(temp.includes(team.team_id)){
  //         if (temp2.includes(team.member_id)) {
  //           acc[temp2.indexOf(team.member_id)].projects.push({id: team.project_id , title: team.project_name , state: team.project_state});
  //         }else{
  //           acc[temp.indexOf(team.team_id)].members.push(team.member_name);
  //           temp2.push(team.member_id);
  //         }
  //         // console.log(team.member_name);
  //       }else{
  //         acc.push({id:team.team_id ,name:team.team_name ,description:team.description, members:[team.member_name] , projects: [{id: team.project_id , title: team.project_name , state: team.project_state}]});
  //         temp.push(team.team_id);
  //         // temp2.push(team.member_id);
  //       }
  //       // if(temp2.includes(team.team_id)){
  //       //   acc[temp2.indexOf(team.team_id)].push({id: team.project_id , title: team.project_name , state: team.project_state});
  //       // }else{
  //       //   acc.push({id:team.team_id , name: team.team_name , description: team.description , projects:[{id: team.project_id , title: team.project_name , state: team.project_state}]});
  //       //   temp2.push(team.team_id);
  //       // }
  //       return acc;
  //     } , []);
  //     // console.log(newArr[0]);
  //     return newArr;
  //   }
  // });

// test((err, res) =>{
//   if(err){
//     console.log(err);
//   }
//   else{
//     let temp=[];
//     let newArr = res.reduce((acc , team) => {
//       if(temp.includes(team.team_id)){
//         acc[temp.indexOf(team.team_id)].members.push({id:team.member_id,name:team.member_name,pic:team.pic});
//         // console.log(team.member_name);
//       }else{
//         acc.push({id:team.team_id ,name:team.team_name ,description:team.description, members:[{id:team.member_id,name:team.member_name,pic:team.pic}]});
//         temp.push(team.team_id);
//       }
//       return acc;
//     } , []);
//     console.log(newArr[0]);
//     return newArr;
//   }
// });
