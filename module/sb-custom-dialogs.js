  export async function sb_custom_dialog_confirm(sTitle,sQuestion,answerOneCaption='Ok',answerTwoCaption='Cancel'){
    let dialog=new Promise((resolve,reject)=>{
      new Dialog({
        title: sTitle,
        content: '<p>' + sQuestion + '</p>' ,
        buttons: {
          ok: {
            icon:'<i class ="fas fa-check"></i>',
            label: answerOneCaption,            
            callback: () => {resolve(true)}
          },
          cancel: { 
            icon:'<i class ="fas fa-times"></i>',
            label: answerTwoCaption,            
            callback: () => {resolve(false)}
          }
        },
        default: "ok",
        close:  () => {resolve(false) }   
      }).render(true);             
    }); 
    let answer=await dialog;
    return answer;    
   }