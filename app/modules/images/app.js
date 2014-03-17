define(function(require) {
    var App = require('app');
    var path = 'modules/images/';

    requirejs.config({
        paths: {
            list_view       : path + 'list/list_view',
            list_controller : path + 'list/list_controller',
            show_view       : path + 'show/show_view',
            show_controller : path + 'show/show_controller',
            entities_images : path + 'entities/images',
        }
    });

    // create a new module
    App.module('App', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function (options, moduleName, app) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        define: function (ImagesApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        }
    });

    // create a new sub module
    App.module("Routers.ImagesApp", function(ImagesAppRouter, App, Backbone, Marionette, $, _){
        this.name = 'Routers.ImagesApp';

        ImagesAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function () {
                // App.log('Before Router', RotesAppRouter.name);
                // start ourselves
                // App.switchApp('RotesApp', {});
            },
            appRoutes: {
                ''            : 'list',
                'add'         : 'add',
                'remove/:id'  : 'remove',
            }
        });

        var executeAction = function(action, arg){
            App.switchApp("ImagesApp");
            action(arg);
            App.execute("set:active:page", "images");
        };

        var API = {
            list: function(){
                require(['list_controller'], function(ListController){
                    App.log('List images: Controller loaded, requesting images..', ImagesAppRouter.name, 2);
                    executeAction(ListController.listImages);
                });
            },
            remove: function(id){
                App.log('removing: ' + id, this.name, 1);
                executeAction(ListController.remove, id);
            },
            add: function(){
                App.log('adding', this.name, 1);
                executeAction(NewController.add);
            }
        };

        // also watch for manual events:
        App.on("images:add", function(){
          App.navigate("add");
          API.add();
        });

        App.on("images:remove", function(id){
          App.navigate("remove/:" + id);
          API.remove(id);
        });

        App.on("images:list", function(){
          App.navigate("/");
          API.list();
        });

        App.addInitializer(function(){
            App.log('Initalizer running: Starting Router', ImagesAppRouter.name, 2);
            new ImagesAppRouter.Router({
                controller: API
            });
        });
    });

    return App.ImagesAppRouter;
});