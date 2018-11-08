(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpdateController', UpdateController);

    UpdateController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', '$window'];
    function UpdateController(UserService, $location, $rootScope, FlashService, $window) {
        var vm = this;

        vm.user = null;
        vm.update = update;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                    // console.log('oioi', vm.user); 
                });
        }

        function update(user, id) {
            console.log('test', vm.user);
            UserService.Update(user, id)
                .then(function () {
                    loadCurrentUser();
                    $window.location.href = '#!/';
                     FlashService.Success('Update successful', true);
                    // if (response) {
                    //     FlashService.Success('Update successful', true);
                    //     $location.path('#!/');
                    // } else {
                    //     FlashService.Error(response.message);
                    // }
                }).catch(function (err) {
                    console.log(err);
                    FlashService.Error(response.message);
                });;
        }
    }

})();
