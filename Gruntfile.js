module.exports = function (grunt) {
    
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "public/js/app.js": "client/js/app.js"
                }
            }
        },
        watch: {
            scripts: {
                files: "client/js/**/*.js",
                tasks: ["browserify"]
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["browserify"]);
};