import { SystemSettingsForm } from "./system-settings-form.js";
import { SandboxToolsForm } from "./sb-tools-form.js";
import * as stringCasing from './sb-strings-case.js'
import { SETTINGATTRIBUTE } from "./sb-setting-constants.js"
export function sb_settings_menus() {
    // menu for tools
    game.settings.registerMenu("sandbox", "SETTINGS_FORMS_TOOLS", {
      name: `sandbox.settings.forms.SETTINGS_FORMS_TOOLS.Name`,
      label: `sandbox.settings.forms.SETTINGS_FORMS_TOOLS.Name`,
      hint: `sandbox.settings.forms.SETTINGS_FORMS_TOOLS.Hint`,
      icon: "fas fa-toolbox",
      type: SandboxToolsForm,
      restricted: true
    });  
    // menu for the Setting Form SETTING_FORMS_SETTINGS
    game.settings.registerMenu("sandbox", "SETTING_FORMS_SETTINGS", {
      name: `sandbox.settings.forms.SETTING_FORMS_SETTINGS.Name`,
      label: `sandbox.settings.forms.SETTING_FORMS_SETTINGS.Name`,
      hint: `sandbox.settings.forms.SETTING_FORMS_SETTINGS.Hint`,
      icon: "fas fa-cog",
      type: SystemSettingsForm,
      restricted: true
    }); 
}

