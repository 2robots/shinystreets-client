angular.module('shinystreets.FileUploader', [], function($provide){
  $provide.factory('FileUploader', function(Config, File, Authentication, $http){
    return function(files, success_cb, error_cb) {

      // Our FileUpload object
      var FileUploader = {

        // files upload endpoint
        postEndpoint: Config.endpoint + '/files',

        // files get policy endpoint
        policyEndpoint: Config.endpoint + '/files/sign',

        // the issue id, we want to upload the files to
        issue_id: null,

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
        init: function(files, issue_id, success_cb, error_cb){

          // if we can access the file uploader
          if(typeof(FileTransfer) != 'undefined' && typeof(FileUploadOptions) != 'undefined') {
            this.success_cb = success_cb;
            this.error_cb = error_cb;
            this.files = files;
            this.files_total = files.length;
            this.issue_id = issue_id;

          } else {
            error_cb('Can not access FileTransfer or FileUploadOptions');
            return false;
          }

          return this;
        },

        start: function(){

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

            console.log("start 1");

            // if there is at least one file left
            if(t.files.length > 0) {

              console.log("start 2");
              console.log(this.policyEndpoint);

              // get s3 policy
              $http({
                method: 'GET',
                url: this.policyEndpoint,
                params: {issue: this.issue_id},
                headers: { Authorization: auth.httpAuthorization() }
              }).

              // on get policy success
              success(function(data, status, headers, config){

                console.log("success 3");

                console.log("policy success");
                console.log(data);

                // get next file
                var file = t.files.pop();

                // upload file options
                var options = new FileUploadOptions();
                var filename = data.filename;
                var endpoint = "https://" + data.bucket + ".s3.amazonaws.com/";

                options.fileKey = "file";
                options.fileName = filename + '.jpeg';
                options.mimeType = 'image/jpeg';
                options.chunkedMode = false;

                options.params = {
                  "key": filename,
                  "AWSAccessKeyId": data.awsKey,
                  "acl": "public-read",
                  "policy": data.policy,
                  "signature": data.signature,
                  "Content-Type": 'image/jpeg'
                };

                // upload file
                var ft = new FileTransfer();

                console.log('######################');
                console.log('######################');
                console.log(file.uri);
                console.log(endpoint);
                console.log(options);

                ft.upload(file.uri, endpoint,

                  // success
                  function(response){

                    console.log(response);
                    t.files_success = t.files_success + 1;
                    t.responses.push(response);

                    // create file object on shs server
                    new File().create({
                      url: endpoint + filename,
                      parentIssue: t.issue_id
                    },

                    // success
                    function(){

                      console.log("SUCCES: creating file object on shs server");

                      // next!
                      t.start_intern();

                    },

                    // error
                    function(a, b){

                      console.log('######################');
                      console.log('######################');
                      console.log(a);
                      console.log(b);
                      alert("ERROR creating file object on shs server");
                    });


                  // error
                  }, function(response){

                    alert("Error uploading file to amazon!");

                    // next!
                    t.start_intern();

                }, options, true);


              // on get policy error
              }).error(function(data, status, headers, config) {

                console.log("error 3");

                alert("get policy error");
                return;
              });


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
