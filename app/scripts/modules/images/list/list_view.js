define(['app'], function (App) {
  App.module('ImagesApp.List.View', function (View, App, Backbone, Marionette, $, _) {

    View.Layout = Marionette.Layout.extend({
      template: 'images_layout',
      events: {
        'click button#capture': 'snapClicked',
      },

      regions: {
        imagesRegion: '#tiles',
      },

      flash: function(cssClass) { // fade in and out.
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function() {
          setTimeout(function() {
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      snapClicked: function(e) {
        App.log('snap', this.name, 2);
        this.trigger('image:snap');
      },
    });

    View.Image = Marionette.ItemView.extend({
      tagName: 'div',
      template: 'tile',

      events: {
        'click img': 'showBigger',
        'click .remove': 'removeClicked',
      },

      showBigger: function(e) {
        // this.$el.toggleClass('warning');
        App.log('show bigger', this.name, 1);
        e.preventDefault();
        e.stopPropagation();
        this.trigger('image:show', this.model);
      },

      removeClicked: function(e) {
        App.log('Remove clicked', this.name, 3);
        e.stopPropagation();
        this.trigger("image:delete", this.model);
      },

      remove: function() {
        var self = this;
        this.$el.fadeOut(function() {
          Marionette.ItemView.prototype.remove.call(self);
        });
      },
    });

    var NoImagesView = Marionette.ItemView.extend({
      template: 'images_none',
      // tagName: 'tr',
      className: 'alert'
    });

    View.Images = Marionette.CompositeView.extend({
      // tagName: 'table',
      // className: 'table table-hover',
      template: 'images_list',
      emptyView: NoImagesView,
      itemView: View.Image,
      itemViewContainer: '.images_list',

      initialize: function(){
        this.listenTo(this.collection, 'reset', function() {
          App.log('reset called', 'images list view', 1);
          this.appendHtml = function(collectionView, itemView, index) {
            collectionView.$el.append(itemView.el);
          }
        });
      },

      onCompositeCollectionRendered: function() {
        App.log('rendered called', 'images list view', 1);
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.prepend(itemView.el);
        }
      }
    });
  });

  return App.ImagesApp.List.View;
});
