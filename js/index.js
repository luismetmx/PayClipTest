//Initialize Angular app

var app = angular.module("Fuzzy", []);

//Building Angular Controller

app.controller("FuzzyController", function($scope) {
    //Fix date Format to YY-MM-DD T HH:MM
    var pattern = "";

    $scope.initializeArray = function(){
        $scope.FuzzyDataArray = [ 
            { amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
            { amount: 0.45, date: '01-12-2017T09:36', card_last_four: '4434' },
            { amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
            { amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
            { amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
            { amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
            { amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
            { amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
            { amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
            { amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' }
        ];
    }

    $scope.FixDate = function(){
        for(var i=0; i<$scope.FuzzyDataArray.length; i++)
        {
            var res = $scope.FuzzyDataArray[i].date.split("T");
            var sub = res[0].split("-");
            var fix = sub[2] + "-" + sub[1] + "-" + sub[0];
            var str2 = fix + "T" + res[1];
            $scope.FuzzyDataArray[i].date = str2;
        }
    }

    //Finding elements in list
    $scope.fuzzy_search = function(text){

        //Initializin array when the user erase 1 character
        $scope.initializeArray();
        $scope.FixDate();
        //Checking when is almost one character on the input

        if(text.length != 0)
        {
            pattern = "";
            finalPattern = null;
            var newArrayData = [];
            for(var i=0; i<text.length; i++)
            {  
                pattern += text[i];
            }    

            //Building the pattern to de REGEX

            var finalPattern = new RegExp(pattern , "gi");
            for(var j=0; j<$scope.FuzzyDataArray.length; j++)
            {
                //verifying the pattern on the entire table
                if((finalPattern.test($scope.FuzzyDataArray[j].amount))
                    ||(finalPattern.test($scope.FuzzyDataArray[j].card_last_four))
                    ||(finalPattern.test($scope.FuzzyDataArray[j].date))
                  )
                {
                    newArrayData.push($scope.FuzzyDataArray[j]);
                }
            }

            //fill the table with the pattern
            $scope.FuzzyDataArray = null;
            $scope.FuzzyDataArray = newArrayData;
        } 
        else
        {
            //Return to the initial point (when isn't nothing on the input)
            pattern = null;
            $scope.initializeArray();
            $scope.FixDate();
        }
    }

    $scope.initializeArray();
    $scope.FixDate();
    
});