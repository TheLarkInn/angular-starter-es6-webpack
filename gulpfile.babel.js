'use strict';

import gulp     from 'gulp';
import path     from 'path';
import concat   from 'gulp-concat';
import replace  from 'gulp-replace';
import clean    from 'gulp-clean';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import inject   from 'gulp-inject-string';
import merge    from 'merge-stream';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';

let root = './';

// helper method for resolving paths
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

let resolveToCommon = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/common', glob);
}

let resolveToServices = (glob) => {
  glob = glob || '';
  return path.join(root, 'app/services', glob);
}

let resolveToGlobalSCSS = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob);
}

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.test.js).js'), // exclude spec files
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankServiceTemplates: path.join(__dirname, 'generator', 'service/**/*.**')
};

// gulp component --name 'home'
gulp.task('component', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  let name = yargs.argv.name;
  let parentPath = yargs.argv.parent || '';
  let destPath = path.join(resolveToComponents(), parentPath, name);
  let indexPath = path.join(resolveToComponents(), parentPath, 'components.js');
  let scssPath = path.join(resolveToGlobalSCSS(), parentPath, 'index.scss');

  let includeAdditionallSCSSFileInGlobalIndex = gulp.src(scssPath)
    .pipe(inject.append(`\n@import "~components/${name}/${name}.scss";`))
    .pipe(clean({force: true}))
    .pipe(gulp.dest(resolveToGlobalSCSS()));    

  let addNewImportAndDependanciesToComponentsJS = gulp.src(indexPath)
    .pipe(inject.prepend(`import ${name}Component from './${name}/${name}';\n`))
    .pipe(replace(/INCLUDE_ALL_MODULES\(\[(.*)\]/, function(match) {
      if (match.match(/\[\]/)) {
        return match.replace(']', `${name}Component]`);
      } else {
        return match.replace(']', `, ${name}Component]`);
      }
    }))
    .pipe(clean({force: true}))
    .pipe(gulp.dest(resolveToComponents()));

  let createNewComponentBasedOnComponentTemplate = gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));

    return merge(
      merge(addNewImportAndDependanciesToComponentsJS, createNewComponentBasedOnComponentTemplate), 
      includeAdditionallSCSSFileInGlobalIndex
    );
});

// gulp common_component --name 'users' 
gulp.task('common_component', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  let name = yargs.argv.name;
  let parentPath = yargs.argv.parent || '';
  let destPath = path.join(resolveToCommon(), parentPath, name);
  let indexPath = path.join(resolveToCommon(), parentPath, 'components.js');
  let scssPath = path.join(resolveToGlobalSCSS(), parentPath, 'index.scss');

  let includeAdditionallSCSSFileInGlobalIndex = gulp.src(scssPath)
    .pipe(inject.append(`\n@import "~common/${name}/${name}.scss";`))
    .pipe(clean({force: true}))
    .pipe(gulp.dest(resolveToGlobalSCSS()));    

  let addNewImportAndDependanciesToComponentsJS = gulp.src(indexPath)
    .pipe(inject.prepend(`import ${name}Component from './${name}/${name}';\n`))
    .pipe(replace(/INCLUDE_ALL_MODULES\(\[(.*)\]/, function(match) {
      if (match.match(/\[\]/)) {
        return match.replace(']', `${name}Component]`);
      } else {
        return match.replace(']', `, ${name}Component]`);
      }
    }))
    .pipe(clean({force: true}))
    .pipe(gulp.dest(resolveToCommon()));

  let createNewCommonComponentBasedOnComponentTemplate = gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));

    return merge(
      merge(addNewImportAndDependanciesToComponentsJS, createNewCommonComponentBasedOnComponentTemplate), 
      includeAdditionallSCSSFileInGlobalIndex
    );
});

// gulp service --name <name> 
gulp.task('service', () => {
  let cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  let name = yargs.argv.name;
  let parentPath = yargs.argv.parent || '';
  let destPath = path.join(resolveToServices(), parentPath, name);
  let indexPath = path.join(resolveToServices(), parentPath, 'services.js');

  let addNewImportAndDependanciesToServiceJS = gulp.src(indexPath)
    .pipe(inject.prepend(`import ${name}Service from './${name}/${name}';\n`))
    .pipe(replace(/INCLUDE_ALL_MODULES\(\[(.*)\]/, function(match) {
      if (match.match(/\[\]/)) {
        return match.replace(']', `${name}Service]`);
      } else {
        return match.replace(']', `, ${name}Service]`);
      }
    }))
    .pipe(clean({force: true}))
    .pipe(gulp.dest(resolveToServices()));

  let createNewServiceFilesWithProperDirectory = gulp.src(paths.blankServiceTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));

  return merge(addNewImportAndDependanciesToServiceJS, createNewServiceFilesWithProperDirectory);
});

