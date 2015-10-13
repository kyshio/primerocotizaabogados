
var app = angular.module('indexFormC', ['ngResource','ngTable', 'ngCookies', 'ngRoute'])
.factory("formularios", function() {
  return {
    data: {}
  };
}).factory("login", function() {
  return {
    data: {}
  };
}).factory("dataResource", function ($resource) {  return $resource("js/data.json", {}, { get: { method: "GET", isArray: true } }) 
}).filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }
        var value = tel.toString().trim().replace(/^\+/, '');
            if(value.length >= 8 && value.length <=10)
            {
              if(value.charAt(0)=="0"){return 'el numero no puede comenzar con 0'};
              if(value.substring(0,1)=="56"){value = value.substring(2, value.length);};
              if(value.charAt(0)=="1"){return 'el numero no puede comenzar con 1'};
              if(value.charAt(0)=="2" ||  value.charAt(0)=="3"){ return '+562'+value; };
              if(value.charAt(0)=="9" || value.charAt(0)=="8" || value.charAt(0)=="7" || value.charAt(0)=="6" || value.charAt(0)=="5" || value.charAt(0)=="4")
              {
                if(value.length == 8){
                  return '+569'+value;
                }else{
                  value = value.substring(value.length-8, value.length);
                }
                
              };
            };
            if(value.length >= 11){ return '+'+value; };
        
    };
}).controller('IniciaController', function($scope,$http, $location, formularios) {
  //var socket = io.connect('http://186.64.122.137:3000'); 


})

