define(['app', 'list_view'], function (App, View) {
  App.module('ImagesApp.New', function (New, App, Backbone, Marionette, $, _) {
    New.Controller = {
      add: function () {

        // require(["new_view"], function(NewView){
          var newContact = ContactManager.request("contact:entity:new");

          var view = new NewView.Contact({
            model: newContact
          });

          // if not max images
          // if(contacts.length > 0){
          // }

          if(newContact.save(data)){
            contacts.add(newContact);
            view.trigger("dialog:close");
            var newContactView = contactsNewView.children.findByModel(newContact);
            // check whether the new contact view is displayed (it could be
            // invisible due to the current filter criterion)
            if(newContactView){
              newContactView.flash("success");
            }
          }
          else{
            view.triggerMethod("form:data:invalid", newContact.validationError);
          }

          ContactManager.dialogRegion.show(view);
      }
    }
  });
  return App.ImagesApp.New.Controller;
});