angular.module('shinystreets.FileUploader', [], function($provide){
  $provide.factory('FileUploader', function(Config, Authentication){
    return function() {

      // Our FileUpload object
      var FileUploader = {

        // The localStorage key to store the token
        postEndpoint: Config.endpoint + '/file',

        // success callback
        success_cb: null,

        // error callback
        error_cb: null,

        // success file counter
        files_success: 0,

        // total file counter
        files_total: 0,

        // file type
        file_type: 'image/jpeg',

        // files
        files: [],

        // responses
        responses: [],


        /**
         * Initialize the FileUploader object with params.
         */
        init: function(files, success_cb, error_cb){

          // if we can access the file uploader
          if(FileTransfer && FileUploadOptions) {
            this.success_cb = success_cb;
            this.error_cb = error_cb;
            this.files = files;
            this.files_total = files.length;

          } else {
            error_cb('Can not access FileTransfer or FileUploadOptions');
            return false;
          }

          return this;
        },


        /**
         * Start uploading files.
         */
        start: function(params){

          var auth = Authentication();

          // if we have a token, let's inject it
          if(auth.loggedin()) {

            // if there is at least one file left
            if(this.files.length > 0) {

              // get next file
              var file = this.files.pop();

              // upload file options
              var options = new FileUploadOptions();
              options.fileKey = "file";
              options.fileName = this.files_success + '.jpeg';
              options.mimeType = this.file_type;
              options.params = params;
              options.params.headers = { Authorization: auth.httpAuthorization() };

              // upload file
              var ft = new FileTransfer();
              ft.upload(file.uri, encodeURI(this.postEndpoint),

                // success
                function(response){

                  this.files_success = this.files_success + 1;
                  this.responses.push(response);

                  // next!
                  this.start();

                // error
                }, function(response){

                  this.responses.push(response);

                  // next!
                  this.start();

              }, options);



            // if we finished all files, call success callback
            } else {
              this.success_cb(this.responses, this.files_success, this.files_total);
            }

          // if we are not logged in
          } else {
            error_cb('Not authenticated');
            return false;
          }

          return this;
        }
      };

      // return a new initialized FileUploader object
      return FileUploader.init();
    };
  });
});
