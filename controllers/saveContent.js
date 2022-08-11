const getChildren = require('./getChildren');
const savePara = require('./savePara');

const fun = async (id)=>{
    const l = await getChildren(id);
    const arr = l.results;
    n = arr.length;
    for(var i = 0; i<n; i++){
        if (arr[i].paragraph.rich_text.length != 0){
            await savePara(arr[i]);
        }
            
    }

}

module.exports = fun;