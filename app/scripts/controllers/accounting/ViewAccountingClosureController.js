(function(module) {
    lms.controllers = _.extend(module, {
        ViewAccountingClosureController: function(scope, resourceFactory, location, routeParams,$modal) {
            scope.accountClosure = {};
            scope.choice = 0;
            resourceFactory.accountingClosureResource.getView({accId:routeParams.id}, function(data){
                scope.accountClosure = data;
            });
            scope.deleteAcc = function () {
                $modal.open({
                    templateUrl: 'deleteacc.html',
                    controller: AccDeleteCtrl
                });
            };
            var AccDeleteCtrl = function ($scope, $modalInstance) {
                $scope.delete = function () {
                    resourceFactory.accountingClosureResource.delete({accId:routeParams.id},{}, function(data){
                        location.path('/accounts_closure');
                    });
                    $modalInstance.close('delete');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        }
    });
    lms.ng.application.controller('ViewAccountingClosureController', ['$scope', 'ResourceFactory', '$location','$routeParams','$modal', lms.controllers.ViewAccountingClosureController]).run(function($log) {
        $log.info("ViewAccountingClosureController initialized");
    });
}(lms.controllers || {}));
