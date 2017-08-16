// const dbConnection = require('./database/db_connection');
const getData = require('./queries/generic');


function test(cb){
  let obj = {};
  const query = `SELECT  teams.name AS team_name, teams.id AS team_id ,memebers.id AS member_id , teams.description , memebers.pic , memebers.name AS member_name FROM teams_members
                 INNER JOIN memebers ON memebers.id = teams_members.member_id
                 INNER JOIN teams ON teams.id = teams_members.team_id;`;
    getData(query , (err, res)=>{
      if(err){
        cb(err);
      }else{
        cb(null , res);
      }
    });
  }


test((err, res) =>{
  if(err){
    console.log(err);
  }
  else{
    let temp=[];
    let newArr = res.reduce((acc , team) => {
      if(temp.includes(team.team_id)){
        acc[temp.indexOf(team.team_id)].members.push({id:team.member_id,name:team.member_name,pic:team.pic});
        // console.log(team.member_name);
      }else{
        acc.push({id:team.team_id ,name:team.team_name ,description:team.description, members:[{id:team.member_id,name:team.member_name,pic:team.pic}]});
        temp.push(team.team_id);
      }
      return acc;
    } , []);
    console.log(newArr[0]);
    // console.log(temp);
    return newArr;
  }
});
