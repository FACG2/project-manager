const dbConnection = require('../database/db_connection');

module.exports = (sqlQuery , callback) => {
  dbConnection.query(sqlQuery , (err, res) => {
    if(err){
      callback(err);
    }
    else{
      callback(null , res.rows);
    }
  });
}
