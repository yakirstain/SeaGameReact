import $ from "jquery";

const SQL_URL = 'http://192.168.43.72:49873/WebService.asmx';


export default class AJAX{

register(email , pass , user)
{
let paramObj = {
    email:email,
    pass:pass,
    user:user
}


return new Promise ( (resolve , reject)=> {
$.ajax({
url: SQL_URL + '/Register',
    dataType: 'json',
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(paramObj),
    error: (jqXHR, textStatus) => {
        reject(jqXHR);

    },
    success: (data) => {

        if (data.d>0) {
            data.d = JSON.parse(data.d);
            resolve(data.d);
        } else {
            reject("couldnt insert data");
        }
    }
})

})

}

    GetHighScore(){
    return new Promise( (resolve , reject)=> {
        $.ajax({
            url: SQL_URL + '/GetHighScore',
            dataType: 'json',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            error: (jqXHR, textStatus) => {
                reject("error");

            },
            success: (data) => {
                data.d = JSON.parse(data.d);
                 resolve(data.d);
            }

        });
    })
}

 Login(email , pass){
     
    let paramObj = {
        email: email,
        pass: pass
    }

return new Promise( (resolve , reject)=> {
    $.ajax({
        url: SQL_URL + '/Login',
        dataType: 'json',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(paramObj),
        error: (jqXHR, textStatus)=>{
            reject("error");
            
        },
        success: (data)=>{
        
        if(data.d !== 'null'){
            data.d = JSON.parse(data.d);
            resolve(data.d);
           }else{
              reject("email or username incorrect");
           }
        }
        
    });

})
}


UpdateScore(email , score){
    return new Promise( (resolve , reject)=> {
        $.ajax({
            url: SQL_URL + '/UpdateScore',
            dataType: 'json',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                email: email,
                newScore: score
            }),
            error: (jqXHR, textStatus)=>{
                reject("error");
                
            },
            success: (data)=>{
            
            if(data.d !== 'null'){
                data.d = JSON.parse(data.d);
                resolve(data.d);
               }
            }
            
        });
    
    })
}

}
