/// <binding BeforeBuild='default' />
/*
Reference:

            https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
            http://andy-carter.com/blog/a-beginners-guide-to-the-task-runner-gulp
            https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md,
            https://github.com/gulpjs/gulp/tree/master/docs/recipes,
            https://github.com/gulpjs/gulp/blob/master/docs/README.md#articles

List Gulp Tasks:

            https://github.com/Pestov/essential-gulp-plugins
            http://gulpjs.com/plugins/
            http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/
*/

/*  https://github.com/gulpjs/gulp/blob/master/docs/API.md */
var gulp = require("gulp");
/*  https://github.com/ck86/main-bower-files */
var mainBowerFiles = require("main-bower-files");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
/*  https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md */
var del = require("del");
var watch = require("gulp-watch");
var realFavicon = require("gulp-real-favicon");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");
var notify = require("gulp-notify");
var gutil = require("gulp-util");
var filesize = require("gulp-filesize");
var rename = require("gulp-rename");

var paths = {
    scripts: "Scripts",
    bowerComponents: "bower_components",
    build: "Scripts/build",
    app: "Scripts/app"
};

var app = [
    paths.app + "/module/*.js",
    paths.app + "/recipe/*.js",
    paths.app + "/**/*.js"
];
var angular = [
    paths.scripts + "/jquery/**/*.js",
    paths.scripts + "/angular/**/*.js",
    paths.scripts + "/adal-angular/**/*.js",
    paths.scripts + "/angular-bootstrap/**/*.js",
    paths.scripts + "/angular-ui-router/**/*.js",
    paths.scripts + "/angular-translate/**/*.js",
    paths.scripts + "/angular-sanitize/**/*.js",
    paths.scripts + "/angular-resource/**/*.js"
];

gulp.task("clean", function () {
    return del([
        paths.build
    ]);
});

gulp.task("main-bower-files", function () {
    return gulp.src(mainBowerFiles(), { base: paths.bowerComponents })
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("custom", ['clean'], function () {
    return gulp.src(app)
        .pipe(concat("main.js"))
        .pipe(gulp.dest(paths.build))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest(paths.build))
        .on("error", gutil.log);
});

gulp.task("vendor", ['main-bower-files'], function () {
    return gulp.src(angular)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(paths.build))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename("vendor.min.js"))
        .pipe(gulp.dest(paths.build))
        .pipe(filesize())
        .on("error", gutil.log);
});

gulp.task("default", ["custom", "vendor"], function () {
    // place code for your default task here
});