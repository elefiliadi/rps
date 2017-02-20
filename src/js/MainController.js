'use strict';

(function (window, angular, undefined) {

    /**
     * Define module and dependencies
     *
     * @requires constants
     * @requires rockPaperScFactory
     */
    angular.module('app', ['constants', 'rockPaperScFactory'])

    /**
     * Main controller
     *
     * @param  {object} $scope          - $scope object
     * @param  {object} $timeout        - $timeout service
     * @param  {object} CONST           - Constants
     * @param  {object} rockPaperSc     - rockPaperSc factory
     */
    .controller('MainController', ['$scope', '$timeout', 'CONST', 'rockPaperSc',
        function ($scope, $timeout, CONST, rockPaperSc) {

            var computerChoice;

            $scope.img = {
                userImg: '',
                cpuImg: ''
            };

            $scope.scoreDraw = 0;
            $scope.scoreUser = 0;
            $scope.scoreCpu = 0;

            $scope.choices = CONST.CHOICES;

            $scope.clearNotification = function () {
                $scope.isDraw = false;
                $scope.hasUserWon = false;
                $scope.hasCpuWon = false;
            };

            $scope.clearScore = function () {
                $scope.scoreDraw = 0;
                $scope.scoreUser = 0;
                $scope.scoreCpu = 0;
                rockPaperSc.setValues();
            };

            $scope.restart = function () {
                $scope.clearNotification();
                $scope.clearScore();
            };

            $scope.changeVals = function (userSelection, cpuSelection) {
                $scope.img.userImg = userSelection; // userChoice;
                $scope.img.cpuImg = cpuSelection; // computerChoice;
                $scope.userAnimation = false;
                $scope.cpuAnimation = false;
            };

            $scope.startGame = function (userChoice) {

                $scope.clearNotification();

                computerChoice = rockPaperSc.getComputerChoice($scope.choices);

                $scope.userAnimation = true;
                $scope.cpuAnimation = true;
                $scope.img.userImg = '';
                $scope.img.cpuImg = '';

                $timeout(function () {

                    $scope.changeVals(userChoice, computerChoice);

                    $scope.getResults = rockPaperSc.getRoundWinner(
                        userChoice,
                        computerChoice
                    );

                    $scope.isDraw = $scope.getResults.notif.isDraw;
                    $scope.hasUserWon = $scope.getResults.notif.hasUserWon;
                    $scope.hasCpuWon = $scope.getResults.notif.hasCpuWon;

                    $scope.scoreDraw = $scope.getResults.score.draw;
                    $scope.scoreUser = $scope.getResults.score.user;
                    $scope.scoreCpu = $scope.getResults.score.cpu;
                }, 1500);
            };
        }]);
}(window, window.angular));