.controller('IndexFormController', function($scope, $location,$http, formularios, $filter, $timeout) {
   if(formularios.data.form1){
    console.log(formularios.data.form1);
    formularios.data.form1 = {};
    console.log(formularios.data.form1);

   };
    $scope.test = 'Cotiza sin costo';
    $scope.master = {};
     $scope.update = function(user) {
      $scope.notvalid="";
      if (angular.isDefined(user) && user.hasOwnProperty('name') && user.hasOwnProperty('phone') && user.hasOwnProperty('email')){
      if(user.phone.length == 7 && user.phone.charAt(0)==1 &&  user.phone.charAt(0)==0){ $scope.notvalid = "Oops! Al parecer el número de teléfono que ingresaste no es correcto, por favor inténtalo de nuevo. Ej Fijo: +56 2 32039649 , Ej Celular: +56 9 78893429";
      }else{
      $scope.phone = $filter('tel')(user.phone);
      if($scope.phone == 'el numero no puede comenzar con 1'){
        $scope.notvalid = $scope.phone;
        $timeout(function(){ $scope.notvalid = ""; }, 8000);
        return false;
      };
      if($scope.phone == 'el numero no puede comenzar con 0'){
        $scope.notvalid = $scope.phone;
        $timeout(function(){ $scope.notvalid = ""; }, 8000);
        return false;
      };
      $scope.notvalid="";
      $scope.id = btoa(user.email+user.name+$scope.phone);
      formularios.data.id = $scope.id;
      formularios.data.form1 = user;
      formularios.data.form1.phone = $scope.phone;
      $scope.data = {"id":formularios.data.id,"form":formularios.data.form1,"step":"1"};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        //console.log($scope.data);
        console.log(res);
        if (res=='ya existe') {
          $scope.notvalid = "Ya te encuentras cotizando";
          return false;
        };
        $location.path('edad');
        })
     .error(function (err, status) {
      console.log(err);
      });
        };
          }else{
           if( angular.isDefined(user)){

              
             if(!user.hasOwnProperty('phone')){
              
              $scope.notvalid = "El numero de telefono es muy corto o esta mal escrito.";
              $timeout(function(){ $scope.notvalid = ""; }, 8000);
              return false;
            };

            if(!user.hasOwnProperty('email')){
              
              $scope.notvalid = "Indica un correo electronico valido..";
              $timeout(function(){ $scope.notvalid = ""; }, 8000);
              return false;
            };}else{
              $scope.notvalid = 'Debes indicar tu nombre...';
              $timeout(function(){ $scope.notvalid = ""; }, 8000);
              return false;
            }
            };
    };


}).controller('Index2FormController', function($scope,$http, $location, formularios, $timeout, dataResource) {
 if(formularios.data.form2){
    console.log(formularios.data.form2);
    formularios.data.form2 = {};
    console.log(formularios.data.form2);

   };
  //var socket = io.connect('http://186.64.122.137:3000'); 
    $scope.test = 'Edad y Genero';
    $scope.master = {};
    formularios.data.form2 = {};
   
    $scope.sampleProductCategories = dataResource.get();

     $scope.update2 = function(user, r, c) {
      
      $scope.notvalid = "";
      if(r==undefined && c==undefined){$scope.notvalid = "Falta Elejir la region y comuna.";$timeout(function(){ $scope.notvalid = ""; }, 8000);return false;};
      if(!angular.isDefined(user)){$scope.notvalid = "Falta elejir genero.";$timeout(function(){ $scope.notvalid = ""; }, 8000);return false;};
      if (user.hasOwnProperty('age')) { $scope.edad = parseInt(user.age); }else{ $scope.edad = 0; };
      if (angular.isDefined(user) && user.hasOwnProperty('gender') && user.hasOwnProperty('age') && $scope.edad > 17 ){
      formularios.data.form2 = user;
      $scope.data = {"id":formularios.data.id,"form":formularios.data.form2,"region":r.name,"commune":c.name,"step":"2"};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        console.log(res);
        $location.path('historial');
        })
     .error(function (err, status) {
      console.log(err);
      });
          }else{

            if( angular.isDefined(user)){

              
             if(!user.hasOwnProperty('age')){
              
              $scope.notvalid = "Falta la edad.";
              $timeout(function(){ $scope.notvalid = ""; }, 8000);
              return false;
            };

            };


            };
      
    };


}).controller('Index3FormController', function($scope,$http, $location, formularios, $timeout) {
 if(formularios.data.form3){
    console.log(formularios.data.form3);
    formularios.data.form3 = {};
    console.log(formularios.data.form3);

   };
  //var socket = io.connect('http://186.64.122.137:3000'); 
    $scope.test = 'Historial';
    $scope.master = {};
    formularios.data.form3 = {};
     $scope.update3 = function(user) {
      $scope.notvalid = "";
      if(!angular.isDefined(user)){$scope.notvalid = "Falta indicar isapre actual.";$timeout(function(){ $scope.notvalid = ""; }, 8000);return false;};
      if (angular.isDefined(user) && user.hasOwnProperty('current') && user.hasOwnProperty('year')){
      
      formularios.data.form3 = user;
      $scope.data = {"id":formularios.data.id,"form":formularios.data.form3,"step":"3"};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        //console.log($scope.data);
        console.log(res);
        $location.path('preferencia');
        })
     .error(function (err, status) {
      console.log('fail');
      });
          }else{
            if(!user.hasOwnProperty('current')){

              $scope.notvalid = "Indique en que isapre se encuentra actualmente.";
              $timeout(function(){ $scope.notvalid = ""; }, 8000);return false;
            }
             if(!user.hasOwnProperty('year')){
              
              $scope.notvalid = "Indique la antiguedad en su isapre.";
              $timeout(function(){ $scope.notvalid = ""; }, 8000);return false;
            }


            };
       
    };


}).controller('Index4FormController', function($scope, $http, $location, formularios) {
   if(formularios.data.form4){
    console.log(formularios.data.form4);
    formularios.data.form4 = {};
    console.log(formularios.data.form4);

   };

  
  //var socket = io.connect('http://186.64.122.137:3000'); 
  
    $scope.test = 'Preferencias';
    $scope.master = {};
    formularios.data.form4 = {};
    $scope.isapres = [
    {isapre:{val:'Banmedica'}},
    {isapre:{val:'Consalud'}}, 
    {isapre:{val:'Vida Tres'}}, 
    {isapre:{val:'Colmena'}}, 
    {isapre:{val:'Cruz Blanca'}}, 
    {isapre:{val:'Masvida'}}];
    $scope.preference = {};
    
     $scope.update4 = function(user) {
      $scope.invalid = "";
      formularios.data.form4 = user;
      angular.forEach($scope.preference, function(value, key) {
        if($scope.preference[key]==false){
          delete $scope.preference[key];
        };
      
      });
      if(formularios.data.form4 == undefined)
      {
        formularios.data.form4 = {"clinic":"Sin preferencias"};

      };

      
      if (Object.getOwnPropertyNames($scope.preference).length != 0){
      
      
      $scope.data = {"id":formularios.data.id,"form":formularios.data.form4,"step":"4", "preference":$scope.preference};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        //console.log($scope.data);
        console.log(res);
        $location.path('cargas');
        })
     .error(function (err, status) {
      console.log(err);
      });
          }else{
            if(Object.getOwnPropertyNames($scope.preference).length === 0){

              $scope.invalid = "Falta elejir una isapre de  preferencia al menos.";
            };


            };
       
    };


}).controller('Index5FormController', function($scope,$http, $location, formularios) {
    if(formularios.data.form5){
    console.log(formularios.data.form5);
    formularios.data.form5 = {};
    console.log(formularios.data.form5);

   };
  //var socket = io.connect('http://186.64.122.137:3000'); 
    $scope.test = 'Cargas Legales';
    $scope.master = {};
    formularios.data.form5 = {};
  var cargas = $scope.cargas = [];
  //$scope.cargas = '';
  $scope.addExp = function(sex,age) {
    $scope.notvalid ="";
    if(sex != undefined && age!= undefined && sex && age){
    up = 'Sexo: '+sex+' | Edad:'+age;
    cargas.push(up);
    $scope.edad = null;
  }else{
    $scope.notvalid = "Cuando quieras agregar cargas, debes indicar el sexo y edad."
    $scope.edad = null;
    edad = null;
    age = null;
  };};

  $scope.removeExp = function(index) {
    cargas.splice(index, 1);
  };


     $scope.update5 = function() {
      console.log($scope.sex);
      console.log($scope.edad);
      $scope.invalid = "";
      if (cargas.length == 0){
        cargas.push('Sexo: no tiene | Edad: no tiene');
      };

      formularios.data.cargas = cargas;
      $scope.data = {"id":formularios.data.id,"form":cargas,"step":"5"};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        //console.log($scope.data);
        console.log(res);
        $location.path('inversion');
        })
     .error(function (err, status) {
      console.log('fail');
      });
       
    };


}).controller('Index6FormController', function($scope,$http, $location, formularios, $timeout) {
    if(formularios.data.form6){
    console.log(formularios.data.form6);
    formularios.data.form6 = {};
    console.log(formularios.data.form6);

   };
  //var socket = io.connect('http://186.64.122.137:3000'); 
  formularios.data.form6 = {};
  $scope.per = "Ingrese el monto que desea invertir";
    $scope.test = 'Inversion en salud';
    $scope.master = {};
    $scope.inversion = "";
   $scope.porcentaje = [
    {value:{val:'Quiero invertir el 7% de mi sueldo'}},
    {value:{val:'Quiero invertir mas del 7% de mi sueldo'}}];
    $scope.preference = {};
    $scope.check = function(index){
      if(index == "Quiero invertir el 7% de mi sueldo")
      {
        $scope.per = "Ingrese su sueldo liquido aproximado";
        $scope.mul = 7;

      };
      if(index == "Quiero invertir mas del 7% de mi sueldo")
      {
        $scope.per = "Ingrese el monto que desea invertir";
        $scope.mul = 0;
      };
    }

     $scope.update6 = function() {
      $scope.inversion = $scope.inversion.replace(/[^\d]/g, '');
      if($scope.inversion == "")
      {
        $scope.notvalid = "debes indicar un valor en pesos para la opcion que escojiste";
        return false;
      }
      if ($scope.mul == 7) {
        if(parseInt($scope.inversion) < 250000){
          $scope.notvalid = "El monto minimo es $250,000";
          $timeout(function(){ $scope.notvalid = ""; }, 8000);
          $scope.inversion = null;
          return false;};
        $scope.inversion = Math.round(parseInt($scope.inversion)*0.0875);
      }else{
        if(parseInt($scope.inversion) < 20000 ){
          $scope.notvalid = "El monto minimo es $20,000";
          $timeout(function(){ $scope.notvalid = "";}, 8000);
          $scope.inversion = null;
          return false;};
        $scope.inversion = parseInt($scope.inversion);
      };
      $scope.data = {"id":formularios.data.id,"form":$scope.inversion,"step":"6"};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/list/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        console.log(res);
        $scope.master = {"id":formularios.data.id }
        var socket = io.connect('http://186.64.122.137:3000'); 
        socket.emit('in', JSON.stringify($scope.master));
        
        $location.path('gracias');
        })
     .error(function (err, status) {
      console.log(err);
      });
       
    };


}).controller('Index7FormController', function($scope,$http, $location, formularios, $timeout,$route) {
   function load() {
        window.history.forward();
      }
      window.onload = load;
   if(typeof window.history.forward!=='function'){
  $scope.abcService.enableForwardButton = false;
}
  formularios.data = {};
  
  $timeout(function(){ deprec();$location.path('/'); }, 10000);


}).controller('LoginController', function ($scope, $location, $http, $timeout, login, $cookies) {

  
 
  $scope.login = function(user){
     $scope.invalid = "";
    if (angular.isDefined(user) && user.hasOwnProperty('user') && user.hasOwnProperty('psw')){
    $scope.data = {"user":user.user,"psw":user.psw};
    $http({ method: 'POST', url: "http://186.64.122.137:8400/login/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        
        if(res == 'Usuario no validado')
        {
          $scope.invalid = "Aun no confirmas tu cuenta en el correo electronico";
          $timeout(function(){ $scope.invalid = "";}, 8000);
          return false;
        }

        if(res == 'Usuario no registrado')
        {
          $scope.invalid = "Aun no te registras....";
          $timeout(function(){ $scope.invalid = ""; }, 8000);
          return false;
        }


          login.data.user = user.user;
          login.data.psw = user.psw;
          login.data.coins = res[1]
          $cookies.put('isapre', res[2])
          $cookies.put('name', res[0])
          $cookies.put('base', res[3])
          $cookies.put('user', user.user);
          $cookies.put('psw', user.psw);
          login.data.table = false;
          login.data.bag = false;
          $location.path('oportunidades');
        })
     .error(function (err, status) {
      console.log(err);
      });
  }else{
    $scope.invalid = "Debes indicar usuario y contraseña para entrar";
    $timeout(function(){ $scope.invalid = ""; }, 8000);

  };};


if($cookies.get('user') && $cookies.get('psw') && $cookies.get('name') && $cookies.get('isapre') && $cookies.get('base'))
  {
    $location.path('oportunidades');
  };


}).controller('RegistroController', function ($scope, $location, $http, $timeout) {
  $scope.isapres = [ { "name": "Banmedica" }, { "name": "Consalud" } , { "name": "Cruz Blanca" } , { "name": "Vida Tres" }, { "name": "Colmena" },{ "name": "Masvida" }];
  $scope.register = function(user, miisa){
    console.log(miisa);
    if(miisa==undefined){$scope.invalid = "Debes indicar a que isapre perteneces";$timeout(function(){ $scope.invalid = ""; }, 8000);return false;}
    if (angular.isDefined(user) && user.hasOwnProperty('name') && user.hasOwnProperty('phone') && user.hasOwnProperty('email') && user.hasOwnProperty('user') && user.hasOwnProperty('psw')){
    $scope.param = btoa(user.user+user.psw);
    $scope.id = btoa(user.name+user.phone+user.email);
    $scope.data = {"id":$scope.id,"form":user,"param":$scope.param, "isapre":miisa.name};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/register/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        if(res == 'ya existe')
        {
        $scope.invalid = "Lo sentimos, este usuario ya existe";
        $timeout(function(){ $scope.invalid = ""; }, 8000);
        return false;
        }else{
        $location.path('/aviso');};
        })
     .error(function (err, status) {
      console.log(err);
      });}else{
        $scope.invalid = "Falta algo en tu formulario, revisalo";
        $timeout(function(){ $scope.invalid = ""; }, 8000);
        return false;

     };
  };


}).controller('AvisoController', function ($scope, $location, $timeout) {
   


}).controller('ForgotController', function ($scope, $location) {
  $scope.forgot = function(data){
    console.log(data);
  };


}).controller('BienvenidoController', function ($scope, $location, $timeout) {

  $timeout(function(){ deprec();$location.path('/login'); }, 10000);


}).controller('somosController', function ($scope, $location, $timeout) {

  


}).controller('OppsController', function ($scope, $location, $timeout) {
  
  $timeout(function(){ deprec();$location.path('/'); }, 10000);

}).controller('landController', function ($scope, $location, $timeout) {
  
  $timeout(function(){ deprec();$location.path('/'); }, 10000);

}).controller('MaletinController', function ($scope, $location, $timeout) {
  

}).controller('DetalleController', function ($scope, $location, $timeout) {
  

});

