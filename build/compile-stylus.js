var chokidar = require("chokidar");
var gulp = require("gulp");

module.exports = ()=>{

    var compileStyl = function() {
        return new Promise((resolve, reject)=> {

            var stylus = require("gulp-stylus");
            gulp.src("./src/assets/styl/style.styl")
                .pipe(stylus({
                    compress: true
                }))
                .pipe(gulp.dest("./dist/css"))
                .on("end", function() {
                    resolve();
                    console.log("Compiling done");
                })
            ;
        });
    };

    var inject_ = function() {
        return new Promise((resolve, reject)=> {

            var target = gulp.src('./src/assets/styl/style.styl');
            var sort = require('gulp-sort');
            var sources = gulp.src(['./src/**/*.styl', '!./src/assets/**/*.styl'], {read: false}).pipe(sort());

            var inject = require("gulp-inject");
            target
                .pipe(inject(sources, {
                    starttag: '// inject:all',
                    endtag: '// endinject',
                    transform: function (filepath, file, i, length) {
                        return `@import "../../..${filepath}";`;
                    }
                }))
                .pipe(gulp.dest('./src/assets/styl/'))
                .on("end", ()=>{
                    console.log("Inject done");
                    resolve();
                })
            ;
        });
    };

    chokidar
        .watch(["./src/**/*.styl"], {
            ignoreInitial: true
        })
        .on('add', function(event, path) {
            inject_().then(compileStyl);
        })
        .on('unlink', function(event, path) {
            inject_().then(compileStyl);
        })
        .on('change', function(event, path) {
            compileStyl();
        })
    ;

    inject_().then(compileStyl);

};