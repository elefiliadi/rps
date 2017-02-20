'use strict';

(function (window, angular, undefined) {

    /**
     * Define module and dependencies
     */
    angular.module('constants', [])

     /**
     * CONST constants
     *
     * Default constants
     * @type {object}
     */
    .constant('CONST', {
        'CHOICES': [
            'Rock',
            'Paper',
            'Scissors'
        ]
    })

    /**
     * Constants
     *
     * Allow access to CONST constants from views
     */
    .run(['$rootScope', 'CONST', function ($rootScope, CONST) {
        $rootScope.CONST = CONST;
    }]);

}(window, window.angular));