(function() {

  app.controller("DataFormController", DataFormController);
  DataFormController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route", "$timeout"];
  
  function DataFormController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {
      if(!$cookies.get('user') && !$cookies.get('psw'))
  {
    $location.path('login');
    return false;
  };

    $scope.exit = function(){
      $cookies.remove('user');
      $cookies.remove('psw');
      $cookies.remove('name');
      $cookies.remove('isapre');
      $cookies.remove('base');
      $location.path('/login');
    };

    $scope.buy = function(id){
      
      $scope.data = {"id_vendor": $cookies.get('base'),"id_client":id};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/avaiable/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      
      if(res == 'Cliente no disponible')
      {
  
        $scope.rl('nosound','1');
        
      }


      if(res == 'Cliente disponible'){
        login.data.id_client = id;
        $location.path('/compra');
      }

      if (res == 'Salir') {
        $scope.rl('nosound','1');
      };

     })
      .error(function (err, status) {
        console.log(err);
        });
    };
    
    if(!login.data.coins){
      $scope.wait = 'Si vez este mensaje, es porque aun se esta procesando la cola de informacion, espera un momento, NO RECARGES LA PAGINA.';
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/coins/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = res;
    login.data.coins = res;
    $scope.wait = '';
        })
      .error(function (err, status) {
        console.log(err);
        });
    }

    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = login.data.coins;

    $scope.rl = function(sound, tipo){
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/data/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.wait = 'Si vez este mensaje, es porque aun se esta procesando la cola de informacion, espera un momento, NO RECARGES LA PAGINA.';
      if(res == 'Sin clientes'){$scope.wait = 'En estos momento no existen clientes pendientes... solo queda esperar.'; return false; };
      if(tipo=='2'){
      if(!login.data.table)
      {
        if(sound == 'sound'){
          var audio = new Audio('sound/audio_file.mp3');
          audio.play();
        };
        login.data.table = res;
        $route.reload();
        $scope.wait = '';
        return false;
      }
      if(login.data.table[0].id != res[0].id){
        if(sound == 'sound'){
          var audio = new Audio('sound/audio_file.mp3');
          audio.play();
        };
        login.data.table = res;
        $route.reload();
        $scope.wait = '';
        return false;
      }}

      if(tipo == "1"){
        login.data.table = res;
        $route.reload();
        $scope.wait = '';
        this.tableParams = new NgTableParams({
      page: 1,
      count: 20 
    }, {
      filterDelay: 0,
      data: res
    });

      }

        })
      .error(function (err, status) {
        console.log(err);
        });
    };

  

  var socket = io.connect('http://186.64.122.137:3000'); 
  socket.on('out', function(data){
    $scope.sound = 'sound';
    $scope.tipo = '2';
    $scope.rl($scope.sound, $scope.tipo);
    });

  if(!login.data.table){
    $scope.sound = 'nosound';
    $scope.tipo = '1';
    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.rl($scope.sound,$scope.tipo);
     
  }else{
    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = login.data.coins;
    this.tableParams = new NgTableParams({
      page: 1,
      count: 20 
    }, {
      filterDelay: 0,
      data: login.data.table
    });
  }
    

  }
})();




