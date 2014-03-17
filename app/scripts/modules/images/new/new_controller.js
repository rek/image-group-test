define(['app', 'list_view'], function (App, View) {
  App.module('ImagesApp.New', function (New, App, Backbone, Marionette, $, _) {
    this.name = 'New Controller';
    New.Controller = {
      add: function () {
        App.log('top of add', this.name, 1);
        // require(["new_view"], function(NewView){
          var newImage = App.request("image:entity:new");

          var view = new NewView.Contact({
            model: entities_images
          });

          // if not max images
          // if(contacts.length > 0){
          // }

          if(newImage.save(data)){
            contacts.add(newImage);
            view.trigger("dialog:close");
            var newImageView = contactsNewView.children.findByModel(newImage);
            // check whether the new contact view is displayed (it could be
            // invisible due to the current filter criterion)
            if(newImageView){
              newImageView.flash("success");
            }
          }
          else{
            view.triggerMethod("form:data:invalid", newImage.validationError);
          }

          App.dialogRegion.show(view);
      }
    }
  });
  return App.ImagesApp.New.Controller;
});