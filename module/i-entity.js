import { SBOX } from "./config.js";
import { auxMeth } from "./auxmeth.js";

export class gItem extends Item {

    prepareData() {
        super.prepareData();

        // Get the Actor's data object
        const itemData = this;
        const data = itemData.system;
        const flags = itemData.flags;

        if (!hasProperty(data.attributes, "name") && itemData.type == "cItem") {
            setProperty(data.attributes, "name", itemData.name);
        }
        if (!hasProperty(flags, "scrolls")) {
            setProperty(flags, "scrolls", {});
        }

    }

    //Overrides update method
    async update(data, options = {}) {
        //console.log(data);
        // Get the Actor's data object
        return super.update(data, options);

    }

    async _preUpdate(updateData, options, userId) {
        //console.log(updateData);
        if (updateData.name) {
            setProperty(updateData, "system", {});
            setProperty(updateData.system, "attributes", {});
            setProperty(updateData.system.attributes, "name", updateData.name);
        }
    }

  async _preCreate(createData, options, userId) {
    await super._preCreate(createData, options, userId);
    let image = "";        
    if (this.img == 'icons/svg/item-bag.svg') {
      if (this.type == "cItem") {
        image = "systems/sandbox/styles/icons/itemtypes/sb_item_citem.svg";
      }
      if (this.type == "sheettab") {
        image = "systems/sandbox/styles/icons/itemtypes/sb_item_sheettab.svg";
      }
      if (this.type == "group") {
        image = "systems/sandbox/styles/icons/itemtypes/sb_item_group.svg";
      }
      if (this.type == "panel") {
        image = "systems/sandbox/styles/icons/itemtypes/sb_item_panel.svg";
      }
      if (this.type == "multipanel") {
        image = "systems/sandbox/styles/icons/itemtypes/sb_item_multipanel.svg";
      }
      if (this.type == "property") {
        //image = "systems/sandbox/styles/icons/itemtypes/sb_item_property.svg";
        // since simpletext is deafult use that icon
        image="systems/sandbox/styles/icons/propertytypes/sb_property_simpletext.svg";
      }
      if (image != ""){
        this.updateSource({ "img": image });
      }
    }

    if (createData.type == "cItem")
      if (createData.system != null)
        if (createData.system.ciKey != null)
          if (createData.system.ciKey != "") {
            let is_here = game.items.filter(y => Boolean(y.system.ciKey)).find(y => y.system.ciKey == createData.system.ciKey && y.name != createData.name);
            if (is_here) {
              await this.updateSource({ "system.ciKey": "" });              
            }
          }
  }



}