(function() {

  app.controller("BuyController", BuyController);
  BuyController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route","$timeout"];
  

  function BuyController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {
     if(!login.data.id_client){
    $location.path('oportunidades');
   }
   $scope.personal = 0;
    if(!login.data.coins){
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/coins/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = res;
    login.data.coins = res;
        })
      .error(function (err, status) {
        console.log(err);
        });
    }

    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = login.data.coins;
    $scope.data = {"id_client":login.data.id_client};
    $http({ method: 'POST', url: "http://186.64.122.137:8400/first/", data: JSON.stringify($scope.data), headers: 'application/json;'})
    .success(function(res){
    console.log(res);
    $scope.investment = res[0];
    $scope.children = res[1];
    $scope.date = res[2];
    $scope.gender = res[3];
    $scope.age = res[4];
    $scope.commune = res[5];
    $scope.region = res[6];
    var cargas = $scope.cargas = res[7];
    var prefn = $scope.prefn = res[8];
    $scope.current = res[9];
      
     })
      .error(function (err, status) {
        console.log(err);
        }); 

    $scope.update_coins = function(){
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/coins/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = res;
    login.data.coins = res;
        })
      .error(function (err, status) {
        console.log(err);
        });

    }
    

    $scope.buy = function(){
      $scope.wait = 'Espera un momento....';

      $scope.data = {"id_client":login.data.id_client, "id_vendor": $cookies.get('base')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/buy/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){

      if(res == 'Sin coins'){
        $location.path('oportunidades');
      }
      if(res == 'revisa'){
        $location.path('maletin');
      }
      $scope.update_coins();
      login.data.table = false;
      login.data.bag = false;
      $scope.phone = res[0].phone;
      $scope.email = res[0].email;
      $scope.namec = res[0].name;
      $scope.personal = 1;
      $scope.add = 'Este cliente ya se encuentra en tu maletín.';

     
        $scope.wait = '';
        $timeout(function(){ $scope.wait == ''; return false; }, 2000);
     })
      .error(function (err, status) {
        console.log(err);
        }); 
    }

   

  }
})();








