// JavaScript Document
angular.module('fetswallet.controllers2', [])

//bills payment controller
.controller('billsCtrl', function($scope, $rootScope,localStorageService,$ionicLoading,$http) {
	$scope.allval=[];
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
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	console.log($scope.authVal);
	$scope.authPay=false; $scope.authMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	//marchant initailization
	var merchantscat=[];
	var allcategories=localStorageService.get('Allmarchants');
	console.log($scope.allcategories);
	angular.forEach(allcategories, function(value,key) {
		if(value.id!=2){
     	merchantscat.push(value);
		}
    });
	$scope.allcategories= merchantscat;
	 console.log($scope.allcategories);
	
	$scope.showform=true;
	$scope.payment=function(){
		$scope.showform=null;
	}
	$scope.PaymentCancel=function(){
		$scope.showform=true;
		$scope.failMsg=false;$scope.failDisplay=false;
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	$scope.PaymentConfirm=function(){
		$scope.loadingIndicatorShow ();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/payBill', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd,wallet_id:$scope.authVal.wallets[0].id,channel_id:6,amount:$scope.allval.productPrice,merchant_id:$scope.allval.products.id,product_id:$scope.allval.newProduct.id,remarks:$scope.allval.remarks })
				.success(function(response) {
						if(response.responseCode == 0){
							console.log(response);
							$scope.sucDisplay=true;
							$scope.showform=true;
							$scope.sucMsg="Payment Made Successfully";
							$scope.loadingIndicatorHide();
						}
						else if(response.responseCode == 10){
							console.log(response);
							$scope.showform=false;
							$scope.failMsg=response.message;
							$scope.failDisplay=true;
							alert('Payment fail!');
							$scope.loadingIndicatorHide();
						}
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				});
		
	}
})

//top up
.controller('topupCtrl', function($scope, $rootScope,localStorageService,$http,$ionicLoading) {
	$scope.allval=[];$scope.allval.phone='234';
	$scope.failMsg="";$scope.failDisplay=false;$scope.sucMsg="";
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	$scope.sucDisplay=false;
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
	var networks=[];
	var allcategories=localStorageService.get('Allmarchants');
	angular.forEach(allcategories, function(value,key) {
		//topup category
		if(value.id==2){
     	networks.push(value);
		}
    });
	$scope.networks=networks[0].merchants;
	
	$scope.showform=true;
	$scope.topup=function(){
		$scope.showform=null;
		if($scope.allval.self==1)
		$scope.allval.benNumber=$scope.allval.walletID;
		else if($scope.allval.self==2)
		$scope.allval.benNumber=$scope.allval.phone;
	}
	$scope.topupCancel=function(){
		$scope.showform=true;
		$scope.authPay=false; $scope.authMsg="";
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	$scope.topupConfirm=function(){
		$scope.loadingIndicatorShow ();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/payBill', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd,wallet_id:$scope.authVal.wallets[0].id,channel_id:6,amount:$scope.allval.topupPrice,merchant_id:$scope.allval.allcards.id,product_id:$scope.allval.newCard.id,customerRefNum:$scope.allval.benNumber})
				.success(function(response) {
						if(response.responseCode == 0){
							console.log(response);
							$scope.sucDisplay=true;
							$scope.showform=true;
							$scope.sucMsg="Payment Made Successfully";
							$scope.loadingIndicatorHide();
						}
						else if(response.responseCode == 10){
							console.log(response);
							$scope.showform=false;
							$scope.failMsg=response.message;
							$scope.failDisplay=true;
							alert('Payment fail!');
							$scope.loadingIndicatorHide();
						}
				})
				.error(function (data, status, headers, config) {
				   alert("No Internet Connection");
				   $scope.loadingIndicatorHide();
				});
		
	}
})


//p2p wallet
.controller('walletTransCtrl', function($scope, $rootScope,localStorageService,$http,$state,$ionicLoading) {
	$scope.allval=[];
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	$scope.authPay=false; $scope.authMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
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
	$scope.walletBens=[];
	$scope.loadingIndicatorShow();
	$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getCustomerBenList?msisdn='+$scope.allval.walletID)
			.success(function(response) {
					if(response.responseCode == 0){
						console.log(response);
						$scope.walletBens=response.list;
						$scope.loadingIndicatorHide();
					}
					else if(response.responseCode == 10){
						console.log(response);
						$scope.loadingIndicatorHide();
					}
			})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   console.log(data);
			   $scope.loadingIndicatorHide();
			});
	$scope.lookup=function(){
		$scope.loadingIndicatorShow();
		$scope.changePhone();
		$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/lookupAccountName?msisdn='+$scope.allval.phone)
			.success(function(response) {
					if(response.responseCode == 0){
						console.log(response);
						$scope.loadingIndicatorHide();
						$scope.allval.message="Name: "+response.message;
						alert($scope.allval.message);
						$scope.lookupCheck=true;
					}
					else if(response.responseCode == 10){
						alert(response.message)
						$scope.loadingIndicatorHide();
					}
			})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   $scope.loadingIndicatorHide();
			});
		
	}
	$scope.transferCancel=function(){
		$scope.showform=true;$scope.allval.message=null;
		$scope.authPay=false; $scope.authMsg="";$scope.lookupCheck=false;
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	$scope.transferSave=function(){
		$scope.loadingIndicatorShow();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/saveBeneficiary', 
				{ msisdn: $scope.allval.walletID,ben_msisdn:$scope.allval.phone})
		.success(function(response) {
			if(response.responseCode == 0){
				$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getCustomerBenList?msisdn='+$scope.allval.walletID)
				.success(function(res) {
					if(res.responseCode == 0){
						$scope.walletBens=res.list;
						console.log(res.list);
						$scope.loadingIndicatorHide();
						alert(response.message)
						$scope.godirect($scope.allval.phone);
					}
					})
				
			}
			else if(response.responseCode == 10){
				alert(response.message)
				$scope.loadingIndicatorHide();
			}
	})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   $scope.loadingIndicatorHide();
			});
	}
	$scope.godirect=function(beneficiary){
		$scope.allval.walletsendi=beneficiary;
		$scope.showform=false;
		$scope.failDisplay=false; $scope.failMsg="";
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	$scope.transferConfirm=function(){
		$scope.loadingIndicatorShow();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/p2pTransfer', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd,wallet_id:$scope.authVal.wallets[0].id,channel_id:6,amount:$scope.allval.amount,destination_msisdn:$scope.allval.walletsendi})
		.success(function(response) {
				if(response.responseCode == 0){
					$scope.loadingIndicatorHide();
					alert(response.message);
					$scope.showform=true;
				}
				else if(response.responseCode == 10){
					alert(response.message)
					$scope.loadingIndicatorHide();
				}
		})
		.error(function (data, status, headers, config) {
		   alert("could not Connect");
		   $scope.loadingIndicatorHide();
		});
	}
})


