const fun = (arr)=>{
    var content = "<ul>"
    const n = arr.length;
    for(var i = 0 ; i<n;i++ ){
        if (arr[i].content.length == 0){
            content = content + "<li>" + arr[i].title + "</li>" ;
        }else{
            var con = ""
            var t = arr[i].content.length;
            for(var j = 0;j<t;j++){
                con = con + arr[i].content[j]+". ";
            }

            content = content + "<li>" + arr[i].title + ": " + con + "</li>" ;
        }
    }
    return content+"</ul>";
}

module.exports = fun;