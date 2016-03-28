(function() {
    "use strict";

    angular
        .module("appBlog")
        .service("httpService", httpService);

    httpService.$inject = ["$q", "$http"];

    function httpService($q, $http) {
        /*jshint validthis:true */
        this.getData = getData;
        this.getServerTime = getServerTime;
        this.request = request;

        function getData() {}

        function getServerTime(config) {

            if (!config) {
                config = {
                    method: "GET",
                    url: "api/rpc/getServerTime",
                    params: {},
                    data: {},
                    timeout: 50000,
                    responseType: "text"
                };
            }
            return $http(config);
        }

        function request(config) {
            var deferred = $q.defer();

            // GET request:
            $http(config).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
})();