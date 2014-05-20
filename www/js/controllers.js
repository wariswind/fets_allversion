// JavaScript Document
var app=angular.module('fetswallet.controllers', [])
.run(function($rootScope) {
    $rootScope.navbar=true;
})
//main controller at run time
.controller('MainCtrl', function($scope,$http, $ionicSideMenuDelegate,$rootScope,localStorageService,$ionicViewService,$state,$ionicLoading) {
	//toggle the app left
	
	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleRight();
  	};
	

})
.controller('loadingCtrl', function($scope,$ionicLoading, $rootScope,$ionicPlatform,localStorageService,$state,$http,$location,$ionicViewService) {
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i><br>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	$ionicViewService.nextViewOptions({
									  disableAnimate: true,
									  disableBack: true
									});
	$scope.loadingIndicatorShow();
	
	if(localStorageService.get('loginDetails')===null){
		$scope.loadingIndicatorHide();	
	$location.path('/plane/startup');
	
	
	}
	else{$scope.authVal=localStorageService.get('loginDetails');
	
		if($scope.authVal.activeStatus=="ACTIVE"){
			
			$scope.loadingIndicatorShow();
			if(localStorageService.get('version')===null){
				$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getDataVersion')
				.success(function(response) {
					if(response.responseCode==0){
						localStorageService.add('version',response.message);
						$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getAllMerchants')
						.success(function(resp) {
							if(resp.responseCode==0){
								localStorageService.add('Allmarchants',JSON.stringify(resp.list));
								$scope.loadingIndicatorHide();
								$location.path('/plane/home');
								
							}
							else{
								localStorageService.remove('version');
								alert('No internet Connection');
								if(navigator.app){
										navigator.app.exitApp();
								}else if(navigator.device){
										navigator.device.exitApp();
								}
								$scope.loadingIndicatorHide();
							}
							
						})
						.error(function (data, status, headers, config) {
							localStorageService.remove('version');
							alert('No Internet Connection');
							if(navigator.app){
										navigator.app.exitApp();
								}else if(navigator.device){
										navigator.device.exitApp();
								}
								$scope.loadingIndicatorHide();
						})
					}
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				   if(navigator.app){
							navigator.app.exitApp();
					}else if(navigator.device){
							navigator.device.exitApp();
					}
					$scope.loadingIndicatorHide();
				   
				});
			}
			else if(localStorageService.get('version')!=null){
				$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getDataVersion')
				.success(function(response) {
					if(response.responseCode==0){
					if(localStorageService.get('version')!=response.message||localStorageService.get('Allmarchants')===null){
						localStorageService.remove('version');
						localStorageService.remove('Allmarchants');
						$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getAllMerchants')
						.success(function(resp) {
							if(resp.responseCode==0){
								localStorageService.add('Allmarchants',JSON.stringify(resp.list));
								$scope.loadingIndicatorHide();
								$location.path('/plane/home');
								
							}
							else{
								localStorageService.remove('version');
								alert('Internect Connection Problem');
								if(navigator.app){
										navigator.app.exitApp();
								}else if(navigator.device){
										navigator.device.exitApp();
								}
								
								$scope.loadingIndicatorHide();
							}
							
						})
						.error(function (data, status, headers, config) {
							localStorageService.remove('version');
							alert('No Internet Connection');
							if(navigator.app){
										navigator.app.exitApp();
								}else if(navigator.device){
										navigator.device.exitApp();
								}
								$scope.loadingIndicatorHide();
						})
						localStorageService.add('version',response.message);
						
						
					}
					else{
						$scope.loadingIndicatorHide();
						$state.go('plane.home');
						//$location.path('/plane/home');
					}
					}
					
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				   if(navigator.app){
							navigator.app.exitApp();
					}else if(navigator.device){
							navigator.device.exitApp();
					}
					$scope.loadingIndicatorHide();
				   
				});
			}
			
		}
		else if($scope.authVal.activeStatus=="NOT-ACTIVATED"){
			$location.path('/plane/changepasd');
			$scope.loadingIndicatorHide();
		}
		else{
			$location.path('/plane/startup');
		$scope.loadingIndicatorHide();
		alert('No internet Connection');
			if(navigator.app){
					navigator.app.exitApp();
			}else if(navigator.device){
					navigator.device.exitApp();
			}
		}
	}
	
	
	
})
//home controller
.controller('homeCtrl', function($scope,$ionicLoading, $rootScope,$ionicPlatform,localStorageService,$state) {
	/*$ionicPlatform.ready(function() {
	var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
telephoneNumber.get(function(result) {
        alert("result = " + result);
    }, function(error) {
        alert("error"+ error.code);
    });
	})*/
	
	
	
	
})
.controller('startCtrl', function($scope,$ionicLoading, $rootScope,$ionicPlatform,localStorageService,$state) {
})

