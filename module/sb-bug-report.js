export async function SBBugReport(){
  let sys_info = await getSysInfo();
  let api=game.system.api;  
  let game_world_info=await api.getGameWorldInfo();
  let game_world_info_txt=gameWorldInfoToTextArea(game_world_info);
  // -----------------------------------------------------------------------------
  //                     This macros main dialog HTML content
  // ----------------------------------------------------------------------------- 
  let labelwidth=115;
  let inputwidth=212;
  let modulewarning='';
  if(sys_info.activemodulescount>0){
    modulewarning=`<i title="Disable all modules and check if the problem persists" class="sb_bug_report_modulewarning fas fa-exclamation-circle"></i>`;
  }
  
  let saved_hosting_service     = game.user.getFlag('world','sb-bug-report-hosting-service');
  if(saved_hosting_service==null) saved_hosting_service="";
  let saved_actual_os     = game.user.getFlag('world','sb-bug-report-actual-os');
  if(saved_actual_os==null) saved_actual_os="";
  let saved_actual_client = game.user.getFlag('world','sb-bug-report-actual-client');
  if(saved_actual_client==null) saved_actual_client="";
  
  let saved_hosting_type=game.user.getFlag('world','sb-bug-report-hosting-type');
  let hosting_self="";
  let hosting_service="";
  if(saved_hosting_type!=null){
    if(saved_hosting_type=='Self-hosted'){
      hosting_self="checked";
    } else {
      hosting_service="checked";
    }
  }
  
  let html_content = `
    <!--macro custom styles-->
      <style>  
        .sb_bug_report_hbo:hover {cursor: pointer;box-shadow: 0 0 5px darkred;}
        .dialog .window-content textarea.sb_bug_report_text_area_game_world_info{font-family:monospace;}
        legend.sb_bug_report_legend {text-align:left !important;}
        label.sb_bug_report_label {min-width:115px;display: inline-block; }
        label.sb_bug_report_label_right_column {margin-left: 48px;}
        label.sb_bug_report_label_radio {min-width:100px;display: inline-block;}
        label.sb_bug_report_label_radio:hover {cursor: pointer;text-shadow: var(--sb-text-shadow-primary);}
        input[type="text"].sb_bug_report_text_input{width:212px;}
        input[type="text"].sb_bug_report_text_input_right_column{width:212px;}

        textarea.sb_bug_report_text_area_description{width:100%;border: 1px solid #7a7971; border-radius: 3px;}
        input[type="checkbox"].sb_bug_report_chk_incorrect_client{vertical-align: middle;        margin: 3px 0px 0px 15px;   }       
        label.sb_bug_report_invisible{color:rgba(0, 0, 0, 0)!important;}
        input[type="text"].sb_bug_report_invisible{color:rgba(0, 0, 0, 0)!important;background-color:rgba(0, 0, 0, 0)!important;border-style: none;}
        i.sb_bug_report_extrainfo{font-size: 16px;    margin: 0px 0px 0px 3px;    padding: 0px 0px 0px 0px;    vertical-align: middle;}
        i.sb_bug_report_modulewarning{color: red;    font-size: 21px;    margin: 0px 0px 0px 3px;    padding: 0px 0px 0px 0px;    vertical-align: middle;}
      </style>
    <form style="text-align: left;">
    <fieldset style="text-align: left;display:inline;width:49%">
      <legend class="sb_bug_report_legend">Foundry Information</legend> 
      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_foundry_version">Foundry Version</label>
      <input class="sb_bug_report_text_input" type="text" id="sb_bug_report_sys_info_foundry_version" name="sb_bug_report_sys_info_foundry_version" value="Foundry Virtual Tabletop `+ sys_info.foundryversion +`" disabled><br>     
      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_game_system_name">Game System</label>
      <input class="sb_bug_report_text_input" type="text" id="sb_bug_report_sys_info_game_system_name" name="sb_bug_report_sys_info_game_system_name" value="`+ sys_info.gamesystemtitle + ` ` + sys_info.gamesystemversion +`" disabled><br>   
      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_active_module_count">Active Modules<i class="fa-regular fa-circle-question" title="Required modules not counted"></i></label>
      <input class="sb_bug_report_text_input" style="width:60px;" type="text" id="sb_bug_report_sys_info_active_module_count" name="sb_bug_report_sys_info_active_module_count" value="`+sys_info.activemodulescount+`" disabled>`+ modulewarning + `      
    </fieldset>

    <fieldset style="text-align: left;display:inline;height: 110px;vertical-align: top;">
      <legend class="sb_bug_report_legend">Hosting Information</legend>   

      <input class="sb_bug_report_hbo" style="margin-left:0px;" type="radio" id="sb_bug_report_sys_info_self_hosted" name="sb_bug_report_sys_info_hosting" value="Self-hosted" ${hosting_self}>
      <label class="sb_bug_report_label_radio" for="sb_bug_report_sys_info_self_hosted">Self-hosted</label><br>

      <input class="sb_bug_report_hbo" style="margin-left:0px;" type="radio" id="sb_bug_report_sys_info_hostingservice" name="sb_bug_report_sys_info_hosting" value="Hosting Service" ${hosting_service}>    
      <label class="sb_bug_report_label_radio" for="sb_bug_report_sys_info_hostingservice">Hosting Service</label>                


      <input class="sb_bug_report_text_input" style="margin-left: 10px;" type="text" id="sb_bug_report_sys_info_hosting_service" name="sb_bug_report_sys_info_hosting_service" value="${saved_hosting_service}">
    </fieldset>

    <fieldset style="text-align: left;">
      <legend class="sb_bug_report_legend">Client Information</legend>
      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_os">Operating System</label>
      <input class="sb_bug_report_text_input" type="text" id="sb_bug_report_sys_info_os" name="sb_bug_report_sys_info_os" value="` + sys_info.os + ` `  + sys_info.osVersion + `" disabled >

      <label class="sb_bug_report_label sb_bug_report_label_right_column sb_bug_report_invisible" name="sb_bug_report_sys_info_os_name_corrected_label" for="sb_bug_report_sys_info_os_name_corrected" disabled>Actual OS used</label>
      <input class="sb_bug_report_text_input sb_bug_report_invisible" type="text" id="sb_bug_report_sys_info_os_name_corrected" name="sb_bug_report_sys_info_os_name_corrected" value="${saved_actual_os}" disabled>
  
      <br>

      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_client_name">Desktop Client</label>
      <input class="sb_bug_report_text_input" type="text" id="sb_bug_report_sys_info_client_name" name="sb_bug_report_sys_info_client_name" value="` + sys_info.browser + ` ` + sys_info.browserVersion + `" disabled>
      
      <label class="sb_bug_report_label sb_bug_report_label_right_column sb_bug_report_invisible" name="sb_bug_report_sys_info_client_name_corrected_label" for="sb_bug_report_sys_info_client_name_corrected" disabled>Actual client used</label>
      <input class="sb_bug_report_text_input sb_bug_report_invisible" type="text" id="sb_bug_report_sys_info_client_name_corrected" name="sb_bug_report_sys_info_client_name_corrected" value="${saved_actual_client}" disabled>
      

      <label class="sb_bug_report_label" for="sb_bug_report_sys_info_client_name_not_correct"> Detected operating system/client is incorrect <i title="Some browser identify themselves as another browser, this can be on purpose or not. &#013;&#010;This client provided the following User Agent string: &#013;&#010; ${sys_info.useragent}" class="sb_bug_report_extrainfo far fa-question-circle"></i></label>
      <input class="sb_bug_report_hbo sb_bug_report_chk_incorrect_client" type="checkbox" id="sb_bug_report_sys_info_client_name_not_correct" name="sb_bug_report_sys_info_client_name_not_correct" onclick="sb_bug_report_toggle_display()" value="">

  </fieldset>

    <fieldset style="text-align: left;">
      <legend class="sb_bug_report_legend">Bug Information</legend> 
      <label class="sb_bug_report_label" for="sb_bug_report_subject">Subject:</label><br>
      <input style="width:100%;" type="text" id="sb_bug_report_subject" name="sb_bug_report_subject" value=""><br>
      <label class="sb_bug_report_label" for="sb_bug_report_description">Description:</label><br>
      <textarea class="sb_bug_report_text_area_description" id="sb_bug_report_description" name="sb_bug_report_description" rows="10" cols="50"></textarea>
    </fieldset>
    <fieldset style="text-align: left;">
      <legend class="sb_bug_report_legend">Game World Information</legend> 
      <textarea readonly class="sb_bug_report_text_area_game_world_info" id="sb_bug_report_game_world_info" name="sb_bug_report_game_world_info" rows="11" cols="40">`+game_world_info_txt+`</textarea>
    </fieldset>  
    </form>

    <br>

    <button id="sb_bug_report_btnCopy" style="width:32%;cursor:pointer;"  onclick="sb_bug_report_copyBugReport(false)" title="Copy Bug Report as text to Clipboard"><i class ="fas fa-copy"></i>Copy</button>
    <button id="sb_bug_report_btnCopyForDiscord" style="width:32%;cursor:pointer;"  onclick="sb_bug_report_copyBugReport(true)" title="Copy Bug Report as Discord formatted text to Clipboard"><i class ="fab fa-discord"></i>Copy with Discord formatting</button>

    <button id="sb_bug_report_btnCloseThisDialog" style="width:32%;cursor:pointer;"  onclick="sb_bug_report_closethisdialog()" title="Close this dialog"><i class ="fas fa-window-close"></i>Close</button>
    <!--Hidden marker element used to detect if dialog is loaded-->
    <input type="hidden" id="sb_bug_report_appId" value="-1"> 

    <script>
    function sb_bug_report_toggle_display(){
      // for os
      let element=document.querySelector('input[name="sb_bug_report_sys_info_os_name_corrected"]');      
      element.classList.toggle("sb_bug_report_invisible");
      element.toggleAttribute("disabled");
      // the label
      element=document.querySelector('label[name="sb_bug_report_sys_info_os_name_corrected_label"]');
      element.classList.toggle("sb_bug_report_invisible");
      // for client
      element=document.querySelector('input[name="sb_bug_report_sys_info_client_name_corrected"]');      
      element.classList.toggle("sb_bug_report_invisible");
      element.toggleAttribute("disabled");
      // the label
      element=document.querySelector('label[name="sb_bug_report_sys_info_client_name_corrected_label"]');
      element.classList.toggle("sb_bug_report_invisible");
  
  
  
    }  

    function sb_bug_report_copyBugReport(discordformatting=false){
      let sBugReport='';
      // validate inputs
      let valid_input=true;
      let hosting_answer = document.querySelector('input[name="sb_bug_report_sys_info_hosting"]:checked');

      if(hosting_answer==null){
        ui.notifications.warn('No hosting selected');
        valid_input=false;
      }

      if(valid_input){
        let activemodulecount=document.querySelector('input[name="sb_bug_report_sys_info_active_module_count"]').value;
        let moduletext='';
        if (activemodulecount==0){
          moduletext='TRUE';
        }
        else{
          moduletext='FALSE - '+ activemodulecount +' active modules';
        }
        let hostingtext='';
        if(hosting_answer.value=='Self-hosted'){
          hostingtext='Self-hosted';
        }
        else{
          hostingtext='Hosting service';
          let hosting_service=document.querySelector('input[name="sb_bug_report_sys_info_hosting_service"]').value;
          if(hosting_service.length>0){
            hostingtext += ' - '+ hosting_service + ''; 
          }
        }

        let clientincorrect = document.querySelector('input[name="sb_bug_report_sys_info_client_name_not_correct"]');        

        let ostext=document.querySelector('input[name="sb_bug_report_sys_info_os"]').value;
        let actualos=document.querySelector('input[name="sb_bug_report_sys_info_os_name_corrected"]').value;
        if(actualos!="" && clientincorrect.checked){
          ostext=actualos;
        }

        let clienttext=document.querySelector('input[name="sb_bug_report_sys_info_client_name"]').value;
        let actualclient=document.querySelector('input[name="sb_bug_report_sys_info_client_name_corrected"]').value;
        
        if(actualclient!="" && clientincorrect.checked){
          clienttext=actualclient;
        }
        

        // assemble report
        let headersuffix='';
        let headerprefix='';
        if (discordformatting){
          headersuffix='\`';
          headerprefix='\`';
        }
        sBugReport  =headerprefix + 'ALL MODULES DISABLED    :'+ headersuffix + ' ' + moduletext + '\\n';
        sBugReport +=headerprefix + 'FOUNDRY VERSION         :'+ headersuffix + ' ' + document.querySelector('input[name="sb_bug_report_sys_info_foundry_version"]').value + '\\n';
        sBugReport +=headerprefix + 'GAME SYSTEM             :'+ headersuffix + ' ' + document.querySelector('input[name="sb_bug_report_sys_info_game_system_name"]').value+ '\\n';
        sBugReport +=headerprefix + 'CLIENT OPERATING SYSTEM :'+ headersuffix + ' ' + ostext + '\\n';      
        sBugReport +=headerprefix + 'CLIENT BROWSER          :'+ headersuffix + ' ' + clienttext+ '\\n';
        sBugReport +=headerprefix + 'HOSTING                 :'+ headersuffix + ' ' + hostingtext+ '\\n\\n';
        sBugReport +=headerprefix + 'SUBJECT/TITLE            '+ headersuffix + ' \\n' + document.querySelector('input[name="sb_bug_report_subject"]').value+ '\\n\\n';
        sBugReport +=headerprefix + 'DESCRIPTION              '+ headersuffix + ' \\n' + document.querySelector('textarea[name="sb_bug_report_description"]').value+ '\\n';
        sBugReport +=headerprefix + 'GAME WORLD INFO          '+ headersuffix + ' \\n' + headerprefix + document.querySelector('textarea[name="sb_bug_report_game_world_info"]').value+ headersuffix +'\\n';
        navigator.clipboard.writeText(sBugReport);
        ui.notifications.info('Bug report copied to Clipboard');
      }
    }  
    </script> 

    <script>
      async function sb_bug_report_closethisdialog(){     
        let appId_element=document.getElementById('sb_bug_report_appId'); 
        if (appId_element!=null){            
          let appId=appId_element.getAttribute('value');
          if (appId!=null){ 
            let app=ui.windows[appId];
            if (app!=null){
              
  
              
              app.close();             
            }
          }
        }      
      }
    </script>

  `;
  // -----------------------------------------------------------------------------
  //                          HTML dialog content completed
  // -----------------------------------------------------------------------------
  // check if this macro dialog is already loaded 
  let appId_element=document.getElementById(`sb_bug_report_appId`); 
  if (appId_element!=null){
    // already loaded    
    let appId=appId_element.getAttribute('value');
    if (appId!=null){ 
      let app=ui.windows[appId];
      if (app!=null){    
        // attempt to bring to the front
        app.bringToTop(); 
        // and trigger refresh content button(if applicable)
        let elem = document.getElementById(`sb_bug_report_btnRefresh`);
        if (elem!=null){
          if (typeof elem.onclick == "function") {
            elem.onclick.apply(elem);
          }               
        }
      }
    }
  }
  else{
    // show it as dialog, after render update hidden id
    let d = new Dialog({
      title: `${game.system.title} Bug Report`,
      content: html_content,
      buttons: {},        
      render: html => document.getElementById(`sb_bug_report_appId`).setAttribute('value', d.appId),
      close: async function(){
        // save to user flags
        // save corrected entries to user flag  
        let clientincorrect = document.querySelector('input[name="sb_bug_report_sys_info_client_name_not_correct"]');                      
        let actualos=document.querySelector('input[name="sb_bug_report_sys_info_os_name_corrected"]').value;
        if(clientincorrect.checked){                
          await game.user.setFlag('world','sb-bug-report-actual-os',actualos);
        }

        let actualclient=document.querySelector('input[name="sb_bug_report_sys_info_client_name_corrected"]').value;
        if(clientincorrect.checked){                
          await game.user.setFlag('world','sb-bug-report-actual-client',actualclient);
        }
        
        let hosting_answer = document.querySelector('input[name="sb_bug_report_sys_info_hosting"]:checked');
        let hosting_type='';
        if(hosting_answer!=null){
          if(hosting_answer.value=='Self-hosted'){
            hosting_type='Self-hosted';
          }
          else{
            hosting_type='Service';
          }
          await game.user.setFlag('world','sb-bug-report-hosting-type',hosting_type);
        }
        
        
        let hosting_service=document.querySelector('input[name="sb_bug_report_sys_info_hosting_service"]').value;                 
        await game.user.setFlag('world','sb-bug-report-hosting-service',hosting_service);
        
      }
    });
    d.options.width = 768;
    d.position.width = 768;
    d.options.resizable=false;
    d.options.closeOnEscape= true;
    d.render(true);        
  }      
}

