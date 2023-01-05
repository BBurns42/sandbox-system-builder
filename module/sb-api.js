const _system_id='sandbox';  // system true name(id)


// Usage: 
//    let api=game.system.api;
//    api.BuildActorTemplates();   
export class SandboxAPI {
  // ---------------------------------------------------------------- 
  // Initialize                                                       
  // ----------------------------------------------------------------     
  initialize() {   
      console.log("Sandbox | Initializing API");
      game.system.api={
        BuildActorTemplates,
        Actor_GetFromName,
        Actor_GetFromSheet,
        ActorSheet_GetFromActor,
        ActorSheet_Render,
        SheetInfo_GetFromSheetId
      };           
    
  }
}

// **************************************************************** 
// Macro:        BuildActorTemplates                                                    
// Description:  Build all actor templates.
//               Useful if the template does not show normally
// Parameters :  actortemplatename - optional, if set only this template will rebuild                               
// Example :     for building only the template named _PlayerCharacter
//               BuildActorTemplates('_PlayerCharacter');
//                      
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-12-16 1.0.0    Ramses800            Macro created.         
// **************************************************************** 
function BuildActorTemplates(actortemplatename=''){
  let actortemplates;
  if(actortemplatename==''){
    // get all actor templates
    actortemplates=game.actors.filter(y => y.type=="character" && y.system.istemplate==true);
  }
  else{
    // get specific actor
    actortemplates=game.actors.filter(y => y.type=="character" && y.system.istemplate==true && y.name==actortemplatename);
  }    
  if(actortemplates.length>0){ 
    // loop all actors
    actortemplates.forEach(function(actortemplate)  { 
      if(actortemplate!=null){
        
        ui.notifications.info('Building actor template '+ actortemplate.name )
        console.log('Building actor template '+ actortemplate.name )
        try{
          actortemplate.sheet.buildSheet();
          ui.notifications.info('Build complete for actor template '+ actortemplate.name )
        }
        catch(err){
          ui.notifications.error('Error building actor template ' + actortemplate.name);
          console.err('Error building actor template' + actortemplate.name);
          console.err(err);
        }
      }
    });    
  }
  else{
    ui.notifications.warn('No actor template found');
  }
    
}

//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                          Functions for getting Actor                          
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               

// ***************************************************************************** 
// Function:       Actor_GetFromName                                       
// Description:    Get actor with name 
// Version  
// Parameters:     name as string                
// Returns:        actor, returns null if not found                              
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Function created                      
// ***************************************************************************** 
function Actor_GetFromName(actorname){
  let actor;
  actor=game.actors.getName(actorname); 
  if(actor==null){
    ui.notifications.warn('Actor_GetFromName | No Actor found with name [' + actorname + ']');
  }
  return actor;
}

// ***************************************************************************** 
// Function:       Actor_GetFromSheet                 
// Parameters:     event            
// Return:         Returns the actor that called this macro from its Sandbox sheet
//                 If no actor found, it returns null. 
//                 This means generally that the macro have 
//                 been run from the hot bar
// ============================================================================= 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ------------------------------------
// 2021-11-30 1.0.0    Ramses800            Function created                          
// *****************************************************************************  
function Actor_GetFromSheet(event) {
  let returnactor;  
  let cp = event.composedPath();
  for (let key in cp) {
    if (cp.hasOwnProperty(key)) {
      if ((typeof (cp[key]) !== "undefined" && cp[key] !== null)) {
        if ((typeof (cp[key].classList) !== "undefined" && cp[key].classList !== null)) {
          if (cp[key].classList.contains('sandbox') && cp[key].classList.contains('sheet') && cp[key].classList.contains('actor')) {
            //console.log(cp[key].id);  //actor-MMwTr94GekOCihrC   or actor-MMwTr94GekOCihrC-6bX8wMQkdZ9OyOQa
            let sheetinfo=SheetInfo_GetFromSheetId(cp[key].id);
            if(sheetinfo.documentclass!=null && sheetinfo.documentid!=null){
              switch (sheetinfo.documentclass){
                case "Actor":
                  returnactor = game.actors.get(sheetinfo.documentid);
                  break;
                case "Token":
                  let token = canvas.tokens.placeables.find(y=>y.id==sheetinfo.documentid);
                  if (token != null) {
                    returnactor = token.actor;
                  }
                  break;
              }
            }
            // exit for loop, no need to look anymore
            break;
          }
        }
      }
    }
  }
  return returnactor;
}

//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                          Functions for Actor Sheets                          
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//  
function ActorSheet_GetFromActor(actor){
  let actorsheet;
  if(actor==null){
    ui.notifications.warn('ActorSheet_Render | No Actor data supplied');
  } else {
    actorsheet=actor.sheet;       
  } 
  return actorsheet;
}

function ActorSheet_Render(actorsheet){
  if(actorsheet==null){
    ui.notifications.warn('ActorSheet_Render | No Actor Sheet found');
  } else {
    actorsheet.render(true,{focus:true});
  }        
}


//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                                Support Functions                          
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function SheetInfo_GetFromSheetId(sheetid){         
  let sheetinfo={
    documentclass:null,
    sheetclass:null,
    documentid:null,
    sceneid:null,
    compendium_type:null,
    compendium_name:null
  };
  let substrings=sheetid.split("-");
  
  if(substrings.length>0){
    sheetinfo.sheetclass=substrings[0];
    switch (substrings[0]){
      case "gActorSheet":        
        if(substrings.length>1){
          switch (substrings[1]){
            case "Actor":
              // actor            :gActorSheet-Actor-8I8j7C8KRYY6zQSK
              if(substrings.length>2){
                sheetinfo.documentclass=substrings[1];
                sheetinfo.documentid=substrings[2];
              }
              break;
            case "Scene":
              // token actor      :gActorSheet-Scene-8VQZqtjzEgqqaPDK-Token-MPWjc8w15806WYt1
              if(substrings.length>4){
                sheetinfo.documentclass=substrings[3];
                sheetinfo.documentid=substrings[4];
                sheetinfo.sceneid=substrings[2];
              }
              break;
            case "Compendium":
              // compendium actor :gActorSheet-Compendium-world-monsters-PbY9XcLCKKGrlvtU              
              if(substrings.length>4){
                sheetinfo.documentclass=substrings[1];
                sheetinfo.documentid=substrings[4];
                sheetinfo.compendium_name=substrings[3];
                sheetinfo.compendium_type=substrings[2];
              }
              break;
          }
        }                  
        break;
      case "sItemSheet":                
        if(substrings.length>1){
          switch (substrings[1]){            
            case "Item":
              //sItemSheet-Item-Wif4h38I0OiNapG1
              if(substrings.length>2){
                sheetinfo.documentclass=substrings[1];
                sheetinfo.documentid=substrings[2];
              }
              break;
            case "Compendium":
              //sItemSheet-Compendium-world-equipment-OuRNFgwaueUsYhFh
              if(substrings.length>4){
                sheetinfo.documentclass=substrings[1];
                sheetinfo.documentid=substrings[4];
                sheetinfo.compendium_name=substrings[3];
                sheetinfo.compendium_type=substrings[2];
              }
              break;
          }
        }
        break;
    }             
  }          
  return sheetinfo;  
}