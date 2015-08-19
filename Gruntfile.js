module.exports = function (grunt) {
    
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "public/js/app.js": "public/src-js/app.js"
                }
            }
        },
        watch: {
            scripts: {
                files: "public/src-js/*.js",
                tasks: ["browserify"]
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["browserify"]);
};