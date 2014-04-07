requirejs.config({
    paths: {
        jquery                 : '../bower_components/jquery/dist/jquery.min',
        underscore             : '../bower_components/lodash/dist/lodash',
        backbone               : '../bower_components/backbone/backbone',
        marionette             : '../bower_components/marionette/lib/core/amd/backbone.marionette',
        dust                   : '../bower_components/dustjs-linkedin/lib/dust',
        dustHelpers            : '../bower_components/dustjs-linkedin-helpers/lib/dust-helpers',
        dustMarionette         : '../bower_components/marionette-dust/src/backbone.marionette.dust',
        'backbone.picky'       : '../bower_components/backbone.picky/lib/amd/backbone.picky',
        'backbone.wreqr'       : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.eventbinder' : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.babysitter'  : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        templates              : 'common/templates',
        spin                   : '../bower_components/spinjs/spin',
        'spin.jquery'          : '../bower_components/spinjs/jquery.spin',

        'list_view'      : 'modules/images/list/list_view',
        'list_controller': 'modules/images/list/list_controller',
        'show_view'      : 'modules/images/show/show_view',
        'show_controller': 'modules/images/show/show_controller',
        'entities_images'  : 'modules/images/entities/images',
    },
    shim: {
        jquery : {
          exports : 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps : ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        dustMarionette: {
            deps: ['backbone']
        },
        dust: {
            exports: 'dust'
        },
        dustHelpers: ['dust'],
        templates: ['dust', 'dustMarionette'] // load dust before our compiled templates
    },
    deps: ['main'] // <-- run our app
});