(function() {

  app.controller("BagController", BagController);
  BagController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route", "$timeout"];
  
  function BagController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {

    if(!login.data.coins){
      $scope.wait = 'Si vez este mensaje, es porque aun se esta procesando la cola de informacion, espera un momento, NO RECARGES LA PAGINA.';
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/coins/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = res;
    login.data.coins = res;
    $scope.wait = '';
        })
      .error(function (err, status) {
        console.log(err);
        });
    }

    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = login.data.coins;

    $scope.exit = function(){
      $cookies.remove('user');
      $cookies.remove('psw');
      $cookies.remove('name');
      $cookies.remove('isapre');
      $cookies.remove('base');
      $location.path('/login');
    };

    $scope.rl = function(sound, tipo){
      $scope.wait = 'Si vez este mensaje, es porque aun se esta procesando la cola de informacion, espera un momento, NO RECARGES LA PAGINA.';
      $scope.data = {"user": $cookies.get('user'), 'psw': $cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/bag/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
        console.log(res);
      if(res == 'Sin clientes'){$scope.wait = 'No tienes nada en tu maletin... ve a oportunidades para encontrar una buena oferta!!!'; return false};
      if(tipo=='2'){
      if(!login.data.bag)
      {
        if(sound == 'sound'){
          var audio = new Audio('sound/audio_file.mp3');
          audio.play();
        };
        login.data.bag = res;
        $scope.wait = '';
        $route.reload();
        return false;
      }
      if(login.data.bag[0].id != res[0].id){
        if(sound == 'sound'){
          var audio = new Audio('sound/audio_file.mp3');
          audio.play();
        };
        login.data.bag = res;
        $scope.wait = '';
        $route.reload();
        return false;
      }}

      if(tipo == "1"){
        login.data.bag = res;
        $scope.wait = '';
        $route.reload();
        this.tableParams = new NgTableParams({
      page: 1,
      count: 20 
    }, {
      filterDelay: 0,
      data: res
    });

      }

        })
      .error(function (err, status) {
        console.log(err);
        });
    };

    if(!$cookies.get('user') && !$cookies.get('psw'))
  {
    $location.path('login');
    return false;
  };

  $scope.view = function(id){
    $cookies.put('viewid',id);
    $location.path('detalle');
  }
  

  if(!login.data.bag){
    $scope.sound = 'nosound';
    $scope.tipo = '1';
    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.rl($scope.sound,$scope.tipo);
     
  }else{
    $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = login.data.coins;
    this.tableParams = new NgTableParams({
      page: 1,
      count: 20 
    }, {
      filterDelay: 0,
      data: login.data.bag
    });
  }
    

  }
})();







