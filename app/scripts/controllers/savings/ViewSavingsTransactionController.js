(function(module) {
  lms.controllers = _.extend(module, {
    ViewSavingsTransactionController: function(scope, resourceFactory, location, routeParams, dateFilter) {
      scope.flag = false;
      resourceFactory.savingsTrxnsResource.get({savingsId:routeParams.accountId, transactionId:routeParams.id}, function(data){
        scope.transaction = data;
        if(scope.transaction.transactionType.value=='Transfer' || scope.transaction.reversed=='true'){
            scope.flag = true;
        }
      });

      scope.undoTransaction = function(accountId, transactionId) {
        var params = {savingsId:accountId, transactionId:transactionId, command:'undo'};
        var formData = {dateFormat:'dd MMMM yyyy', locale:'en', transactionAmount:0};
        formData.transactionDate = dateFilter(new Date(),'dd MMMM yyyy');
        resourceFactory.savingsTrxnsResource.save(params, formData, function(data){
          location.path('/viewsavingaccount/' + data.savingsId);
        });
      };
    }
  });
  lms.ng.application.controller('ViewSavingsTransactionController', ['$scope', 'ResourceFactory', '$location', '$routeParams', 'dateFilter', lms.controllers.ViewSavingsTransactionController]).run(function($log) {
    $log.info("ViewSavingsTransactionController initialized");
  });
}(lms.controllers || {}));
