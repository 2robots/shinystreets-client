angular.module('shinystreets.FileUploader', [], function($provide){
  $provide.factory('FileUploader', function(Config, Authentication){
    return function(files, success_cb, error_cb) {

      // Our FileUpload object
      var FileUploader = {

        // The localStorage key to store the token
        postEndpoint: Config.endpoint + '/files',

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

          console.log("Fileuploader init");

          // if we can access the file uploader
          if(typeof(FileTransfer) != 'undefined' && typeof(FileUploadOptions) != 'undefined') {
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

        start: function(params){
          this.awsKey = params.awsKey;
          this.policy = params.policy;
          this.signature = params.signature;
          this.bucket = params.bucket;
          this.parentId = params.parentId;

          this.start_intern();
        },

        /**
         * Start uploading files.
         */
        start_intern: function(){

          var auth = Authentication();
          var t = this;

          console.log("start");

          // if we have a token, let's inject it
          if(auth.loggedin()) {

            // if there is at least one file left
            if(t.files.length > 0) {

              // get next file
              var file = t.files.pop();

              // upload file options
              var options = new FileUploadOptions();
              var filename = t.parentId + '_' + t.files_success;
              var endpoint = "https://" + t.bucket + ".s3.amazonaws.com/";

              options.fileKey = "file";
              options.fileName = filename + '.jpeg';
              options.mimeType = t.file_type;
              options.chunkedMode = false;

              options.params = {
                "key": filename,
                "AWSAccessKeyId": t.awsKey,
                "acl": "public-read",
                "policy": t.policy,
                "signature": t.signature,
                "Content-Type": t.file_type
              };

              // upload file
              var ft = new FileTransfer();

              console.log(file);
              console.log(endpoint);

              ft.upload(file.uri, endpoint,

                // success
                function(response){

                  console.log(response);
                  t.files_success = t.files_success + 1;
                  t.responses.push(response);

                  // next!
                  t.start_intern();

                // error
                }, function(response){

                  console.log(response);
                  t.responses.push(response);

                  // next!
                  t.start_intern();

              }, options, true);



            // if we finished all files, call success callback
            } else {
              t.success_cb(t.responses, t.files_success, t.files_total);
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
      return FileUploader.init(files, success_cb, error_cb);
    };
  });
});