(function() {

  app.controller("DetailsController", DetailsController);
  DetailsController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route","$timeout"];
  

  function DetailsController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {

    if(!login.data.coins){
      $scope.wait = 'Si vez este mensaje, es porque aun se esta procesando la cola de informacion, espera un momento, NO RECARGES LA PAGINA.';
      $scope.data = {"user": $cookies.get('user'),"psw":$cookies.get('psw')};
      $http({ method: 'POST', url: "http://186.64.122.137:8400/coins/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
      $scope.name = $cookies.get('name');
    $scope.isapre = $cookies.get('isapre');
    $scope.coins = res;
    login.data.coins = res;
    $scope.wait = '';
        })
      .error(function (err, status) {
        console.log(err);
        });
    }

    $scope.coins = login.data.coins;
    $scope.name = $cookies.get('name');
     $scope.data = {"id_client": $cookies.get('viewid')};
     $http({ method: 'POST', url: "http://186.64.122.137:8400/details/", data: JSON.stringify($scope.data), headers: 'application/json;'})
      .success(function(res){
    $scope.investment = res[0];
    $scope.children = res[1];
    $scope.date = res[2];
    $scope.gender = res[3];
    $scope.age = res[4];
    $scope.commune = res[5];
    $scope.region = res[6];
    var cargas = $scope.cargas = res[7];
    $scope.current = res[8];
    var preference = $scope.preference = res[9];
    $scope.namec = res[10];
    $scope.phone = res[11];
    $scope.email = res[12];
    $cookies.remove('viewid');

        })
      .error(function (err, status) {
        console.log(err);
        });
   

  }
})();





