module.exports = function(grunt) {

var modes = {
  'development' : 1, //concat
  'production' : 0 //uses minify,  dont copy ajax folder
};

var environments = {
  browser : 1,
  mobile  : 2,
  web     : 3
};

 var env  = environments.browser; //browser, mobile, webtype
 var mode = modes.development; //development or production

  var target = grunt.option('target');
  var extension = "";
  if (target  ==  'minify'){
    extension = ".min.";
  }

  var js_files =  [
        'src/js/jquery.js',
        'src/js/jquery.mobile-1.4.5.js' ,
        'src/js/jquery.validate.min.js' ,
         mode == modes.development ? 'src/js/constants-dev.js' : 'src/js/constants.js',
        'src/js/OnlineRequest.js',
        'src/js/main.js'
      ];

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
      watch: {
        files: ['Gruntfile.js','<%= htmlbuild.dist.src %>', 'sections/**/*.html', 'src/**/*.*'],
        tasks: ['concat', 'htmlbuild', 'copy']
      },
      'http-server': {
        dev:{
        root : 'build/',
        port: '1337',
        openBrowser: true
        }
      }
	  });

    //TODO single array of files to be minified
  	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
	   options: {
	    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
     dist: {
        src: js_files,
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  	);


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin',
  	{
    	dist: {
    		src: "build/src/<%= pkg.name %>.css",
    		dest: "build/src/<%= pkg.name %>.min.css"
    	}
   });


 grunt.loadNpmTasks('grunt-contrib-concat');
 grunt.config('concat' , {
 	options:{

 	},
 	js: {
 		src: js_files,
 		dest: 'build/<%= pkg.name %>.js'
 	},
 	css: {
    src: [  'src/css/jquery.mobile-1.4.5.css', 'src/css/jquerymobile.nativedroid.css' ],
    dest: 'build/src/css/<%= pkg.name %>.css'
 	}

 });


grunt.loadNpmTasks('grunt-html-build');
grunt.config('htmlbuild', {
	dist:{
		src: 'index.html',
		dest: 'build',
		options:{
      scripts:{
        bundle: ['build/<%= pkg.name %>' + extension +'.js']
      },
      styles: {
        bundle: ['build/src/css/<%= pkg.name %>' + extension + '.css']
      },
			sections: {
				layout: {
					navbar: 'sections/navbar.html'
				},
        page:{
          load: 'sections/page_load.html',
          report: 'sections/page_report.html'
        }
			}
		}
	}

});


  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    main:{
      files:[
        {
          expand: true,
          src: [
            'src/css/fonts/**',
            'src/css/images/**',
            'src/css/jquerymobile.nativedroid.*.css',
            'src/css/font-awesome.min.css',
            'ajax/**'
            ],
          dest: 'build/',
        }
      ]
    }
  });

  // Default task(s).


var defaultTasks = ['copy'];
  if (target == "minify"){
    defaultTasks =  defaultTasks.concat([ 'uglify', 'cssmin', 'htmlbuild']);
  }else{
    defaultTasks = defaultTasks.concat( [ 'concat', 'htmlbuild'] );
  }

defaultTasks = defaultTasks.concat('watch')


  grunt.registerTask('default', defaultTasks);
  //grunt.registerTask('watch',[ 'watch'] );
  grunt.registerTask('serve', ['http-server']);

};