function gameWorldInfoToTextArea(gameworldinfo){
  let content='';
  
  content = buildRow('','Game','Compendium','','Game','Compendium');
  content += buildRow('Actors','','','Items','','');
  content += buildRow('Total',gameworldinfo.game.actors.total,gameworldinfo.compendium.actors.total,'Total',gameworldinfo.game.items.total,gameworldinfo.compendium.items.total);
  content += buildRow('Actors',gameworldinfo.game.actors.actors,gameworldinfo.compendium.actors.actors,'Properties',gameworldinfo.game.items.properties,gameworldinfo.compendium.items.properties);
  content += buildRow('Templates',gameworldinfo.game.actors.actortemplates,gameworldinfo.compendium.actors.actortemplates,'Panels',gameworldinfo.game.items.panels,gameworldinfo.compendium.items.panels);
  content += buildRow('','','','Multipanels',gameworldinfo.game.items.multipanels,gameworldinfo.compendium.items.multipanels);
  content += buildRow('','','','Sheettabs',gameworldinfo.game.items.sheettabs,gameworldinfo.compendium.items.sheettabs);
  content += buildRow('','','','Groups',gameworldinfo.game.items.groups,gameworldinfo.compendium.items.groups);
  content += buildRow('Compendiums',gameworldinfo.compendium.total,'','Lookups',gameworldinfo.game.items.lookups,gameworldinfo.compendium.items.lookups);
  content += buildRow('Folders',gameworldinfo.folders.total,'','Citems',gameworldinfo.game.items.citems,gameworldinfo.compendium.items.citems);
  return content;
}

