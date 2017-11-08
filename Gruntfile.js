const timeGrunt = require('time-grunt');
const loadGruntConfig = require('load-grunt-config');

module.exports = (grunt) => {
    const data = {
        paths: {
            source: {
                root: 'src',
                javascripts: '<%= paths.source.root %>/app',
                node_modules: 'node_modules',
            },
            public: {
                root: 'public',
                javascripts: '<%= paths.public.root %>/javascripts',
            },
        },
    };

    // require it at the top and pass in the grunt instance
    timeGrunt(grunt);
    loadGruntConfig(grunt, {
        data,
    });
};
