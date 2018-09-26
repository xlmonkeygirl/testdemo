var gulp = require('gulp');

// // 拷贝文件
// gulp.task('copyhtml',function(){
//     gulp.src('src/index.html')
//         .pipe(gulp.dest('dest'));
// });

// //监听
// gulp.task('watch',function(){
//     gulp.watch('src/sass/reg.scss',['copyhtml']);
// });

//将sass文件编译成css文件，并且监听
var sass = require('gulp-sass');

gulp.task('sass',function(){
    return gulp.src('src/sass/reg.scss')
                .pipe(sass())
                .pipe(gulp.dest('src/css'));
});

gulp.task('watchsass',function(){
    gulp.watch('src/sass/reg.scss',['sass']);
});

gulp.task('loginsass',function(){
    return gulp.src('src/sass/login.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
});
gulp.task('watchloginsass',function(){
    gulp.watch('src/sass/login.scss',['loginsass']);
});

gulp.task('indexsass',function(){
    return gulp.src('src/sass/index.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
});
gulp.task('watchindexsass',function(){
    gulp.watch('src/sass/index.scss',['indexsass']);
});

gulp.task('goodslistsass',function(){
    return gulp.src('src/sass/goodslist.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
});
gulp.task('watchgoodslistsass',function(){
    gulp.watch('src/sass/goodslist.scss',['goodslistsass']);
});

gulp.task('goodsdetailsass',function(){
    return gulp.src('src/sass/goodsdetail.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
});
gulp.task('watchgoodsdetailsass',function(){
    gulp.watch('src/sass/goodsdetail.scss',['goodsdetailsass']);
});

gulp.task('shoppingcartsass',function(){
    return gulp.src('src/sass/shoppingcart.scss')
               .pipe(sass())
               .pipe(gulp.dest('src/css'));
});
gulp.task('watchshoppingcartsass',function(){
    gulp.watch('src/sass/shoppingcart.scss',['shoppingcartsass']);
});


var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('indexcssmin',function(){
  return gulp.src('src/css/index.css')
             .pipe(cssmin())
             .pipe(rename('index.min.css'))
             .pipe(gulp.dest('dest/css'));
});

var jsmin = require('gulp-uglify');
gulp.task('commonjsmin',function(){
  return gulp.src('src/js/common.js')
             .pipe(jsmin())
             .pipe(rename('common.min.js'))
             .pipe(gulp.dest('dest/js'));
});

var concat = require('gulp-concat');
gulp.task('concat',function(){
  return gulp.src(['src/js/common.js','src/lib/jquery-1.10.1.min.js','src/js/index.js'])
             .pipe(concat('all.js'))
             .pipe(gulp.dest('dest/concat'));
});