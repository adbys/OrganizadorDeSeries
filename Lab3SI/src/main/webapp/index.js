  angular.module("organizadorDeSeries", []);
      angular.module("organizadorDeSeries").controller("organizadorDeSeriesCtrl", function ($scope, $http){

        var usuario = new Object();

        $scope.series = [];
        $scope.watchList = [];
        $scope.profile = [];
        $scope.searchBar = false;
        $scope.nenhumResultado = false;
        $scope.showLoginPage = true;



        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();
        });

        $scope.singUp = function() {
          var userName = angular.copy($scope.nomeUsuario);
          var senha = angular.copy($scope.senhaUsuario);
          var email = angular.copy($scope.emailUsuario);
          console.log("cadastrar");

          var data = {"userName": userName, "email": email, "password": senha};

          var promise = $http.post("/cadastrar", data).then(function(response) {
            console.log(response);
          });


          alert("Usuário: " + $scope.nomeUsuario  + " cadastrado com sucesso!");
          delete $scope.nomeUsuario;
          delete $scope.senhaUsuario;
          delete $scope.emailUsuario;
        }


        $scope.showSearchBar = function (){
            $scope.searchBar = true;
        };

        $scope.hideSearchBar = function (){
            $scope.searchBar = false;
        };

        $scope.doLogin = function () {

          var login = angular.copy($scope.loginUserName);
          var password = angular.copy($scope.loginPassword);
          var data = {"userName": "teste", "email": login, "password": password};
          console.log("login request");
          var promise = $http.post("/doLogin", data).then(function(response) {
            console.log("resposta");
            console.log(response.data.email);
            console.log(response.data.userName);
            console.log(response);
            if (response.data.email == null){
              delete $scope.loginUserName;
              delete $scope.loginPassword;
              alert("Usuário não cadastrado");
            } else {
              if (response.data.password == password) {
                delete $scope.loginUserName;
                delete $scope.loginPassword;
                usuario = response.data;
                loadAllWatchSeries();
                loadAllProfileSeries();
                console.log(usuario);
                $scope.showLoginPage = false;
              } else {
                delete $scope.loginUserName;
                delete $scope.loginPassword;
                alert("Senha incorreta!");
              }

            }
          });
          console.log($scope.loginUserName);
          console.log($scope.loginPassword);
        }

        $scope.doLogout = function () {
          usuario = new Object();

          $scope.showLoginPage = true;
          $scope.series = [];
          $scope.watchList = [];
          $scope.profile = [];
          $scope.searchBar = false;
          $scope.nenhumResultado = false;
          console.log(document.getElementById("profile"));
          document.getElementById("profile").className = "tab-pane in active";
          console.log(document.getElementById("profile"));
          document.getElementById("watchList").className = "tab-pane";
          document.getElementById("buscar").className = "tab-pane";
          document.getElementById("profileButton").className = "active";
          document.getElementById("watchButton").className = "";
          document.getElementById("buscarButton").className = "";


        }

        $scope.buscarSerie = function (serie) {
          $scope.searchBarPristine = false;
          var url = "?s=".concat(serie).concat("&apikey=93330d3c");
          delete $scope.serie;
          console.log(url);
          carregarFilmes(url);
        };

        $scope.adicionarProfile = function (serie) {
            console.log("addProfile");

            if(existingSerie(serie)) {
                alert("Serie já está registrada em seu perfil");
            } else {
              getFullInformation(serie).success( function (data) {
              $scope.profile.push(angular.copy(data));
              var seriePerfil = ({
                          "ownerId": usuario.id,
                           "poster": data.Poster,
                           "imdbId": data.imdbID,
                           "title": data.Title,
                            "plot": data.Plot,
                            "rated": data.Rated,
                            "imdbRating": data.imdbRating,
                            "classificacao": data.classificacao,
                            "episodio": data.episodio
                          });
              console.log("adicionar ao perfil");
              console.log(seriePerfil);
              var promise = $http.post("/saveProfile", seriePerfil).then(function(response) {
                console.log(response);
              });
              console.log(data);
              });
              console.log("Perfil");
            }


        };

        $scope.adicionarWatch = function (serie) {
          let position = $scope.watchList.indexOf(serie);
          $scope.watchList.push(angular.copy(serie));
          console.log("watchList")
          console.log($scope.watchList);
          var data = ({"ownerId": usuario.id,
                       "poster": serie.Poster,
                        "title": serie.Title,
                        "type": serie.Type,
                        "year": serie.Year,
                        "imdbId": serie.imdbID
                      });
          console.log(serie);
          console.log(data);
          var promise = $http.post("/saveWatch", data).then(function(response) {
            console.log(response);
          });
        };

        $scope.excluirProfile = function (serie) {
          var excluir = confirm("Deseja excluir " + serie.Title + " do seu perfil?");
          if (excluir) {
            let position = $scope.profile.indexOf(serie);
            var imdbId = serie.imdbID==null?serie.imdbId:serie.imdbID;
            $http.delete("/deleteProfile/" + imdbId);
            $scope.profile.splice(position, 1);
          }
        };

        $scope.salvarInformacoes = function (serie, episodio, classificacao) {
          console.log("salvar");
          serie.classificacao = angular.copy(classificacao);
          serie.episodio = angular.copy(episodio);
          var seriePerfil = ({
                      "ownerId": usuario.id,
                       "poster": serie.Poster==null? serie.poster:serie.Poster,
                       "imdbId": serie.imdbID==null? serie.imdbId:serie.imdbID,
                       "title": serie.Title==null? serie.title:serie.Title,
                        "plot": serie.Plot==null? serie.plot:serie.Plot,
                        "rated": serie.Rated==null? serie.rated:serie.Rated,
                        "imdbRating": serie.imdbRating,
                        "classificacao": serie.classificacao,
                        "episodio": serie.episodio
          });
          $http.put("/atualizarProfile", seriePerfil);
          delete $scope.episodio;
          delete $scope.classificacao;
        };

        var loadAllWatchSeries = function() {
          var promise = $http.get('/getWatchSeries/' + usuario.id).then(function(response) {
            console.log("NovaWatch");
            $scope.watchList = response.data;
            console.log($scope.watchList);
          });
        }

        var loadAllProfileSeries = function() {
          var promise = $http.get('/getProfileSeries/' + usuario.id).then(function(response) {
            console.log("NovaProfile");
            $scope.profile = response.data;
            console.log($scope.profile);
          });
        }

        var getFullInformation = function(serie) {
          var imdbID = serie.imdbID==null? serie.imdbId:serie.imdbID;
          return $http.get('https://omdbapi.com/?i=' + imdbID + '&plot=full&apikey=93330d3c');
        }

        var existingSerie = function(serie) {
              console.log("existingSerie");
              for(i = 0; i < $scope.profile.length; i++) {
                imdbId = serie.imdbID==null? serie.imdbId:serie.imdbID;
                scopeImdbId = $scope.profile[i].imdbID==null? $scope.profile[i].imdbId:$scope.profile[i].imdbID;
                if(imdbId == scopeImdbId) {
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
