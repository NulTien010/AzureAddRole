(function() {
    "use strict";

    angular
        .module("appBlog")
        .controller("blogController", blogController);

    blogController.$inject = ["$scope", "$rootScope", "$log", "$state", "httpService", "apiUri"];

    function blogController($scope, $rootScope, $log, $state, httpService, apiUri) {
        $scope.title = "blogController";
        $scope.isWriter = null;
        $scope.isEditor = null;
        $scope.isAdmin = null;
        $scope.newblog = newblog;
        $scope.reviewandpublish = reviewandpublish;
        $scope.adminapplication = adminapplication;
        activate();

        function activate() {
            validateCredentials();
        }

        function validateCredentials() {

            if ($rootScope.userInfo.isAuthenticated) {
                switch ($rootScope.userInfo.profile.roles[0]) {
                case "Writer":
                    $scope.isWriter = true;
                    break;
                case "Editor":
                    $scope.isEditor = true;
                    break;
                case "Admin":
                    $scope.isAdmin = true;
                    break;
                default:
                }
            }
        }

        function newblog(event) {

            event.preventDefault();
            var url = apiUri.concat("blog/newpost");
            var config = { method: "GET", url: url, params: {}, timeout: 300000, cache: false };
            httpService.request(config).then(function(response) {
                $log.info("GET completed successfuly. Status: " + response.status);
                // redirect to new blog write page
                $state.go("root.blog");
            }, function(response) {
                $log.error(response.statusText, response.status);
            });
        }

        function reviewandpublish(event) {

            event.preventDefault();
            var url = apiUri.concat("blog/reviewandpublish");
            var config = { method: "GET", url: url, params: {}, timeout: 300000, cache: false };
            httpService.request(config).then(function(response) {
                $log.info("GET completed successfuly. Status: " + response.status);
                // redirect to new blog write page
                $state.go("root.review");
            }, function(response) {
                $log.error(response.statusText, response.status);
            });
        }

        function adminapplication(event) {

            event.preventDefault();
            var url = apiUri.concat("admin/administer");
            var config = { method: "GET", url: url, params: {}, timeout: 300000, cache: false };
            httpService.request(config).then(function(response) {
                $log.info("GET completed successfuly. Status: " + response.status);
                // redirect to new blog write page
                $state.go("root.admin");
            }, function(response) {
                $log.error(response.statusText, response.status);
            });
        }
    }
})();