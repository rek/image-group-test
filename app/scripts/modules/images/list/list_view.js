define(['app'], function(App) {
    App.module('ImagesApp.List.View', function(View, App, Backbone, Marionette, $, _) {
        'use strict';
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
                        $view.toggleClass(cssClass);
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
            template: 'list_one',

            events: {
                // 'click img': 'showBigger',
                // 'click .remove': 'removeClicked',
            },

            hammerEvents: {
                'swipeleft': 'swipedLeft'
            },

            swipedLeft: function(e) {
                App.log('Swipped left on image', 'List view', 1);
                App.log(e, 'List view', 1);
                // e.preventDefault();
                $(e.target).animate({
                    right: '50%', opacity: 0
                }, 800)
            },

            showBigger: function(e) {
                // this.$el.toggleClass('warning');
                App.log('show bigger', this.name, 1);
                e.preventDefault();
                // e.stopPropagation();
                this.trigger('image:show', this.model);
            },

            removeClicked: function(e) {
                App.log('Remove clicked', this.name, 3);
                e.preventDefault();
                this.trigger('image:delete', this.model);
            },

            remove: function() {
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            },

            onRender: function() {
                // console.log('Rendering Image:' + this.el);
                // this.$el.draggable({
                    // revert: true,
                    // axis: "x"
                    // containment: 'parent' // cannot move out of parent
                // });

            }
        });

        // var NoImagesView = Marionette.ItemView.extend({
        //     template: 'images_none',
        //     // tagName: '',
        //     className: 'alert'
        // });

        View.Images = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'list',
            // emptyView: NoImagesView,
            itemView: View.Image,
            itemViewContainer: '.images_list',

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', 'images list view', 1);
                    this.appendHtml = function(collectionView, itemView, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            // onRender: function() {
            //     console.log('rendering list');
            //     $("#droppable").droppable({
            //         // accept: ".image",
            //         drop: function(event, ui) {
            //             $(ui.draggable).fadeOut();
            //         }
            //     });
            // },

            onCompositeCollectionRendered: function() {
                App.log('Rendered list of images called', 'images list view', 1);

                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return App.ImagesApp.List.View;
});