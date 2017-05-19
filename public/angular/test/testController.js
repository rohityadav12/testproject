test_app.controller('testController', function ($scope,$routeParams,$route ,$http,$location, $window,  ServiceTest) {
  $scope.message = "this is testController";
  ServiceTest.setValue('rohit');
  $scope.value = ServiceTest.getValue();
});


