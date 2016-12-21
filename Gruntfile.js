module.exports = function(grunt) {


 
  var target = grunt.option('target');
  var extension = "";
  if (target  ==  'minify'){
    extension = ".min.";
  }

	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json')
	  });


  	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', { 
	   options: {
	    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
     dist: {
        src: ['src/js/jquery.js', 'src/js/jquery.mobile-1.4.5.js' ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  	);


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', 
  	{
    	dist: {
    		src: "build/<%= pkg.name %>.css",
    		dest: "build/<%= pkg.name %>.min.css"
    	}
   });


 grunt.loadNpmTasks('grunt-contrib-concat'); 
 grunt.config('concat' , {
 	options:{

 	},
 	js: {
 		src: ['src/js/jquery.js', 'src/js/jquery.mobile-1.4.5.js' ],
 		dest: 'build/<%= pkg.name %>.js'
 	},
 	css: {
    src: ['src/css/font-awesome.min.css' , 'src/css/jquery.mobile-1.4.5.css', 'src/css/jquerymobile.nativedroid.css' ],
    dest: 'build/<%= pkg.name %>.css'
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
        bundle: ['build/<%= pkg.name %>' + extension + '.css']
      },
			sections: {
				layout: {
					navbar: 'sections/navbar.html'
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
            'src/css/jquerymobile.nativedroid.*.css'
            ],
          dest: 'build/'
        }
      ]
    }
  });


  // Default task(s).


var defaultTasks = ['copy'];
  if (target == "minify"){
      defaultTasks.concat([ 'uglify', 'cssmin', 'htmlbuild']);
  }else{
      defaultTasks.concat( [ 'concat', 'htmlbuild'] );
  }
  

 
  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('compile', ['concat']);
 	
};