define(["app"], function (App) {
  App.module("ImagesApp.List.View", function (View, App, Backbone, Marionette, $, _) {
    View.Layout = Marionette.Layout.extend({
      template: 'images_layout',

      regions: {
        imagesRegion: "#tiles",
      }
    });

    View.Images = Marionette.ItemView.extend({
      tagName: "tr",
      template: 'images_list_one',

      events: {
        "click": "showBigger",
        "click button": "removeClicked",
      },

      flash: function(cssClass){
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function(){
          setTimeout(function(){
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      showBigger: function(e){
        this.$el.toggleClass("warning");
      },

      removeClicked: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.trigger("contact:show", this.model);
      },

      remove: function(){
        var self = this;
        this.$el.fadeOut(function(){
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoImagesView = Marionette.ItemView.extend({
      template: 'images_none',
      tagName: "tr",
      className: "alert"
    });

    View.Images = Marionette.CompositeView.extend({
      tagName: "table",
      className: "table table-hover",
      template: 'images_list',
      emptyView: NoImagesView,
      itemView: View.Images,
      itemViewContainer: "tbody",

      initialize: function(){
        this.listenTo(this.collection, "reset", function(){
          App.log('reset called', 'images list view', 1);
          this.appendHtml = function(collectionView, itemView, index){
            collectionView.$el.append(itemView.el);
          }
        });
      },

      onCompositeCollectionRendered: function(){
        App.log('rendered called', 'images list view', 1);
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.prepend(itemView.el);
        }
      }
    });
  });

  return App.ImagesApp.List.View;
});