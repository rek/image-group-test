define(['app', 'list_view'], function (App, View) {
  App.module('ImagesApp.List', function (List, App, Backbone, Marionette, $, _) {
    List.Controller = {
      list: function () {
        require(['common/views', 'entities_images'], function(CommonViews){

          App.mainRegion.show(new CommonViews.Loading());

          var fetchingImages = App.request('rote:entities');

          var imagesListLayout = new View.Layout();
          // var imagesListPanel = new View.Panel();

          // require(['entities/common'], function(FilteredCollection){
            $.when(fetchingImages).done(function(images){
              App.log('fetched images datas', 'App', 1);

              var imagesListView = new View.Images({
                collection: images
              });

              imagesListLayout.on('show', function(){
                // imagesListLayout.panelRegion.show(contactsListPanel);
                imagesListLayout.imagesRegion.show(imagesListView);
              });

              imagesListView.on('itemview:contact:show', function(childView, model){
                // App.trigger('images:show', model.get('id'));
              });

              // when its all setup, tigger show
              App.mainRegion.show(imagesListLayout);

            });

        });
      }
    }
  });
  return App.ImagesApp.List.Controller;
});