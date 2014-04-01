define(['app'], function(App){
  App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var contextName = 'Entity';
    Entities.Image = Backbone.Model.extend({
      urlRoot: 'images',

      defaults: {
        name: '',
        slug: ''
      },

      validate: function(attrs, options) {
        var errors = {}
        if (! attrs.fileName) {
          errors.fileName = 'can\'t be blank';
        }
    //     if (! attrs.lastName) {
    //       errors.lastName = 'can't be blank';
    //     }
    //     else{
    //       if (attrs.lastName.length < 2) {
    //         errors.lastName = 'is too short';
    //       }
    //     }
        if (! _.isEmpty(errors)) {
          return errors;
        }
      }
    });
    // Entities.configureStorage(Entities.Image);

    Entities.ImagesCollection = Backbone.Collection.extend({
      url: 'images',
      model: Entities.Image
    });
    // Entities.configureStorage(Entities.ImagesCollection);

    var initializeImagess = function() {
      App.log('Initializing Fake Images', contextName, 1);
      // var Images = Backbone.Model.extend({});

      var fakeImages = new Entities.ImagesCollection([
        { name: 'First Images', slug: 'page-1', src: 'fake.png' },
        { name: 'Second Images', slug: 'page-2', src: 'fake.png' }
      ]);
      // fakeImagess.forEach(function(i){
      //   i.save();
      // });
      return fakeImages;
    };

    var API = {
      getImagesEntities: function() {
        App.log('images:entities event detected', contextName, 2);
        var imageCollection = new Entities.ImagesCollection();
        var defer = $.Deferred();
        imageCollection.fetch({
          complete: function(data) {
            defer.resolve(imageCollection); // send back the collection
          }
          // success: function(data) {
          //   App.log('success data', contextName, 1);
          //   defer.resolve(data);
          // }
        });
        // chain the above promise,
        var promise = defer.promise();
        // when the above fetch is done:
        $.when(promise).done(function(imageCollection) {
          // check to see if it actually had content:
          if (imageCollection.length === 0) { // if not, get defaults.
            // FAKE NETWORK LAG
            setTimeout(function() {
              // App.trigger('page:register', models); // add each image to the menu
              // App.log('Resetting images with FAKES', this.name, 1);
              // if we don't have any imageCollection yet, create some for convenience
              imageCollection.reset(initializeImagess().models); // update the collection

            }, 500);

          }
        });
        return promise;
      },

    };

    App.reqres.setHandler('images:entities', function() {
      return API.getImagesEntities();
    });

    // App.reqres.setHandler('images:entity', function(id){
      // return API.getContactEntity(id);
    // });

    App.reqres.setHandler('images:entity:new', function(id) {
      App.log('Making new image', this.name, 1);
      return new Entities.Image();
    });
  });

  return ;
});