export function sb_settings_registration() {
     game.settings.register("sandbox", "showADV", {
        name: "Show Roll with Advantage option",
        hint: "If checked, 1d20,ADV,DIS options will be displayed under the Actor's name",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
        category:`sandbox.settings.categories.SHOW_OPTIONS`,
        requiresrender:true
    });
    game.settings.register("sandbox", "showSimpleRoller", {
        name: "Show d20 Roll icon option",
        hint: "If checked a d20 icon will be displayed under the Actor's name",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
        category:`sandbox.settings.categories.SHOW_OPTIONS`,
        requiresrender:true
    });
    game.settings.register("sandbox", "consistencycheck", {
        name: "Check cItem Consistency",
        hint: "If checked, when rebuilding template, every cItem will be evaluated for consistency. WARNING: May take several minutes in big systems",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
        hidden: true
    });
    game.settings.register("sandbox", "showDC", {
        name: "Show DC window",
        hint: "If checked a DC box will appear at the bottom of the screen",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
        category:`sandbox.settings.categories.SHOW_OPTIONS`,
        requiresreload:true
    });
    game.settings.register("sandbox", "showLastRoll", {
        name: "Show Last Roll window",
        hint: "If checked a box displaying the results of the last Roll will appear at the bottom of the screen",
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
        category:`sandbox.settings.categories.SHOW_OPTIONS`,
        requiresreload:true
    });
    game.settings.register("sandbox", "diff", {
        name: "GM difficulty",
        hint: "This is linked to the DC Box at the bottom of the screen",
        scope: "world",
        config: false,
        default: 0,
        type: Number,
        hidden: true
    });
    game.settings.register("sandbox", "rollmod", {
        name: "Show Roll Modifier",
        hint: "This number will be added to the total of all rolls",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
        category:`sandbox.settings.categories.SHOW_OPTIONS`,
        requiresrender:true        
    });
    game.settings.register("sandbox", "tokenOptions", {
        name: "Token Options",
        hint: "You can specify bar1 under token on the template Token tab",
        scope: "world",
        config: false,
        default: 0,
        type: Boolean,
        category:`sandbox.settings.categories.GENERAL_OPTIONS`
    });
    game.settings.register("sandbox", "customStyle", {
        name: "CSS Style file",
        hint: "You can specify a custom styling file. If default wanted, leave blank",
        scope: "world",
        config: false,
        default: "",
        type: String,
        filePicker: 'filepickertype',
        fileType:"textextended",
        category:`sandbox.settings.categories.GENERAL_OPTIONS`,
        disableresetdefault:true,
        requiresreload:true
    });
    game.settings.register("sandbox", "initKey", {
        name: "Initiative Attribute Key",
        hint: "After editing, please refresh instance",
        scope: "world",
        config: false,
        default: "",
        type: String,
        category:`sandbox.settings.categories.GENERAL_OPTIONS`,
        disableresetdefault:true
    });
            
    
    game.settings.register("sandbox", "auxsettext1", {
        name: "Auxiliary settings text 1",
        hint: "After editing, please refresh instance",
        scope: "world",
        config: false,
        default: null,
        type: String,
        hidden: true
    });
    game.settings.register("sandbox", "idDict", {
        name: "Dictionary IDs for importing cItems",
        hint: "As cItems dont have word keys, this ensures faster lokup",
        scope: "world",
        config: false,
        default: null,
        type: String,
        hidden: true,
        disableresetdefault:true
    }); 
    
    // special settings used for world data
    game.settings.register("sandbox", SETTINGATTRIBUTE.WORLD_LAST_CORE_VERSION_USED.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.WORLD_LAST_CORE_VERSION_USED.ID}.Name`,
      default: `${SETTINGATTRIBUTE.WORLD_LAST_CORE_VERSION_USED.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.WORLD_LAST_CORE_VERSION_USED.ID}.Hint`,
      hidden:true,
      disableresetdefault:true
    });
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.WORLD_LAST_SYSTEM_VERSION_USED.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.WORLD_LAST_SYSTEM_VERSION_USED.ID}.Name`,
      default: `${SETTINGATTRIBUTE.WORLD_LAST_SYSTEM_VERSION_USED.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.WORLD_LAST_SYSTEM_VERSION_USED.ID}.Hint`,
      hidden:true,
      disableresetdefault:true
    });
    
    
    // citem options
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS.ID}.Name`,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS.ID}.Hint`,
      scope: "world",
      config: false,
      type: Boolean,
      default: `${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_PLAYERS.DEFAULT}`,
      category: `sandbox.settings.categories.CITEM_OPTIONS`  
    }); 
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_GMS.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_GMS.ID}.Name`,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_GMS.ID}.Hint`,
      scope: "world",
      config: false,
      type: Boolean,
      default: `${SETTINGATTRIBUTE.OPTION_USE_CITEM_INFO_FORM_FOR_GMS.DEFAULT}`,
      category: `sandbox.settings.categories.CITEM_OPTIONS`  
    }); 
    // -----------------------  
    // Sheet options  
    // -----------------------
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_ACTIVATE_ITEM_DELETE_PROTECTION.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ACTIVATE_ITEM_DELETE_PROTECTION.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_ACTIVATE_ITEM_DELETE_PROTECTION.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ACTIVATE_ITEM_DELETE_PROTECTION.ID}.Hint`,
      category: `sandbox.settings.categories.SHEET_OPTIONS`,
      requireshardrender:true
    });
    
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_SHEET_RESIZABLE_CONTENT.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SHEET_RESIZABLE_CONTENT.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_SHEET_RESIZABLE_CONTENT.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SHEET_RESIZABLE_CONTENT.ID}.Hint`,
      category: `sandbox.settings.categories.SHEET_OPTIONS`,
      requiresreload:true
    });
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_DISPLAY_ID_IN_SHEET_CAPTION.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_DISPLAY_ID_IN_SHEET_CAPTION.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_DISPLAY_ID_IN_SHEET_CAPTION.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_DISPLAY_ID_IN_SHEET_CAPTION.ID}.Hint`,
      category: `sandbox.settings.categories.SHEET_OPTIONS`,
      requireshardrender:true
    }); 
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_DISPLAY_SHOW_TO_OTHERS_IN_SHEET_CAPTION.ID}.Hint`,
      category: `sandbox.settings.categories.SHEET_OPTIONS`,
      requireshardrender:true
    });
    
      
    // -----------------------
    // Item sheet show options
    // -----------------------
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_SHOW_ITEM_HELPERS.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SHOW_ITEM_HELPERS.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_SHOW_ITEM_HELPERS.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SHOW_ITEM_HELPERS.ID}.Hint`,
      category: `sandbox.settings.categories.ITEM_SHEET_OPTIONS`,
      requiresrender:true
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_ADAPT_ITEM_SHEET_POSITION.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ADAPT_ITEM_SHEET_POSITION.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_ADAPT_ITEM_SHEET_POSITION.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ADAPT_ITEM_SHEET_POSITION.ID}.Hint`,
      category: `sandbox.settings.categories.ITEM_SHEET_OPTIONS`,
        requiresrender:true
      
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_SET_DEFAULT_ITEM_TAB.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SET_DEFAULT_ITEM_TAB.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_SET_DEFAULT_ITEM_TAB.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_SET_DEFAULT_ITEM_TAB.ID}.Hint`,
      category: `sandbox.settings.categories.ITEM_SHEET_OPTIONS`
    });
    
    // -----------------------
    // key validation options
    // -----------------------
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_ENFORCED_VALIDATION.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ENFORCED_VALIDATION.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_ENFORCED_VALIDATION.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_ENFORCED_VALIDATION.ID}.Hint`,
      category: `sandbox.settings.categories.KEY_VALIDATION_OPTIONS`
    });
    // ----------------------
    // Autogeneration options
    // ----------------------
    //
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_AUTOGENERATE_PROPERTY_ICON.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_AUTOGENERATE_PROPERTY_ICON.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_AUTOGENERATE_PROPERTY_ICON.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_AUTOGENERATE_PROPERTY_ICON.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_CONFIRM_BATCH_OVERWRITE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CONFIRM_BATCH_OVERWRITE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_CONFIRM_BATCH_OVERWRITE.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CONFIRM_BATCH_OVERWRITE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    //OPTION_CONFIRM_ATTRIBUTE_OVERWRITE
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_CONFIRM_ATTRIBUTE_OVERWRITE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CONFIRM_ATTRIBUTE_OVERWRITE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_CONFIRM_ATTRIBUTE_OVERWRITE.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CONFIRM_ATTRIBUTE_OVERWRITE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_KEY_CONVERT_TO_CASE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_KEY_CONVERT_TO_CASE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_KEY_CONVERT_TO_CASE.DEFAULT}`,
      type: String, 
      choices: {
        0: stringCasing.CASING.CASE.NONE,
        1: stringCasing.CASING.CASE.LOWERCASE,
        2: stringCasing.CASING.CASE.UPPERCASE,
        3: stringCasing.CASING.CASE.TITLECASE
      },        
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_KEY_CONVERT_TO_CASE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_CSS_CONVERT_TO_CASE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CSS_CONVERT_TO_CASE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_CSS_CONVERT_TO_CASE.DEFAULT}`,
      type: String, 
      choices: {
        0: stringCasing.CASING.CASE.NONE,
        1: stringCasing.CASING.CASE.LOWERCASE,
        2: stringCasing.CASING.CASE.UPPERCASE,
        3: stringCasing.CASING.CASE.TITLECASE
      },        
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_CSS_CONVERT_TO_CASE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_TRANSLITERATE_NON_LATIN.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_TRANSLITERATE_NON_LATIN.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_TRANSLITERATE_NON_LATIN.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_TRANSLITERATE_NON_LATIN.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_USE_PREFIX_SUFFIX.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_PREFIX_SUFFIX.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_USE_PREFIX_SUFFIX.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_PREFIX_SUFFIX.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.OPTION_USE_DATATYPE_PREFIX.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_DATATYPE_PREFIX.ID}.Name`,
      default: `${SETTINGATTRIBUTE.OPTION_USE_DATATYPE_PREFIX.DEFAULT}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.OPTION_USE_DATATYPE_PREFIX.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_OPTIONS`
    });
    // -----------------
    // Prefixes/suffixes
    // -----------------
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`
    }); 
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLETEXT.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLETEXT.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLETEXT.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLETEXT.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLENUMERIC.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLENUMERIC.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLENUMERIC.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_SIMPLENUMERIC.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_CHECKBOX.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_CHECKBOX.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_CHECKBOX.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_CHECKBOX.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_RADIO.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_RADIO.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_RADIO.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_RADIO.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_TEXTAREA.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_TEXTAREA.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_TEXTAREA.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_TEXTAREA.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_LIST.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_LIST.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_LIST.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_LIST.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_LABEL.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_LABEL.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_LABEL.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_LABEL.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_BADGE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_BADGE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_BADGE.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_BADGE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_TABLE.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_TABLE.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_TABLE.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_TABLE.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PROPERTY_BUTTON.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_BUTTON.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PROPERTY_BUTTON.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PROPERTY_BUTTON.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_PANEL.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PANEL.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_PANEL.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_PANEL.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_MULTIPANEL.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_MULTIPANEL.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_MULTIPANEL.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_MULTIPANEL.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    }); 
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_GROUP.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_GROUP.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_GROUP.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_GROUP.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_LOOKUP.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_LOOKUP.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_LOOKUP.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_LOOKUP.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    
    
    game.settings.register("sandbox", SETTINGATTRIBUTE.PREFIX_TAB.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_TAB.ID}.Name`,
      default: `${SETTINGATTRIBUTE.PREFIX_TAB.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.PREFIX_TAB.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    }); 
    game.settings.register("sandbox", SETTINGATTRIBUTE.SUFFIX_FONTGROUP.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_FONTGROUP.ID}.Name`,
      default: `${SETTINGATTRIBUTE.SUFFIX_FONTGROUP.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_FONTGROUP.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    }); 
    game.settings.register("sandbox", SETTINGATTRIBUTE.SUFFIX_INPUTGROUP.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_INPUTGROUP.ID}.Name`,
      default: `${SETTINGATTRIBUTE.SUFFIX_INPUTGROUP.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_INPUTGROUP.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
    game.settings.register("sandbox", SETTINGATTRIBUTE.SUFFIX_HEADERGROUP.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_HEADERGROUP.ID}.Name`,
      default: `${SETTINGATTRIBUTE.SUFFIX_HEADERGROUP.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_HEADERGROUP.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });         
    game.settings.register("sandbox", SETTINGATTRIBUTE.SUFFIX_ROLLID.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_ROLLID.ID}.Name`,
      default: `${SETTINGATTRIBUTE.SUFFIX_ROLLID.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_ROLLID.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });      
    game.settings.register("sandbox", SETTINGATTRIBUTE.SUFFIX_ROLLNAME.ID, {
      name: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_ROLLNAME.ID}.Name`,
      default: `${SETTINGATTRIBUTE.SUFFIX_ROLLNAME.DEFAULT}`,
      type: String,
      scope: 'world',
      config: false,
      hint: `sandbox.settings.settings.${SETTINGATTRIBUTE.SUFFIX_ROLLNAME.ID}.Hint`,
      category: `sandbox.settings.categories.AUTOGENERATION_PREFIXES_SUFFIXES`        
    });
  
}

