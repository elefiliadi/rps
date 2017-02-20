'use strict';

describe('rockPaperScFactory', function () {

    var rockPaperSc;

    beforeEach(module('app'));

    beforeEach(inject(function (_rockPaperSc_) {
        rockPaperSc = _rockPaperSc_;
    }));

    it('should be defined', function () {
        expect(rockPaperSc).toBeDefined();
    });

    describe('setValues method', function () {

        it('should be defined', function () {
            expect(rockPaperSc.setValues).toBeDefined();
        });

        it('should call the setsPropertiesValues method', function () {
            spyOn(rockPaperSc, 'setsPropertiesValues').and.callFake(function () {
                return false;
            });

            rockPaperSc.setValues();
            expect(rockPaperSc.setsPropertiesValues).toHaveBeenCalled();
        });
    });

    describe('setsPropertiesValues method', function () {

        it('should be defined', function () {
            expect(rockPaperSc.setsPropertiesValues).toBeDefined();
        });
    });

    describe('getComputerChoice method', function () {

        it('should be defined', function () {
            expect(rockPaperSc.getComputerChoice).toBeDefined();
        });
    });

    describe('getRoundWinner method', function () {

        it('should be defined', function () {
            expect(rockPaperSc.getRoundWinner).toBeDefined();
        });

        it('should call setsPropertiesValues method', function () {
            spyOn(rockPaperSc, 'setsPropertiesValues').and.callFake(function () {
                return false;
            });

            rockPaperSc.getRoundWinner();

            expect(rockPaperSc.setsPropertiesValues).toHaveBeenCalledWith({
                hasUserWon: false, hasCpuWon: false, isDraw: true
            }, false);
        });
    });
});
