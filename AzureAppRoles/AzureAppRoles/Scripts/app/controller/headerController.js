(function() {
    "use strict";

    angular
        .module("appBlog")
        .controller("headerController", headerController);

    headerController.$inject = ["$scope", "$rootScope", "adalAuthenticationService"];

    function headerController($scope, $rootScope, adalAuthenticationService) {
        $scope.title = "headerController";
        $scope.login = login;
        $scope.logout = logout;

        function login() {
            adalAuthenticationService.login();
        }

        function logout() {
            adalAuthenticationService.logOut();
        }
    }
})();