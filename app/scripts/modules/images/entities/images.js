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
      App.log('Imagess init', contextName, 1);
      var Images = Backbone.Model.extend({});

      var fakeImagess = [
          new Images({ name: 'First Images', slug: 'page-1' }),
          new Images({ name: 'Second Images', slug: 'page-2' })
      ]

      return fakeImagess;
    };

    var API = {
      getImagesEntities: function() {
        App.log('getImagess called', contextName, 1);
        var imagess = new Entities.ImagesCollection();
        var defer = $.Deferred();
        imagess.fetch({
          complete: function(data) {

            var models = initializeImagess();
            if (imagess.length === 0) {
              App.log('fake datas', contextName, 1);
              // if we don't have any imagess yet, create some for convenience
              var models = initializeImagess();
              // FAKE NETWORK LAG
              setTimeout(function() {
                App.trigger('page:register', models); // add each image to the menu
                App.log('Resetting images with FAKES', this.name, 1);
                imagess.reset(models);
                defer.resolve(imagess);
              }, 500);

            } else {
              App.log('GOT GOOD DATAS', this.name, 1);
              defer.resolve(data.responseJson);
            }

          }
          // success: function(data) {
          //   App.log('success data', contextName, 1);
          //   defer.resolve(data);
          // }
        });
        // var promise = defer.promise();
        // $.when(promise).done(function(imagess) {
        //   App.log('promise running: ' + imagess.length, contextName, 1);
        //   if (imagess.length === 0) {
        //     // if we don't have any imagess yet, create some for convenience
        //     var models = initializeImagess();
        //     // FAKE NETWORK LAG
        //     setTimeout(function() {
        //       App.trigger('page:register', models); // add each image to the menu
        //       App.log('Resetting images with FAKES', this.name, 1);
        //       imagess.reset(models);
        //     }, 500);

        //   }
        // });
        // return promise;
        return defer.promise();
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
