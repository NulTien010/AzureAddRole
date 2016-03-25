(function() {
    "use strict";

    angular
        .module("appBlog")
        .controller("authenticationController", authenticationController);

    authenticationController.$inject = ["$scope", "adalAuthenticationService"];

    function authenticationController($scope, adalAuthenticationService) {
        $scope.title = "authenticationController";
        $scope.login = login;
        $scope.logOut = logout;

        function login() {
            adalAuthenticationService.login();
        }

        function logout() {
            adalAuthenticationService.logOut();
        }
    }
})();