(function() {

  app.controller("LogadController", LogadController);
  LogadController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route","$timeout"];
  

  function LogadController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {
 $scope.login = function(user){
     $scope.invalid = "";
    if (angular.isDefined(user) && user.hasOwnProperty('user') && user.hasOwnProperty('psw')){
    $scope.data = {"user":user.user,"psw":user.psw};
    $http({ method: 'POST', url: "http://186.64.122.137:8400/login/", data: JSON.stringify($scope.data), headers: 'application/json;'})
     .success(function(res){ 
        
        if(res == 'Usuario no validado')
        {
          $scope.invalid = "Aun no confirmas tu cuenta en el correo electronico";
          $timeout(function(){ $scope.invalid = "";}, 8000);
          return false;
        }

        if(res == 'Usuario no registrado')
        {
          $scope.invalid = "Aun no te registras....";
          $timeout(function(){ $scope.invalid = ""; }, 8000);
          return false;
        }


          login.data.user = user.user;
          login.data.psw = user.psw;
          login.data.coins = res[1]
          $cookies.put('isapre', res[2])
          $cookies.put('name', res[0])
          $cookies.put('base', res[3])
          $cookies.put('user', user.user);
          $cookies.put('psw', user.psw);
          login.data.table = false;
          login.data.bag = false;
          $location.path('panel');
        })
     .error(function (err, status) {
      console.log(err);
      });
  }else{
    $scope.invalid = "Debes indicar usuario y contraseña para entrar";
    $timeout(function(){ $scope.invalid = ""; }, 8000);
    
  };};


if($cookies.get('user') && $cookies.get('psw') && $cookies.get('name') && $cookies.get('isapre') && $cookies.get('base'))
  {
    $location.path('panel');
  };
   
   

  }
})();


(function() {

  app.controller("PaneladminController", PaneladminController);
  PaneladminController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route","$timeout"];
  function PaneladminController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {

  }

})();


(function() {

  app.controller("CompraDosController", CompraDosController);
  CompraDosController.$inject = ["NgTableParams","login","$location", "$cookies","$http","$scope","$route","$timeout"];
  function CompraDosController(NgTableParams, login, $location, $cookies, $http, $scope, $route, $timeout) {

  }

})();