export const SETTINGATTRIBUTE={  
  PREFIX_PROPERTY:                                 {ID:'PREFIX_PROPERTY'                                    ,DEFAULT:'PROPERTY'},
  PREFIX_PROPERTY_SIMPLETEXT:                      {ID:'PREFIX_PROPERTY_SIMPLETEXT'                         ,DEFAULT:'TXT'},
  PREFIX_PROPERTY_SIMPLENUMERIC:                   {ID:'PREFIX_PROPERTY_SIMPLENUMERIC'                      ,DEFAULT:'NUM'},
  PREFIX_PROPERTY_CHECKBOX:                        {ID:'PREFIX_PROPERTY_CHECKBOX'                           ,DEFAULT:'CHK'},
  PREFIX_PROPERTY_RADIO:                           {ID:'PREFIX_PROPERTY_RADIO'                              ,DEFAULT:'RDO'},
  PREFIX_PROPERTY_TEXTAREA:                        {ID:'PREFIX_PROPERTY_TEXTAREA'                           ,DEFAULT:'TXA'},
  PREFIX_PROPERTY_LIST:                            {ID:'PREFIX_PROPERTY_LIST'                               ,DEFAULT:'LST'},
  PREFIX_PROPERTY_LABEL:                           {ID:'PREFIX_PROPERTY_LABEL'                              ,DEFAULT:'LBL'},
  PREFIX_PROPERTY_BADGE:                           {ID:'PREFIX_PROPERTY_BADGE'                              ,DEFAULT:'BDG'},
  PREFIX_PROPERTY_TABLE:                           {ID:'PREFIX_PROPERTY_TABLE'                              ,DEFAULT:'TBL'},
  PREFIX_PROPERTY_BUTTON:                          {ID:'PREFIX_PROPERTY_BUTTON'                             ,DEFAULT:'BTN'},
  PREFIX_PANEL:                                    {ID:'PREFIX_PANEL'                                       ,DEFAULT:'PANEL'}, 
  PREFIX_MULTIPANEL:                               {ID:'PREFIX_MULTIPANEL'                                  ,DEFAULT:'MULTIPANEL'},
  PREFIX_GROUP:                                    {ID:'PREFIX_GROUP'                                       ,DEFAULT:'GROUP'},
  PREFIX_TAB:                                      {ID:'PREFIX_TAB'                                         ,DEFAULT:'TAB'},
  SUFFIX_FONTGROUP:                                {ID:'SUFFIX_FONTGROUP'                                   ,DEFAULT:'FONTGROUP'},
  SUFFIX_INPUTGROUP:                               {ID:'SUFFIX_INPUTGROUP'                                  ,DEFAULT:'INPUTGROUP'},
  SUFFIX_HEADERGROUP:                              {ID:'SUFFIX_HEADERGROUP'                                 ,DEFAULT:'HEADERGROUP'},
  SUFFIX_ROLLID:                                   {ID:'SUFFIX_ROLLID'                                      ,DEFAULT:'ROLL'},
  SUFFIX_ROLLNAME:                                 {ID:'SUFFIX_ROLLNAME'                                    ,DEFAULT:'Roll'},
  OPTION_KEY_CONVERT_TO_CASE:                      {ID:'OPTION_KEY_CONVERT_TO_CASE'                         ,DEFAULT:2},
  OPTION_CSS_CONVERT_TO_CASE:                      {ID:'OPTION_CSS_CONVERT_TO_CASE'                         ,DEFAULT:1},
  OPTION_ENFORCED_VALIDATION:                      {ID:'OPTION_ENFORCED_VALIDATION'                         ,DEFAULT:''}, // empty means false}, non-empty is true
  OPTION_CONFIRM_BATCH_OVERWRITE:                  {ID:'OPTION_CONFIRM_BATCH_OVERWRITE'                     ,DEFAULT:true},
  OPTION_CONFIRM_ATTRIBUTE_OVERWRITE:              {ID:'OPTION_CONFIRM_ATTRIBUTE_OVERWRITE'                 ,DEFAULT:true},
  OPTION_SHOW_ITEM_HELPERS:                        {ID:'OPTION_SHOW_ITEM_HELPERS'                           ,DEFAULT:true},
  OPTION_ACTIVATE_ITEM_DELETE_PROTECTION:          {ID:'OPTION_ACTIVATE_ITEM_DELETE_PROTECTION'             ,DEFAULT:true},
  OPTION_USE_DATATYPE_PREFIX:                      {ID:'OPTION_USE_DATATYPE_PREFIX'                         ,DEFAULT:true},
  OPTION_USE_PREFIX_SUFFIX:                        {ID:'OPTION_USE_PREFIX_SUFFIX'                           ,DEFAULT:true},
  OPTION_TRANSLITERATE_NON_LATIN:                  {ID:'OPTION_TRANSLITERATE_NON_LATIN'                     ,DEFAULT:true},
  OPTION_SET_DEFAULT_ITEM_TAB:                     {ID:'OPTION_SET_DEFAULT_ITEM_TAB'                        ,DEFAULT:true},
  OPTION_ADAPT_ITEM_SHEET_POSITION:                {ID:'OPTION_ADAPT_ITEM_SHEET_POSITION'                   ,DEFAULT:true},
  OPTION_DISPLAY_ID_IN_SHEET_CAPTION:              {ID:'OPTION_DISPLAY_ID_IN_SHEET_CAPTION'                 ,DEFAULT:''},
  OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS:          {ID:'OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS'             ,DEFAULT:true},
  OPTION_USE_CITEM_INFO_FORM_FOR_GMS:              {ID:'OPTION_USE_CITEM_INFO_FORM_FOR_GMS'                 ,DEFAULT:true},
  OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION:  {ID:'OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION'     ,DEFAULT:true},
  SETTING_CITEM_ICON_SIZE:                         {ID:'SETTING_CITEM_ICON_SIZE'                            ,DEFAULT:26},
  OPTION_AUTOGENERATE_PROPERTY_ICON:               {ID:'OPTION_AUTOGENERATE_PROPERTY_ICON'                  ,DEFAULT:true},
  OPTION_DISPLAY_SUBITEMS_ICONS:                   {ID:'OPTION_DISPLAY_SUBITEMS_ICONS'                      ,DEFAULT:true}
    
};

export function sb_item_sheet_get_game_setting(moduleID,settingName){
  let setting=game.settings.get(moduleID, settingName);    
  if (!setting) {
    return  '';
  }
  else{
    return setting;
  }
}
