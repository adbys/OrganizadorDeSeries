  angular.module("organizadorDeSeries", []);
      angular.module("organizadorDeSeries").controller("organizadorDeSeriesCtrl", function ($scope, $http){

        $scope.series = [];
        $scope.watchList = [];
        $scope.profile = [];
        $scope.searchBar = false;
        $scope.nenhumResultado = false;
        $scope.showLoginPage = true;



        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();
        });


        $scope.showSearchBar = function (){
            $scope.searchBar = true;
        };

        $scope.hideSearchBar = function (){
            $scope.searchBar = false;
        };

        $scope.doLogin = function () {
          $scope.showLoginPage = false;
          console.log($scope.loginUserName);
          console.log($scope.loginPassword);
        }

        $scope.doLogout = function () {
          $scope.showLoginPage = true;

        }

        $scope.ajax = function () {
          var httpRequest = new XMLHttpRequest();
          console.log("servidor");
          httpRequest.open("GET", "http://localhost:8082/ajax", true);
        //  httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
          httpRequest.send();
      /*    $.ajax({
          type : "GET",
        processData:false,

        crossDomain:true,
        crossOrigin:true,
        contentType:false,
        //dataType: 'jsonp',                headers: { "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
        header:{'Access-Control-Allow-Origin': '*'},
        //header:("Access-Control-Allow-Methods: PUT, GET, POST"),
        //header:("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"),
        url : "http://localhost:8082/ajax",
        data: formData,
        success : function(receivedData) {
            console.log("SUCCESS: ");
            alert(receivedData);

            }

});*/

        }

        $scope.buscarSerie = function (serie) {
          $scope.searchBarPristine = false;
          var url = "?s=".concat(serie).concat("&apikey=93330d3c");
          delete $scope.serie;
          console.log(url);
          carregarFilmes(url);
        };

        $scope.adicionarProfile = function (serie) {
            console.log("add");

            if(existingSerie(serie)) {
                alert("Serie já está registrada em seu perfil");
            } else {
              getFullInformation(serie).success( function (data) {
              $scope.profile.push(angular.copy(data));
                console.log(data);
              });
              console.log("Perfil");
              console.log($scope.profile);
            }


        };

        $scope.adicionarWatch = function (serie) {
          let position = $scope.watchList.indexOf(serie);
          $scope.watchList.push(angular.copy(serie));
          console.log("watchList")
          console.log($scope.watchList);
        };

        $scope.excluirProfile = function (serie) {
          var excluir = confirm("Deseja excluir " + serie.Title + " do seu perfil?");
          if (excluir) {
            let position = $scope.profile.indexOf(serie);
            $scope.profile.splice(position, 1);
          }
        };

        $scope.salvarInformacoes = function (serie, episodio, classificacao) {
          console.log("salvar");
          serie.classificacao = classificacao;
          serie.episodio = episodio;
          delete $scope.episodio;
          delete $scope.classificacao;
        };

        var getFullInformation = function(serie) {
          return $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');
        }

        var existingSerie = function(serie) {
              console.log("existingSerie");
              for(i = 0; i < $scope.profile.length; i++) {
                if(serie.imdbID == $scope.profile[i].imdbID) {
                  return true;
                }
              }
              return false;
        };

        var carregarFilmes = function (url){
          console.log("carregar filmes");
          var completeUrl = "https://omdbapi.com/".concat(url);
          $http.get(completeUrl).success( function (data) {
            console.log(data.Error);
            if (data.Error == "Movie not found!") {
              $scope.nenhumResultado = true;
            } else {
              $scope.nenhumResultado = false;
              $scope.series = data.Search;
              console.log("sucesso");
              console.log($scope.series);

            }


          }).error(function (data) {
            console.log("erro");
            console.log(data);
          });

        };

      });
