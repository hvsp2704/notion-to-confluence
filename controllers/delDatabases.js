const connection = require('../connection');
const fun = ()=>{
    var sql = "DELETE FROM Internship_Task.Databases;"
    connection.execute(sql,function (err,result){
        if(err) throw err;
    })
    return 0;
}
module.exports = fun;