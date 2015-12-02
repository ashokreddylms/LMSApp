(function(module) {
    lms.controllers = _.extend(module, {
        AddProductMixController: function(scope,resourceFactory,routeParams,location) {
            scope.allowed = [];
            scope.restricted = [];
            scope.products = [];
            resourceFactory.loanProductTemplateResource.get({isProductMixTemplate:'true'} , function(data) {
                scope.products = data.productOptions;
            });
            scope.productInfo = function(id){
                resourceFactory.loanProductResource.getProductmix({loanProductId:id,resourceType:'productmix',template:'true'},function(data) {
                    scope.productmix = data;
                    scope.allowedProducts = data.allowedProducts;
                    scope.restrictedProducts = data.restrictedProducts;
                });
            };
            scope.restrict = function(){
                for(var i in this.allowed)
                {
                    for(var j in scope.allowedProducts){
                        if(scope.allowedProducts[j].id == this.allowed[i])
                        {
                            var temp = {};
                            temp.id = this.allowed[i];
                            temp.name = scope.allowedProducts[j].name;
                            temp.includeInBorrowerCycle = scope.allowedProducts[j].includeInBorrowerCycle;
                            scope.restrictedProducts.push(temp);
                            scope.allowedProducts.splice(j,1);
                        }
                    }
                }
            };
            scope.allow = function(){
                for(var i in this.restricted)
                {
                    for(var j in scope.restrictedProducts){
                        if(scope.restrictedProducts[j].id == this.restricted[i])
                        {
                            var temp = {};
                            temp.id = this.restricted[i];
                            temp.name = scope.restrictedProducts[j].name;
                            temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
                            scope.allowedProducts.push(temp);
                            scope.restrictedProducts.splice(j,1);
                        }
                    }
                }
            };
            scope.submit = function (){
                var productId = this.formData.productId;
                var temp = [];
                var final = {};
                for(var i in scope.restrictedProducts){
                    temp[i] = scope.restrictedProducts[i].id;
                }
                final.restrictedProducts = temp;
                resourceFactory.loanProductResource.save({loanProductId: productId,resourceType:'productmix'},final,function(data) {
                    location.path('/viewproductmix/'+data.productId);
                });
            };


        }

    });
    lms.ng.application.controller('AddProductMixController', ['$scope','ResourceFactory','$routeParams','$location', lms.controllers.AddProductMixController]).run(function($log) {
        $log.info("AddProductMixController initialized");
    });
}(lms.controllers || {}));

