define(["app","list_view"],function(e){return e.module("ImagesApp.New",function(e,t){this.name="New Controller",e.Controller={add:function(){t.log("top of add",this.name,1);var e=t.request("image:entity:new"),i=new NewView.Contact({model:entities_images});if(e.save(data)){contacts.add(e),i.trigger("dialog:close");var o=contactsNewView.children.findByModel(e);o&&o.flash("success")}else i.triggerMethod("form:data:invalid",e.validationError);t.dialogRegion.show(i)}}}),e.ImagesApp.New.Controller});