var apiUrl = document.location.origin+"/api/";
var app = angular.module("app", ["ngResource", "ngRoute", "ngAnimate", "ui.bootstrap"])
    .constant("apiUrl", apiUrl)
    .config(["$routeProvider", function($routeProvider) {
        return $routeProvider.when("/", {
            templateUrl: "/static/html/event-list.html",
            controller: "AppCtrl"
        }).when("/date", {
            templateUrl: "/static/html/date.html",
            controller: "DatepickerDemoCtrl"
        }).when("/draw", {
            templateUrl: "/static/html/draw.html",
            controller: "DrawingCtrl"
        }).when("/time", {
            templateUrl: "/static/html/time.html",
            controller: "TimepickerDemoCtrl"
        }).otherwise({
            redirectTo: "/"
        });
    }
    ]).config([
        "$locationProvider", function($locationProvider) {
            return $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }).hashPrefix("!"); // enable the new HTML5 routing and history API
            // return $locationProvider.html5Mode(true).hashPrefix("!"); // enable the new HTML5 routing and history API
        }
    ]);

app.service("canvas", function() {

    var canvas = document.getElementById("testCanvas");
    console.log(canvas);
    var stage = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener("tick", stage);

    var container = new createjs.Container();
    stage.addChild(container);

    this.loadCanvasBackground = function(urlImage) {

        var bitmap = new createjs.Bitmap(urlImage);
        bitmap.image.onload = function() {
            bitmap.scaleX = (canvas.width / bitmap.getBounds().width);
            bitmap.scaleY = (canvas.height / bitmap.getBounds().height);
            container.addChild(bitmap);
            container.setChildIndex(bitmap, 0);
            stage.update();
        };

    };

    this.addMarker = function(coordinate) {

        console.log(coordinate.y);
        var overlay1 = new createjs.Bitmap("http://i.stack.imgur.com/uvFaG.png");
        overlay1.x = coordinate.x;
        overlay1.y = coordinate.y;
        container.addChild(overlay1);
        stage.update();
    };

    this.getWidth = function() {
        return canvas.width;
    }

});


app.controller("AppCtrl", ["$scope","$resource", "$location", "apiUrl", function($scope, $resource, $location, apiUrl) {

    //var GetEvents = $resource(apiUrl + "event");
    //GetEvents.get(function(response) {
    //    $scope.events = response.Tasks;
    //});

    console.log("in app ctrl");

}]);

app.controller("AboutCtrl", ["$scope","$resource", "$location", "apiUrl", function($scope, $resource, $location, apiUrl) {
    $scope.val = "cat";

}]);

app.controller("DrawingCtrl", ["$scope","$resource", "$location", "apiUrl", "$timeout", "canvas", function($scope, $resource, $location, apiUrl, $timeout, canvas) {

    var GetEvents = $resource(apiUrl + "event");
    GetEvents.get(function(response) {
        $timeout(function(){

            canvas.loadCanvasBackground("http://sdo.gsfc.nasa.gov/assets/img/browse/2010/06/07/20100607_000900_4096_0171.jpg");
            drawOnSun(response.Tasks);

        });
    });

 

    function drawOnSun(events) {

        function convertHPCToPixXY(pointIn) {

            var CDELT = 0.599733;
            var HPCCENTER = 4096 / 2.0;
            pointIn.x = (HPCCENTER + (pointIn.x / CDELT)) * canvas.getWidth() / 4096;
            pointIn.y = (HPCCENTER - (pointIn.y / CDELT)) * canvas.getWidth() / 4096;
        }

        for(var i = 0; i < events.length; i++) {
            var c = events[i].Coordinate.split(" ");
            var x = c[0].substring(6);
            var y = c[1].substring(0, c[1].length-1);
            var point = {
                x : parseFloat(x),
                y : parseFloat(y)
            };
            console.log(point);
            convertHPCToPixXY(point);
            canvas.addMarker(point);
        }
    }
}]);
app.controller("DateCtrl",  function($scope) {

        $scope.s = $scope.s + "cat";


});

app.controller('TimepickerDemoCtrl', ["$scope", function ($scope, $log) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
}]);

app.controller('DatepickerDemoCtrl', ["$scope", function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
}]);
