
/** declaration of AngularJS module */
// Refertence: http://stackoverflow.com/questions/19957280/angularjs-best-practices-for-module-declaration
// NOTE: the immediately invoked function expression is used to exemplify different files and is not required
(function() {
    "use strict";
    // declaring the module in one file / anonymous function
    // (only pass a second parameter THIS ONE TIME as a redecleration creates bugs which are very hard to dedect)
    angular.module("appBlog", ["ngResource", "ui.router", "ui.bootstrap", "AdalAngular"]);
})();

(function() {
    "use strict";
    // declaring the module in one file / anonymous function
    // (only pass a second parameter THIS ONE TIME as a redecleration creates bugs which are very hard to detect)
    angular.module("appBlog")
        .constant("tenant", "[Enter your tenant name here e.g. contoso.onmicrosoft.com]")
        .constant("audience", "[Enter your clientId here e.g. e9a5a8b6-8af7-4719-9821-0deef255f68e]")
        .constant("apiUri", "/api/")
        .constant("endpoints", { 'https://dev.com:44304/api/': "https://dev.com/SomeApi" })
        .value("error", "");
})();

(function() {
    // accessing the module in another.
    // this can be done by calling angular.module without the []-brackets
    angular.module("appBlog")
        .config(configFn) // Function created after this statement, Hoisted at Run-Time
        .run(runHandler); // Function created after this statement, Hoisted at Run-Time;

    configFn.$inject = [
        "$httpProvider",
        "$stateProvider",
        "$urlRouterProvider",
        "adalAuthenticationServiceProvider", "apiUri", "tenant", "audience", "endpoints"
    ];

    function configFn(
        $httpProvider,
        $stateProvider,
        $urlRouterProvider,
        adalAuthenticationServiceProvider, apiUri, tenant, audience, endpoints) {

        routes($urlRouterProvider, $stateProvider);
        adal($httpProvider, adalAuthenticationServiceProvider, tenant, audience, endpoints);

    }

    function routes($urlRouterProvider, $stateProvider) {

        // For any unmatched url, redirect to index
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state("root", {
                abstract: true,
                views: {
                    'header': {
                        templateUrl: "partials/_header.html"
                    },
                    'footer': {
                        templateUrl: "partials/_footer.html"
                    }
                }
            })
            .state("root.index", {
                url: "/",
                requireADLogin: false,
                views: {
                    'content@': {
                        templateUrl: "partials/_index.html"
                    }
                }
            })
            .state("root.blog", {
                url: "/blog",
                requireADLogin: true,
                views: {
                    'content@': {
                        templateUrl: "partials/_blog.html"
                    }
                }
            })
            .state("root.admin", {
                url: "/admin",
                requireADLogin: true,
                views: {
                    'content@': {
                        templateUrl: "partials/_admin.html"
                    }
                }
            })
            .state("root.review", {
                url: "/review",
                requireADLogin: true,
                views: {
                    'content@': {
                        templateUrl: "partials/_review.html"
                    }
                }
            });
    }

    function adal($httpProvider, adalAuthenticationServiceProvider, tenant, audience, endpoints) {
        /*    ADAL    */
        // endpoint to resource mapping(optional)
        // configure AAD Authentication
        adalAuthenticationServiceProvider.init(
            {
                instance: "https://login.microsoftonline.com/",
                tenant: tenant, // multi-tenant support. Adal will set tenant to 'common', if it is not specified in the config.
                clientId: audience,
                extraQueryParameter: "nux=1",
                cacheLocation: "sessionStorage" //'localStorage' // enable this for IE, as sessionStorage does not work for localhost.
                // Also, token acquisition for the WebAPI will fail in IE when running on localhost, due to IE security restrictions.
                // endpoints: endpoints  // If you need to send CORS api requests.
            },
            $httpProvider
        );
    }

    runHandler.$inject = ["$templateRequest"];

    function runHandler($templateRequest) {
        $templateRequest("partials/_index.html", true);
        $templateRequest("partials/_blog.html", true);
        $templateRequest("partials/_admin.html", true);
        $templateRequest("partials/_publish.html", true);
        $templateRequest("partials/_header.html", true);
        $templateRequest("partials/_footer.html", true);
        $templateRequest("partials/_review.html", true);
    }
})();