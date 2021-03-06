/*global module:false*/
module.exports = function (grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    jitGrunt: true,
    init:     true,
    data:     {
      pkg:  grunt.file.readJSON('package.json'),
      banner: '/**\n' +
              ' * Project:  <%= pkg.title || pkg.name %>\n' +
              ' * Version:  <%= pkg.version %>\n' +
              ' * \n' +
              ' * Author:   <%= pkg.author.name %>\n' +
              ' * Homepage: <%= pkg.homepage %>\n' +
              ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>\n' +
              ' * \n' +
              ' * Build:    <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
      ' */'
    }
  });

};
