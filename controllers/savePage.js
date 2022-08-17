const connection = require('../connection');
const unirest = require('unirest');
const fun = async (arr)=>{
    var ID = arr.id;
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/checkpg')
            .type('json')
            .send(
                {
                    "id" : `${ID}`
                }
            )
            .end(function (response) {
              if (response.error) {
                return reject(response.error)
              }
              return resolve(response.body);
            });
            })
          }

    const ver = await getToken();
    if (!ver){
      var str = (arr.parent.type);
      var ID = "";
      if (str == "database_id"){
        ID = arr.parent.database_id;
      }
      else{
        ID = arr.parent.workspace;
      }
      var sql = "INSERT INTO `Internship_Task`.`Page` (`ID`, `created_time`, `last_edited_time`, `created_by`, `cover`, `icon`, `parentType`,`parentID`, `archived`, `properties`) VALUES ('"+ arr.id +"', '"+arr.created_time+"', '"+arr.last_edited_time+"', '"+JSON.stringify(arr.created_by)+"', '"+JSON.stringify(arr.cover)+"', '"+JSON.stringify(arr.icon)+"', '"+arr.parent.type+"', '"+ID+"','"+arr.archived+"', '"+JSON.stringify(arr.properties)+"')";
      
      connection.execute(sql,function (err,result){
          if(err) throw err;   
      })
    };
}

module.exports = fun;