//home controller
.controller('menuCtrl', function($scope, $rootScope) {
	
})







.controller('checkBalCtrl', function($scope, $rootScope,localStorageService,$http,$ionicLoading) {
	$scope.allval=[];
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authPay=false; $scope.authMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
	
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	$scope.checkbal=function(){
		$scope.loadingIndicatorShow();
				$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/authenticate', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd })
				.success(function(response) {
					if(response.responseCode == 0){
					$scope.showform=false;
					localStorageService.remove('loginDetails');
					localStorageService.add('loginDetails',JSON.stringify(response));
					$scope.authVal=localStorageService.get('loginDetails');
					var bal=$scope.authVal.walletAvailableBalance;
					$scope.allval.balance=bal.toFixed(2);
					console.log(response);
					$scope.loadingIndicatorHide()
					}
					else if(response.responseCode == 10){
						$scope.showform=true;
						alert(response.message);
						$scope.loadingIndicatorHide()
					}
				})
				.error(function (data, status, headers, config) {
			   alert("Connect lost, Try again later");
			   $scope.loadingIndicatorHide();
				});
	}
})
.controller('regCtrl', function($scope,$ionicLoading,$http, $rootScope,country,religion,stateLocalGov,title,localStorageService,$location) {
	$scope.allval=[];
	$scope.allval.address2='';
	$scope.changePhone=function(){
		if(!$scope.allval.phone){
			alert('Invalid Phone Number');
			return;
		}
		 if($scope.allval.phone.length==11 && $scope.allval.phone.substring(0, 1)==0)
		 $scope.allval.phone="234"+$scope.allval.phone.substring(1, 11);
		 else if($scope.allval.phone.length==13 && $scope.allval.phone.substring(0, 3)=="234")
		 return;
		 else if($scope.allval.phone.length==14 && $scope.allval.phone.substring(0, 4)=="+234")
		 $scope.allval.phone=$scope.allval.phone.substring(1, 14);
		 else{
		 alert("Invalid Number");
		 $scope.allval.phone="";
		 }
	}
	$scope.nation=[];
	//$scope.titles,$scope.states=[];
//	country.success(function(data) { 
//    $scope.nation = data;
//	});
//	title.success(function(data) { 
//    $scope.titles = data;
//	});
//	stateLocalGov.success(function(data) { 
//    $scope.states = data;
//	});
//cancel should go back to the reg form
	$scope.regCancel=function(){
		$scope.showform=true;
	}
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	$scope.failDisplay=false; $scope.failMsg="";$scope.sucMsg,$scope.failSubMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.backToReg=function(){
		$scope.failDisplay=false; $scope.failMsg="";$scope.sucMsg,$scope.failSubMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	}
	$scope.confirmphone=function(){
		$scope.showform=false;
		$scope.failDisplay=false; $scope.failMsg="";$scope.sucMsg,$scope.failSubMsg="";
		$scope.sucDisplay=false;
	}
	$scope.register=function(){
		$scope.showform=true;
		$scope.loadingIndicatorShow();
				$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/registration', 
				{ msisdn: $scope.allval.phone,firstname: $scope.allval.firstname,lastname: $scope.allval.lastname,customername:$scope.allval.firstname+' '+$scope.allval.lastname,motherMaidenName:$scope.allval.maidname,gender_id: $scope.allval.sex,addr1: $scope.allval.address1,customerType:'CUSTOMER' })
				.success(function(response) {
						if(response.responseCode == 0){
						 	$scope.failDisplay=false;
							$scope.sucDisplay=true;
							alert(response.message);
							if(localStorageService.get('phoneID')===null)
							localStorageService.add('phoneID',$scope.allval.phone);
							else{
								localStorageService.remove('phoneID');
								localStorageService.add('phoneID',$scope.allval.phone);
							}
							$location.path('/plane/signin');
							$scope.loadingIndicatorHide();
									   

						}
					   else if(response.responseCode == 10){
						   $scope.failSubMsg=response.message;
						   $scope.failMsg="Registration not successful";
						   $scope.failDisplay=true;
						    $scope.loadingIndicatorHide();
						}
					  
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				});
	}
})
.controller('signINCtrl', function($scope,$ionicLoading,$http, $rootScope,$state, $ionicViewService,$rootScope,localStorageService,$location) {
	$scope.allval=[]; $rootScope.navbar=false; 
	if(localStorageService.get('phoneID')!=null){
		$scope.allval.phone=true;
		$scope.allval.walletid=localStorageService.get('phoneID');
	}
		else
		$scope.allval.phone=null;
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
	
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	//validate phone number
	$scope.changePhone=function(){
		if(!$scope.allval.walletid){
			alert('Invalid Phone Number');
			return;
		}
		 if($scope.allval.walletid.length==11 && $scope.allval.walletid.substring(0, 1)==0)
		 $scope.allval.walletid="234"+$scope.allval.walletid.substring(1, 11);
		 else if($scope.allval.walletid.length==13 && $scope.allval.walletid.substring(0, 3)=="234")
		 return;
		 else if($scope.allval.walletid.length==14 && $scope.allval.walletid.substring(0, 4)=="+234")
		 $scope.allval.walletid=$scope.allval.walletid.substring(1, 14);
		 else
		 alert("Invalid Number");
	}
	$scope.authPay=false; $scope.authMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.login=function(){
		
		$scope.loadingIndicatorShow();
				$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/authenticate', 
				{ msisdn: $scope.allval.walletid,password:$scope.allval.walletpasd })
				.success(function(response) {
						if(response.responseCode == 0){
							 
							$scope.authPay=false;
						 	    
								localStorageService.add('loginDetails',JSON.stringify(response));
								if(localStorageService.get('phoneID')===null)
							localStorageService.add('phoneID',$scope.allval.walletid);
							else{
								localStorageService.remove('phoneID');
								localStorageService.add('phoneID',$scope.allval.walletid);
							}
						if(response.activeStatus=="DISABLED"){
							alert('Your account has been disaled');
							return;
							localStorageService.removeItem('loginDetails');
							localStorageService.removeItem('phoneID');
						}
							$location.path('/plane/laoding');

						}
					   else if(response.responseCode == 10){
						   $scope.authMsg="Sign in fail!";$scope.authPay=true;
						}
					   $scope.loadingIndicatorHide();
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				});
		
		
	}
	
})

