'use strict';

describe('MainController', function () {

    var $controller,
        controller = '',
        $scope = {},
        rockPaperSc;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _rockPaperSc_) {
        $controller = _$controller_;
        rockPaperSc = _rockPaperSc_;
        controller = $controller('MainController', {
            '$scope': $scope
        });
        jasmine.clock().install();
    }));

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    describe('$scope.clearNotification', function () {

        it('should be defined', function () {
            expect($scope.clearNotification).toBeDefined();
        });

        it('should set the notification values to false', function () {

            $scope.clearNotification();

            expect($scope.isDraw).toEqual(false);
            expect($scope.hasUserWon).toEqual(false);
            expect($scope.hasCpuWon).toEqual(false);
        });
    });

    describe('$scope.clearScore', function () {

        it('should be defined', function () {
            expect($scope.clearScore).toBeDefined();
        });

        it('should set the score values to 0', function () {

            $scope.clearScore();

            expect($scope.scoreDraw).toBe(0);
            expect($scope.scoreUser).toBe(0);
            expect($scope.scoreCpu).toBe(0);
        });

        it('should call the rockPaperSc.setValues method', function () {
            spyOn(rockPaperSc, 'setValues').and.callFake(function () {
                return false;
            });

            $scope.clearScore();
            expect(rockPaperSc.setValues).toHaveBeenCalled();
        });
    });

    describe('$scope.restart', function () {

        it('should be defined', function () {
            expect($scope.restart).toBeDefined();
        });

        it('should call the $scope.clearNotification and $scope.clearScore', function () {

            spyOn($scope, 'clearNotification').and.callFake(function () {
                return false;
            });

            spyOn($scope, 'clearScore').and.callFake(function () {
                return false;
            });

            $scope.restart();

            expect($scope.clearNotification).toHaveBeenCalled();
            expect($scope.clearScore).toHaveBeenCalled();
        });
    });

    describe('$scope.changeVals', function () {

        it('should be defined', function () {
            expect($scope.changeVals).toBeDefined();
        });
    });

    describe('$scope.startGame', function () {

        it('should be defined', function () {
            expect($scope.startGame).toBeDefined();
        });

        it('should set $scope.userAnimation and $scope.cpuAnimation to true', function () {

            $scope.startGame('TestValue1');

            expect($scope.userAnimation).toEqual(true);
            expect($scope.cpuAnimation).toEqual(true);
        });

        it('should call getComputerChoice method with the array of choices as parameter', function () {
            spyOn(rockPaperSc, 'getComputerChoice').and.callFake(function () {
                return false;
            });

            $scope.choices = ['TestChoice1', 'TestChoice3', 'TestChoice3'];
            $scope.startGame('TestValue1');
            expect(rockPaperSc.getComputerChoice).toHaveBeenCalledWith(['TestChoice1', 'TestChoice3', 'TestChoice3']);
        });

        it('should call getRoundWinner method returning user with 1 score point', function () {

            spyOn(rockPaperSc, 'getRoundWinner').and.callThrough();

            setTimeout(function () {
                rockPaperSc.getRoundWinner('Scissors', 'Paper');
            }, 1);

            jasmine.clock().tick(1);

            expect(rockPaperSc.getRoundWinner).toHaveBeenCalled();
            expect(rockPaperSc.getRoundWinner()).toEqual({
                score: { user: 1, cpu: 0, draw: 1 },
                notif: { hasUserWon: false, hasCpuWon: false, isDraw: true }
            });
        });

        it('should call getRoundWinner method returning CPU with 1 score point', function () {

            spyOn(rockPaperSc, 'getRoundWinner').and.callThrough();

            setTimeout(function () {
                rockPaperSc.getRoundWinner('Rock', 'Paper');
            }, 1);

            jasmine.clock().tick(1);

            expect(rockPaperSc.getRoundWinner).toHaveBeenCalled();
            expect(rockPaperSc.getRoundWinner()).toEqual({
                score: { user: 0, cpu: 1, draw: 1 },
                notif: { hasUserWon: false, hasCpuWon: false, isDraw: true }
            });
        });

        it('should call $scope.changeVals function inside timeout', function () {

            spyOn($scope, 'changeVals').and.callThrough();

            setTimeout(function () {
                $scope.changeVals('TestValue1', 'Paper');
            }, 1);

            expect($scope.changeVals).not.toHaveBeenCalled();

            jasmine.clock().tick(1);

            expect($scope.changeVals).toHaveBeenCalled();
            expect($scope.userAnimation).toEqual(false);
            expect($scope.cpuAnimation).toEqual(false);
            expect($scope.img.cpuImg).toEqual('Paper');
            expect($scope.img.userImg).toEqual('TestValue1');
        });
    });
});
