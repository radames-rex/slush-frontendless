/*
 * slush-frontendless
 * https://github.com/dev-sandman/slush-frontendless
 *
 * Copyright (c) 2016, dev-sandman
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer');


gulp.task('default', function(done) {

console.log('..............DEV-SANDMAN,..............');
console.log('.........,.,,,,,,,,,,.,,,,,.,...........');
console.log('...........,MD?~+?=ONON7DN,.............');
console.log('....,....,8$N8=~~:ONZ,~~8ZDM,...........');
console.log('.,......DNI?I8DM8N~?:~+NZD88~M,.........');
console.log(',,,,...DDN=.,N+?8NI,,:DONNM++=D,........');
console.log(',,,,.,,NN~8.+7=:~=::~$:NND,.,,,N........');
console.log('...,.,NDDZN,,.,,.=+Z~MNZ?N..~:,N......,.');
console.log('......NDD,ND.,..OIDDM8:,.+.,+NON~.......');
console.log('......NM?N,OON8DN?NNN8DN,.:NM~NM........');
console.log('......MMDZI+MDNNMNMI$NON,,MM:DMD,.......');
console.log('......,NDN$7NN87DDN=IOND?+DNIN8:.,......');
console.log('.......~MMMD+N,N$NN+~+N8NN$ZDNM,.,......');
console.log('........,NMNDNMNDN7:,8MNN?MNDN..........');
console.log('..........,NMMMODN==:~8NNDNN8...........');
console.log('...,,......,M=~~N+~,,~+~:D,.............');
console.log('............,.=DMNN:+=N+O,..............');
console.log('..............OZO8NI8:=?,,...,..........');
console.log('..............,M$ND:=7,,7,,............,');
console.log('.............DN~8I+,:=DN,,,............,');
console.log('..............,+N7=,,=:,................');
console.log('..............,.MODMNND,,,.,............');
console.log('........................................');
console.log(' ');
    //Answers
    var prompts = [{
        name: 'appName',
        message: 'What the name of project?'
    }, {
        name: 'appDescription',
        message: 'What the description?'
    }, {
        name: 'appVersion',
        message: 'What the version?',
        default: '0.1.0'
    }, {
        name: 'appAuthor',
        message: 'Name of author?'
    }, {
        name: 'appEmail',
        message: 'Author e-mail?'
    }, {
        type: 'checkbox',
        name: 'appLibraries',
        message: 'Select Libraries?',
        choices: ['angular','d3','font-awesome','polymer','bootstrap','zepto']
    }, {
        name: 'appRepository',
        message: 'What the repository?',
    }];

    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.appName) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName)
            answers.appAuthorSlug = _.slugify(answers.appAuthor)
            answers.appHtmlLibsJS = []
            answers.appHtmlLibsCSS = []
            if(typeof answers.appLibraries!=undefined){
              answers.appLibraries.forEach(function(element,index){
                switch (element) {
                  case 'angular':
                    answers.appHtmlLibsJS.push('<script src="libraries/angular/angular.min.js"></script>')
                  break;
                  case 'd3':
                    answers.appHtmlLibsJS.push('<script src="libraries/d3/d3.min.js"></script>')
                  break;
                  case 'font-awesome':
                    answers.appHtmlLibsCSS.push('<link rel="stylesheet" href="libraries/font-awesome/css/font-awesome.min.css">')
                  break;
                  case 'polymer':
                    answers.appHtmlLibsCSS.push('<link rel="import" href="libraries/polymer/polymer.html">')
                    answers.appHtmlLibsJS.push('<script scr="libraries/webcomponentsjs/webcomponents.min.js"></script>')
                  break;
                  case 'bootstrap':
                    answers.appHtmlLibsCSS.push('<link rel="stylesheet" href="libraries/bootstrap/dist/css/bootstrap.min.css">')
                  break;
                  case 'zepto':
                    answers.appHtmlLibsJS.push('<script scr="libraries/zepto/zepto.min.js"></script>')
                  break;
                }
                answers.appLibraries[index]='"'+element+'":"latest"';
              });
              answers.appLibraries.join()
              answers.appHtmlLibsJS = answers.appHtmlLibsJS.join(' \n    ')
              answers.appHtmlLibsCSS = answers.appHtmlLibsCSS.join(' \n    ')
            }
            gulp.src(__dirname + '/templates/**')
                .pipe(template({
                  appNameSlug:answers.appNameSlug,
                  appAuthorSlug:answers.appAuthorSlug,
                  appLibraries:answers.appLibraries,
                  appVersion:answers.appVersion,
                  appDescription:answers.appDescription,
                  appEmail:answers.appEmail,
                  appName:answers.appNameSlug,
                  appAuthor:answers.appAuthorSlug,
                  appRepository:answers.appRepository,
                  appLibraries:answers.appLibraries,
                  appHtmlLibsJS:answers.appHtmlLibsJS,
                  appHtmlLibsCSS:answers.appHtmlLibsCSS
                }))
                .pipe(rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});
