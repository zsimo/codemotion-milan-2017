module.exports = {
    javascripts: {
        files: [
            '<%= paths.source.javascripts %>/**/*.js',
        ],
        tasks: ['javascripts'],
        options: {
            spawn: false,
        },
    },
};