function buildRow(col1,col2,col3,col4,col5,col6){
  return col(col1) + col(col2,6) + col(col3) + col(col4) + col(col5,6) + col(col6) +'\n';
}

function col(data,pad=12){
  return padWhiteSpace(pad,data,false) + "  ";
}

function padWhiteSpace(spaces,str,padLeft=true){
  const padding=Array(spaces).join(' '); // make a string of spaces
  return pad(padding,str,padLeft);
}

function pad(pad, str, padLeft=true) {
  if (typeof str === 'undefined') 
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}

async function getSysInfo() {
  // 
  // original Client detection script by viazenetti GmbH (Christian Ludwig)
  // found here https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-details-using-javascript
  let unknown = '-';
  // screen
  let screenSize = '';
  let width;
  let height;
  if (screen.width) {
    width = (screen.width) ? screen.width : '';
    height = (screen.height) ? screen.height : '';
    screenSize += '' + width + " x " + height;
  }
  // browser
  let nVer = navigator.appVersion;
  let nAgt = navigator.userAgent;
  let browser = navigator.appName;
  let version = '' + parseFloat(navigator.appVersion);
  let majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset, verOffset, ix;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 4);
  }
  // FoundryVirtualTabletop
  else if ((verOffset = nAgt.indexOf('FoundryVirtualTabletop')) != -1) {    
    browser = 'Foundry Virtual Tabletop';
    version = nAgt.substring(verOffset + browser.length - 2 + 1);
  }
  // Legacy Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
    browser = 'Microsoft Legacy Edge';
    version = nAgt.substring(verOffset + 5);
  }
  // Edge (Chromium)
  else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
    browser = 'Microsoft Edge';
    version = nAgt.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
    version = nAgt.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
    version = nAgt.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }
  // trim the version string
  if ((ix = version.indexOf(';')) != -1)
    version = version.substring(0, ix);
  if ((ix = version.indexOf(' ')) != -1)
    version = version.substring(0, ix);
  if ((ix = version.indexOf(')')) != -1)
    version = version.substring(0, ix);
    majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  // mobile version
  let mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  // cookie
  let cookieEnabled = (navigator.cookieEnabled) ? true : false;

  if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
  }

  // system
  let os = unknown;
  const clientStrings = [
    {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
    {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
    {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
    {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
    {s: 'Windows Vista', r: /Windows NT 6.0/},
    {s: 'Windows Server 2003', r: /Windows NT 5.2/},
    {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
    {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
    {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
    {s: 'Windows 98', r: /(Windows 98|Win98)/},
    {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
    {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s: 'Windows CE', r: /Windows CE/},
    {s: 'Windows 3.11', r: /Win16/},
    {s: 'Android', r: /Android/},
    {s: 'Open BSD', r: /OpenBSD/},
    {s: 'Sun OS', r: /SunOS/},
    {s: 'Chrome OS', r: /CrOS/},
    {s: 'Linux', r: /(Linux|X11(?!.*CrOS))/},
    {s: 'iOS', r: /(iPhone|iPad|iPod)/},
    {s: 'Mac OS X', r: /Mac OS X/},
    {s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s: 'QNX', r: /QNX/},
    {s: 'UNIX', r: /UNIX/},
    {s: 'BeOS', r: /BeOS/},
    {s: 'OS/2', r: /OS\/2/},
    {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ];
  for (let id in clientStrings) {
    let cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }

  let osVersion = unknown;

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
    // if the user agent reported windows 10, it could be win 11 actually
    // to detect windows 11 but not for mozilla
    if (browser!="Firefox"){
    let uapv= await navigator.userAgentData.getHighEntropyValues(['platformVersion'])
       
        switch (uapv.platformVersion){
          case "1.0.0":
            osVersion="10 1507";
            break;
          case "2.0.0":
            osVersion="10 1511";
            break;
          case "3.0.0":
            osVersion="10 1607";
            break;
           case "4.0.0":
            osVersion="10 1703";
            break;
           case "5.0.0":
            osVersion="10 1709";
            break;
          case "6.0.0":
            osVersion="10 1803";
            break;
          case "7.0.0":
            osVersion="10 1809";
            break;
          case "8.0.0":
            osVersion="10 1903|1909";
            break;
          
          case "10.0.0":
            osVersion="10 2004|20H2|21H1";
            break;
          
            
          case "13.0.0":            
          case "14.0.0":
            osVersion="11 Preview";
            break;
          case "15.0.0":
            osVersion="11 Release";
            break;
          
        }
        
        
      }
  }

  switch (os) {
    case 'Mac OS':
    case 'Mac OS X':
    case 'Android':
      osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }
    
  // ---------------------------------------------------------------------------
  // get foundry info
  // ---------------------------------------------------------------------------
  let foundryversion='';
  let gamesystemtitle='';
  let gamesystemversion='';
  let activemodulescount=0;
  try {  
    foundryversion=game.version;
    gamesystemtitle=game.system.title; 
    gamesystemversion=game.system.version;    
    for (let module of game.modules){
      if (module.active && module.id!='_CodeMirror') {
          activemodulescount = activemodulescount + 1;  
      }
    }
    
    
//    let modules = Array.from(game.modules, ([name, value]) => ({ name, value }))
//    for (let i = 0; i < modules.length; i++) {
//        if (modules[i].value.active) {
//          activemodulescount = activemodulescount + 1;  
//        }
//      }     
  }
  catch(err){
    ui.notifications.error('Error when attempting to collect Foundry information, see details in console log.' );
    console.error(err);
  }
  
  // assemble data
  let jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    useragent:nAgt,
    
    foundryversion:foundryversion,
    gamesystemtitle:gamesystemtitle,
    gamesystemversion:gamesystemversion,
    activemodulescount:activemodulescount
  };
  return jscd;
}


