(function() {
    "use strict";

    angular
        .module("appBlog")
        .service("httpService", httpService);

    httpService.$inject = ["$q", "$http"];

    function httpService($q, $http) {
        this.getData = getData;
        this.getServerTime = getServerTime;
        this.request = request;
        this.sample = sample;

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
        };

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

        function sample(config) {
            // http post
            if (!config) {
                // var config = { method: "POST", url: "api/credit/downloadcloud", data: viewModel, timeout: 300000 };
                // var config = { method: "GET", url: url, params: {'id': 0}, timeout: 300000, cache: false, withCredentials: false,  headers: { 'Content-Type': undefined} };
                // var config = { method: "POST", url: "api/pdfresource/subscriber", data: $scope.pdfResource, timeout: 300000, cache: false, withCredentials: false };
                config = { method: "POST", url: "api/pdfresource/subscriber", data: $scope.pdfResource, timeout: 300000, cache: false, withCredentials: false };
            }

            /*
                The response object has these properties:
            
                data – {string|Object} – The response body transformed with the transform functions.
                status – {number} – HTTP status code of the response.
                headers – {function([headerName])} – Header getter function.
                config – {Object} – The configuration object that was used to generate the request.
                statusText – {string} – HTTP status text of the response.
            
            */
            httpService.request(config).then(function(response) {
                $log.info("POST completed successfuly. Status: " + response.status);
            }, function(response) {
                $log.error(response.statusText, response.status);
            });
        }
    }
})();