(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$window'];
    function HomeController(UserService, $rootScope, $window) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadCurrentUser();
                $window.location.href = '#!/login';
            });
        }
    }

})();