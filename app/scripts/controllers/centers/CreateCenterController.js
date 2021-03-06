(function(module) {
    lms.controllers = _.extend(module, {
        CreateCenterController: function(scope, resourceFactory, location, dateFilter) {
            scope.offices = [];
            scope.staffs = [];
            scope.data = {};
            scope.first = {};
            scope.formData = {};
            scope.restrictDate = new Date();
            scope.first.date = new Date();
            resourceFactory.centerTemplateResource.get(function(data) {
                scope.offices = data.officeOptions;
                scope.staffs = data.staffOptions;
                scope.groups = data.groupMembersOptions;
                scope.formData.officeId = data.officeOptions[0].id;
            });

            scope.changeOffice =function() {
                resourceFactory.centerTemplateResource.get({staffInSelectedOfficeOnly : false, officeId : scope.formData.officeId
                }, function(data) {
                    scope.staffs = data.staffOptions;
                });
                resourceFactory.centerTemplateResource.get({officeId : scope.formData.officeId }, function(data) {
                    scope.groups = data.groupMembersOptions;
                });
            };
            scope.setChoice = function(){
                if(this.formData.active){
                    scope.choice = 1;
                }
                else if(!this.formData.active){
                    scope.choice = 0;
                }
            };
            scope.submit = function() {
                var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
                this.formData.activationDate = reqDate;
                
                if (scope.first.submitondate) {
                    reqDate = dateFilter(scope.first.submitondate,'dd MMMM yyyy');
                    this.formData.submittedOnDate = reqDate;
                }

                this.formData.locale  = 'en';
                this.formData.dateFormat =  'dd MMMM yyyy';
                this.formData.active = this.formData.active || false;
                resourceFactory.centerResource.save(this.formData,function(data){
                    location.path('/viewcenter/' + data.resourceId);
                });
            };
        }
    });
    lms.ng.application.controller('CreateCenterController', ['$scope', 'ResourceFactory', '$location','dateFilter', lms.controllers.CreateCenterController]).run(function($log) {
        $log.info("CreateCenterController initialized");
    });
}(lms.controllers || {}));