//change password controller
.controller('chgpsdCtrl', function($scope, $rootScope,localStorageService,$ionicViewService,$state,$http,$ionicLoading,$location) {
	$scope.allval=[];
	$scope.authVal=localStorageService.get('loginDetails');
	$scope.allval.phone=localStorageService.get('phoneID');
	
	$scope.failDisplay=false; $scope.failMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	$scope.changePassd=function(){
		$scope.loadingIndicatorShow();
		
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/changePassword', 
		{msisdn: $scope.allval.phone,old_password:$scope.allval.oldpasd,new_password:$scope.allval.newpasd,confirm_password:$scope.allval.newpasd2})
		.success(function(response) {
			if(response.responseCode == 0){
				$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/authenticate', 
				{ msisdn: $scope.allval.phone,password:$scope.allval.newpasd })
				.success(function(resp) {
				if(resp.responseCode == 0){
					
					localStorageService.remove('loginDetails');
					localStorageService.add('loginDetails',JSON.stringify(resp));
					console.log(localStorageService.get('loginDetails'));
					$location.path('/plane/loading');
					$scope.loadingIndicatorHide();
				}
				else{
					alert('Password change not successful');
					$scope.loadingIndicatorHide();
				return;
				}
				})
			}
			if(response.responseCode == 10){
				alert('Password change not successful, check');
				$scope.loadingIndicatorHide();
				return;
			}
			
		})
		.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				});
		
	}
})

.controller('fundCtrl', function($scope,$ionicLoading, $rootScope,$ionicPlatform,localStorageService) {
	$scope.allval=[];
	$scope.allval.phone=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 10
	});
	
	}
	
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
	}
	$scope.showform=true;
	$scope.payment=function(){
		if($scope.allval.amount<1000 || isNaN($scope.allval.amount)){
			alert('Amount not valid');
			return;
		}
		
		var amt=$scope.allval.amount*100;
		var phoneno=$scope.allval.phone;
		var customername="clement";
		var wallID=$scope.authVal.wallets[0].id;
		alert(wallID);
		var ref = window.open('http://fetswallet.com/mobile/paybutton.html','_blank','location=no','closebuttoncaption=Done');
	  	//var myCallback = function() {var walletID=phoneno;ref.executeScript({
//            code: "alert(amt);var walletID="+phoneno+"; var amount="+amt+"; var name="+customername+";"},
//			function(){
//				alert(walletID);
//				document.getElementById("walletid").innerHTML=walletID;
//				document.getElementById("amount").innerHTML=amount;
//				var walletID=walletID; var amount=amount;
//			}
//        
//        ) }
		var newClab=function(){
			var code="alert('hi');var walletID="+phoneno+"; var amount="+amt+"; var name="+customername+"; var wallID="+wallID;
			ref.executeScript({ code:code
			})
		}
		ref.addEventListener('loadstop', newClab());
		 ref.addEventListener('exit', function(event) { alert(event.type);$scope.showform=false; });
		
	}
})

.controller('agentsCtrl', function($scope,$ionicLoading, $rootScope,localStorageService,stateLocalGov) {
	
	$scope.allval=[];
	$scope.allval.phone=localStorageService.get('phoneID');
	$scope.showform=true;
	stateLocalGov.success(function(data) { 
    $scope.states = data;
	});

})