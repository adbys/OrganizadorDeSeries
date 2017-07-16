  angular.module("organizadorDeSeries", []);
      angular.module("organizadorDeSeries").controller("organizadorDeSeriesCtrl", function ($scope, $http){

        /*function user = () {
          this.nome;
          this.email;
          this.watchList = [];
          this.profile = [];
        }*/

        var usuario = new Object();
        usuario.nome = "";
        usuario.email = "";
        usuario.profile = [];
        usuario.watchList = [];

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

          var promise = $http.post("http://localhost:8082/cadastrar", data).then(function(response) {
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
          var promise = $http.post("http://localhost:8082/doLogin", data).then(function(response) {
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
          console.log(usuario.nome);
          $scope.showLoginPage = true;
          usuario = new Object();
          console.log(usuario);

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
              usuario.profile.push(angular.copy(data));
                console.log(data);
              });
              console.log("Perfil");
              console.log(usuario.profile);
            }


        };

        $scope.adicionarWatch = function (serie) {
          let position = $scope.watchList.indexOf(serie);
          $scope.watchList.push(angular.copy(serie));
          usuario.watchList.push(angular.copy(serie))
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
