app.controller("mainController", function($scope, $http){

	$scope.popularStocks = [];
	$scope.stocksQueries = [];
	$scope.balance = 100;
    $scope.myStocks = [];

	var url = 'https://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=JSON_CALLBACK&q=select%20AskRealtime,Symbol%20from%20yahoo.finance.quotes%20where%20symbol%20in%20';
	
	function formatUrl(stocks){
		var new_url = []
		angular.forEach(stocks, function(val, index){
			new_url.push("'" + val + "'");
		});
		return new_url.join(',');
	}

    $scope.init = function() {
    	var popularStocksSymbols = ['YHOO','AAPL','GOOG','MSFT'];
    	formattedUrl = url + '(' +formatUrl(popularStocksSymbols) + ')';
    	console.log(formattedUrl);
    	$http.jsonp(formattedUrl).success(function(data){
    		angular.forEach(data.query.results.quote, function(value, index){
    			$scope.popularStocks.push(value);	
    		});
    	});
    };

    $scope.checkAndUpdatePrices = function(){
    	var input = [$scope.StockSymbol];
    	formattedUrl = url + '(' +formatUrl(input) + ')';
    	console.log(formattedUrl);
    	$http.jsonp(formattedUrl).success(function(data){
    		$scope.stocksQueries.push(data.query.results.quote);
    	});	
    }

    $scope.addMoney = function(){
        var moneyToAdd = parseInt($scope.money);
        $scope.balance += moneyToAdd;
        console.log('now balance is '+ $scope.balance);
    }

    $scope.buyMe = function(stock){
        var cost = stock.AskRealtime;
        if ($scope.balance >= cost){
            $scope.balance -= cost;
            alert('OK, bought');
            $scope.myStocks.push(stock);
        }
    }    


});

