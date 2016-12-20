module.exports = function(grunt) {


 


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
 		dest: 'app.js'
 	},
 	css: {

 	}

 });






  // Default task(s).
  var defaultTasks = [ 'uglify', 'cssmin'];
 
  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('compile', ['concat']);
 	
};