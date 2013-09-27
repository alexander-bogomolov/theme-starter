/*global module:false*/
module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Meta data
    // Generates comment block over the code.
    meta: {
      banner: '/**\n' +
        ' * Project: <%= pkg.title || pkg.name %>\n' +
        ' * Version: <%= pkg.project_version %> - <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
        ' * Homepage: <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>\n' +
        ' * Author: <%= pkg.author.name %>\n' +
        ' */'
    },


    // Compass
    // Define configuration for the compass module: grunt-contrib-compass
    compass: {
      dev: {
        options: {
          config: 'compass-config-dev.rb'
        }
      },
      prod: {
        options: {
          config: 'compass-config-prod.rb'
        }
      }
    },


    // Detect errors and potential problems in JavaScript code
    // and used to enforce coding conventions.
    jshint: {
      beforeconcat: [
        'Gruntfile.js',
        '../assets/js/modules/**/*.js',
        '../assets/js/modules/*.js',
        '../assets/js/init/*.js'
      ],
      options: {
        // Enforcing Options - These options tell JSHint to be more strict towards your code.
        curly: true, // This option requires you to always put curly braces around blocks in loops and conditionals.
        eqeqeq: true, // This options prohibits the use of == and != in favor of === and !==.
        forin: true, // This option requires all for in loops to filter object's items.
        immed: true, // This option prohibits the use of immediate function invocations without wrapping them in parentheses.
        latedef: true, // This option prohibits the use of a variable before it was defined.
        newcap: true, // This option requires you to capitalize names of constructor functions.
        noarg: true, // This option prohibits the use of arguments.caller and arguments.callee. Both .caller and .callee make quite a few optimizations impossible so they were deprecated in future versions of JavaScript.
        undef: true, // This option prohibits the use of explicitly undeclared variables.
        unused: true, // This option warns when you define and never use your variables.
        trailing: false, // This option makes it an error to leave a trailing whitespace in your code.

        // Relaxing Options - These options allow you to suppress certain types of warnings.
        boss: true, // This option suppresses warnings about the use of assignments in cases where comparisons are expected.
        debug: false, // This option suppresses warnings about the debugger statements in your code.
        eqnull: true, // This option suppresses warnings about == null comparisons. Such comparisons are often useful when you want to check if a variable is null or undefined.
        evil: true, // This option suppresses warnings about the use of eval.
        onecase: true, // This option suppresses warnings about switches with just one case.
        sub: true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
        white: false, // This option make JSHint check your source code against Douglas Crockford's JavaScript coding style. Unfortunately, his “The Good Parts” book aside, the actual rules are not very well documented.

        // Environments - These options pre-define global variables that are exposed by popular JavaScript libraries and runtime environments—such as browser or node.js. Essentially they are shortcuts for explicit declarations like global $:false, jQuery:false.
        browser: true, // This option defines globals exposed by modern browsers: all the way from good ol' document and navigator to the HTML5 FileReader and other new developments in the browser world.
        devel: true, // This option defines globals that are usually used for logging poor-man's debugging: console, alert, etc. It is usually a good idea to not ship them in production because, for example, console.log breaks in legacy versions of Internet Explorer.
        jquery: true, // This option defines globals exposed by the jQuery JavaScript library.
        globals: {
          // third-party
          jQuery: true,
          Modernizr: true
        }
  }

    },


    // Concatenate all JavaScript files in one file: application.js
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      application: {
        src: [
          '<banner>',
          // ThirdParty
          // '../assets/third-party/',

          // Globale Module
          // '../assets/js/modules/',

          // Inits
          '../assets/js/init/application.init.js'
        ],
        dest: '../assets/js/application.js'
      }
    },


    // Minify the concated JavaScript file.
    uglify: {
      application: {
        files: {
          '../assets/js/application.min.js': [
            '<banner>',
            '<%= concat.application.dest %>'
          ]
        }
      }
    },

    // Run QUnit - JavaScript unit testing framework
    qunit: {
      files: ['../assets/test/**/*.html']
    },


    // Watch Task
    watch: {
      files: [
        '../assets/sass/*',
        '../assets/sass/**/*',
        '<%= jshint.beforeconcat %>'
      ],
      tasks: ['default']
    },


    concurrent: {
      dev: ['compass:dev', 'jshint:beforeconcat', 'concat']
    }

  });


  // Load modules
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concurrent');

  // Register Tasks
  // Run: grunt taskname
  // Example: grunt css
  grunt.registerTask('test', ['jshint:beforeconcat', 'qunit']);
  grunt.registerTask('css-dev', ['compass:dev']);
  grunt.registerTask('css-prod', ['compass:prod']);
  grunt.registerTask('js-dev', ['jshint:beforeconcat', 'concat']);
  grunt.registerTask('js-prod', ['jshint:beforeconcat', 'concat', 'uglify']);
  grunt.registerTask('prod', ['compass:dev', 'compass:prod', 'jshint:beforeconcat', 'concat', 'uglify']);
  grunt.registerTask('dev', ['compass:dev', 'jshint:beforeconcat', 'concat']);

  grunt.registerTask('default', ['concurrent:dev']);


};
