(function(module) {
    lms.directives = _.extend(module, {
        AutofocusDirective: function($timeout,$parse) {
            return {
                link: function(scope, element, attrs) {
                    var focus = $parse(attrs.ngAutofocus);
                    scope.$watch(focus, function(value) {
                        if(value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };

        }
    });
}(lms.directives || {}));

lms.ng.application.directive("ngAutofocus", ['$timeout','$parse',lms.directives.AutofocusDirective]).run(function($log) {
    $log.info("AutofocusDirective initialized");
});