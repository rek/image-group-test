/*global navigator, Camera */
define(['app', 'list_view'], function(App, View) {
    'use strict';
    App.module('ImagesApp.List', function(List, App, Backbone, Marionette, $, _) {
        List.Controller = {
            name: 'List Controller',
            list: function() {

                require(['common/views', 'entities_images'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingImages = App.request('images:entities');

                    var imagesListLayout = new View.Layout();

                    var imagesCollection; // the main collection for this page.

                    // require(['entities/common'], function() {
                    imagesListLayout.on('image:snap', function() {
                        // imagesListLayout.panelRegion.show(contactsListPanel);
                        // imagesListLayout.imagesRegion.show(imagesListView);

                        require(['list_view'], function(ListView) {
                            var newImage = App.request('images:entity:new');

                            if (navigator.camera) { // if cordova
                                navigator.camera.getPicture(
                                    function onSuccess(imageData) {
                                        newImage.set('src', 'data:image/jpeg;base64,' + imageData);
                                        // newImage.set('src', imageData);
                                        imagesCollection.add(newImage);
                                    },
                                    function onFail(message) {
                                        console.log('Failed because: ' + message);
                                    },
                                    {
                                        quality: 50,
                                        destinationType: navigator.camera.DestinationType.DATA_URL
                                        // destinationType: navigator.camera.DestinationType.FILE_URI
                                    }
                                );
                            } else { // else if testing mode
                                newImage.set('src', 'images/fake.png');
                                imagesCollection.add(newImage);
                            }

                            // var newImageView = new ListView.Image({
                            //   model: newImage
                            // });

                            imagesListLayout.flash('success');
                        });
                    });

                    // when initial image fetching is done (ie: initial page load)
                    $.when(fetchingImages).done(function(images) {
                        imagesCollection = images;
                        // App.log('Fetched all image datas', 'App', 1);
                        // make a collection to show
                        var imagesListView = new View.Images({
                            collection: imagesCollection
                        });

                        //   imagesListView.on('itemview:image:show', function(childView, model){
                        //     // App.trigger('images:show', model.get('id'));
                        //   });

                        imagesListView.on('itemview:image:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        imagesListLayout.imagesRegion.show(imagesListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(imagesListLayout);
                });
            }
        };
    });
    return App.ImagesApp.List.Controller;
});