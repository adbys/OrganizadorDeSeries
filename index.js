  angular.module("organizadorDeSeries", []);
      angular.module("organizadorDeSeries").controller("organizadorDeSeriesCtrl", function ($scope, $http){

        $scope.series = [];
        $scope.watchList = [];
        $scope.profile = [];
        $scope.searchBar = false;


        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();
        });

        $scope.showSearchBar = function (){
            $scope.searchBar = true;
        };

        $scope.hideSearchBar = function (){
            $scope.searchBar = false;
        };

        $scope.buscarSerie = function (serie) {
          var str = serie.replace(" ", "%20");
          var url = "?s=".concat(str).concat("&apikey=93330d3c");
          delete $scope.serie;
          console.log(url);
          carregarFilmes(url);
        };

        $scope.adicionarProfile = function (serie) {
            console.log("ädd");

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
          serie.episodio = classificacao;
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
          var completeUrl = "https://omdbapi.com/".concat(url);
          $http.get(completeUrl).success( function (data) {
            $scope.series = data.Search;
            console.log($scope.series);

          }).error(function (data) {
            console.log("erro");
            console.log(data);
          });

        };

      });