.controller('phoneTransCtrl', function($scope, $rootScope,localStorageService,$http,$state,$ionicLoading) {
	$scope.allval=[];
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	$scope.sucMsg="";$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.loadingIndicatorShow = function(){$scope.loading=$ionicLoading.show({
	    content: '<i class="button button-icon icon ion-loading-a"></i>',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	});
	
	}
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
	$scope.loadingIndicatorHide=function(){
		 $ionicLoading.hide();
		 
	}
	$scope.transfer=function(){
		$scope.allval.charge=100;
		$scope.showform=false;	
	}
	$scope.transferCancel=function(){
		$scope.showform=true; $scope.allval.walletpasd="";
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	
	$scope.transferConfirm=function(){
		$scope.loadingIndicatorShow();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/p2UnregisteredTransfer', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd,wallet_id:$scope.authVal.wallets[0].id,channel_id:6,amount:$scope.allval.amount,destination_msisdn:$scope.allval.phone})
		.success(function(response) {
				if(response.responseCode == 0){
					$scope.loadingIndicatorHide();
					alert(response.message);
					$scope.showform=true;
				}
				else if(response.responseCode == 10){
					alert(response.message)
					$scope.loadingIndicatorHide();
				}
		})
		.error(function (data, status, headers, config) {
		   alert("could not Connect");
		   $scope.loadingIndicatorHide();
		});
	}
})




.controller('bankTransCtrl', function($scope, $rootScope,localStorageService,$http,$ionicLoading) {
	$scope.bankBens=[];
	$scope.banks=[{"name":"UNITED BANK OF AFRICA PLC","bankcode":"033","bank_id":"1"},{"name":"Ecobank PLC","bankcode":"050","bank_id":"2"}];
	$scope.allval=[];
	$scope.allval.walletID=localStorageService.get('phoneID');
	$scope.authVal=localStorageService.get('loginDetails');
	console.log($scope.authVal);
	$scope.authPay=false; $scope.authMsg="";$scope.sucMsg="";
	$scope.sucDisplay=false;
	$scope.showform=true;
	$scope.bank=function(){
		if($scope.allval.amount<1000){
			alert('amount should not not be less than 100.00NGN');
			return;
		}
		$scope.showform=null;
	}
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
	$scope.loadingIndicatorShow();
	$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getCustomerAcctsList?customer_id='+$scope.authVal.wallets[0].id)
			.success(function(response) {
					if(response.responseCode == 0){
						console.log(response);
						$scope.bankBens=response.list;
						$scope.loadingIndicatorHide();
					}
					else if(response.responseCode == 10){
						console.log(response);
						$scope.loadingIndicatorHide();
					}
			})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   console.log(data);
			   $scope.loadingIndicatorHide();
		});
	$scope.bankCancel=function(){
		$scope.showform=true;
		$scope.authPay=false; $scope.authMsg="";
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	
	$scope.lookup=function(){
		
		$scope.loadingIndicatorShow();
		
		$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/lookupBankAccountName?bank_code='+$scope.allval.bank.bankcode+'&account_no='+$scope.allval.acctNumber)
			.success(function(response) {
					if(response.responseCode == 0){
						console.log(response);
						$scope.loadingIndicatorHide();
						$scope.allval.msg=response.message;
						$scope.allval.message="Account Name: "+response.message;
						alert($scope.allval.message);
						$scope.lookupCheck=true;
					}
					else if(response.responseCode == 10){
						alert(response.message)
						$scope.loadingIndicatorHide();
					}
			})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   $scope.loadingIndicatorHide();
			});
	}
	$scope.transferSave=function(){
		$scope.loadingIndicatorShow();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/saveBankAccount', 
				{ customer_id: $scope.authVal.wallets[0].id,bank_id:$scope.allval.bank.bank_id,accountName:$scope.allval.msg,accountNo:$scope.allval.acctNumber})
		.success(function(response) {
			if(response.responseCode == 0){
				$http.get('http://www.fetspay.fets.com.ng/vidicon/rest/getCustomerBenList?msisdn='+$scope.allval.walletID)
				.success(function(res) {
					if(res.responseCode == 0){
						$scope.walletBens=res.list;
						console.log(res.list);
						$scope.loadingIndicatorHide();
						alert(response.message)
						$scope.godirect($scope.allval.phone);
					}
					})
				
			}
			else if(response.responseCode == 10){
				alert(response.message)
				$scope.loadingIndicatorHide();
			}
	})
			.error(function (data, status, headers, config) {
			   alert("could not Connect");
			   $scope.loadingIndicatorHide();
			});
	}
	$scope.transfer=function(){
		$scope.loadingIndicatorShow();
		$scope.showform=false;
		$scope.allval.bankCode=$scope.allval.bank.bankcode;
		$scope.allval.bankName=$scope.allval.msg;
		$scope.allval.bankAccount=scope.allval.acctNumber;
		$scope.failDisplay=false; $scope.failMsg="";
		$scope.sucDisplay=false; $scope.sucMsg="";
		$scope.loadingIndicatorHide();
	}
	$scope.godirect=function(beneficiary){
		$scope.loadingIndicatorShow();
		$scope.allval.bankCode=beneficiary.bankcode;
		$scope.allval.bankAccount=beneficiary.account;
		$scope.allval.bankName=beneficiary.bank;
		$scope.showform=false;
		$scope.failDisplay=false; $scope.failMsg="";
		$scope.sucDisplay=false; $scope.sucMsg="";
	}
	$scope.bankConfirm=function(){
		$scope.loadingIndicatorShow();
		$http.post('http://www.fetspay.fets.com.ng/vidicon/rest/p2BankTransfer', 
				{ msisdn: $scope.allval.walletID,password:$scope.allval.walletpasd,wallet_id:$scope.authVal.wallets[0].id,channel_id:6,amount:$scope.allval.amount,bank_code:$scope.allval.bankCode,account_name:$scope.allval.bankName,account_no:$scope.allval.bankAccount})
		.success(function(response) {
				if(response.responseCode == 0){
					$scope.loadingIndicatorHide();
					alert(response.message);
					$scope.showform=true;
				}
				else if(response.responseCode == 10){
					alert(response.message)
					$scope.loadingIndicatorHide();
				}
		})
		.error(function (data, status, headers, config) {
		   alert("could not Connect");
		   $scope.loadingIndicatorHide();
		});
	}
})