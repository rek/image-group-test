define(['app', 'list_view'], function (App, View) {
  App.module('ImagesApp.List', function (List, App, Backbone, Marionette, $, _) {
    List.Controller = {
      name: 'List Controller',
      list: function () {

        require(['common/views', 'entities_images'], function(CommonViews) {

          App.mainRegion.show(new CommonViews.Loading());

          var fetchingImages = App.request('images:entities');

          var imagesListLayout = new View.Layout();
          // var imagesListPanel = new View.Panel();

          // require(['entities/common'], function() {
          imagesListLayout.on('image:snap', function() {
            // imagesListLayout.panelRegion.show(contactsListPanel);
            // imagesListLayout.imagesRegion.show(imagesListView);

            require(["list_view"], function(ListView) {
              var newImage = App.request("images:entity:new");

              var newImageView = new ListView.Image({
                model: newImage
              });

              // save it some where
              // images.add(newImage);

              // imagesListLayout.flash("success");
            });
          });

          $.when(fetchingImages).done(function(images) {
            App.log('Fetched all image datas', 'App', 1);
            App.log(images, this.name, 1);
            var imagesListView = new View.Images({
              collection: images
            });



            //   imagesListView.on('itemview:contact:show', function(childView, model){
            //     // App.trigger('images:show', model.get('id'));
            //   });

            // when its all setup, tigger show
            App.mainRegion.show(imagesListLayout);

          });

        });
      }
    }
  });
  return App.ImagesApp.List.Controller;
});