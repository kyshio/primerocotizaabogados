var ppa = angular.module('app.starter', ['ngRoute','indexFormC','ngTouch']);
ppa.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

          $routeProvider.
           when('/old', {
             templateUrl: 'templates/inicia.html',
              controller: 'IniciaController',

         }).
           when('/', {
             templateUrl: 'templates/isapres1.html',
              controller: 'IndexFormController',

         }).when('/edad',{
              templateUrl: 'templates/isapres2.html',
              controller: 'Index2FormController',

            }).when('/historial',{
              templateUrl: 'templates/isapres3.html',
              controller: 'Index3FormController',

            }).when('/preferencia',{
              templateUrl: 'templates/isapres4.html',
              controller: 'Index4FormController',

            }).when('/cargas',{
              templateUrl: 'templates/isapres5.html',
              controller: 'Index5FormController',

            }).when('/somos',{
              templateUrl: 'templates/somos.html',
              controller: 'somosController',

            }).when('/inversion',{
              templateUrl: 'templates/isapres6.html',
              controller: 'Index6FormController',

            }).when('/gracias',{
              templateUrl: 'templates/gracias.html',
              controller: 'Index7FormController',

            }).when('/aviso',{
              templateUrl: 'templates/aviso.html',
              controller: 'AvisoController',

            }).when('/login',{
              templateUrl: 'templates/user-login.html',
              controller: 'LoginController',

            })
            .when('/registro',{
              templateUrl: 'templates/registro.html',
              controller: 'RegistroController',

            }).when('/bienvenido',{
              templateUrl: 'templates/bienvenido.html',
              controller: 'BienvenidoController',

            }).when('/opps',{
              templateUrl: 'templates/opps.html',
              controller: 'OppsController',

            }).when('/password',{
              templateUrl: 'templates/password.html',
              controller: 'ForgotController',

            }).when('/maletin',{
              templateUrl: 'templates/mi-maletin.html',
              controller: 'BagController',

            }).when('/oportunidades',{
              templateUrl: 'templates/oportunidades.html',
              controller: 'DataFormController',

            }).when('/detalle',{
              templateUrl: 'templates/detalle.html',
              controller: 'DetailsController',

            }).when('/compra',{
              templateUrl: 'templates/compra.html',
              controller: 'BuyController',

            }).when('/logad',{
              templateUrl: 'templates/login-admin.html',
              controller: 'LogadController',

            }).when('/panel',{
              templateUrl: 'templates/panel.html',
              controller: 'PaneladminController',

            }).when('/compa2',{
              templateUrl: 'templates/vistavista.html',
              controller: 'CompraDosadminController',

            }).when('/land',{
              templateUrl: 'templates/landing.html',
              controller: 'landdingController',

            }).otherwise({redirectTo: '/'});




 if(window.history && window.history.pushState){
         $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });
        }
}]);