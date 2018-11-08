(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpdateController', UpdateController);

    UpdateController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function UpdateController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.user = null;
        vm.update = update;

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function update(user, id) {
            console.log('test', vm.user);
            UserService.Update(user, id)
                .then(function (response) {
                    // console.log('test', response);
                    if (response.success) {
                        FlashService.Success('Update successful', true);
                        $location.path('#!/');
                    } else {
                        FlashService.Error(response.message);
                    }
                }).catch(function (err) {
                    console.log(err);
                    throw err;
                });;
        }
    }

})();
