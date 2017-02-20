'use strict';

(function (window, angular, undefined) {

    /**
     * Define module and dependencies
     */
    angular.module('rockPaperScFactory', [])

    /**
     * Rock, paper, scissors factory
     */
    .factory('rockPaperSc', function () {

        var rockPaperSc,
            computerChoice,
            userChoice,
            results = {
                score: {
                    user: 0,
                    cpu: 0,
                    draw: 0
                },
                notif: {
                    hasUserWon: false,
                    hasCpuWon: false,
                    isDraw: false
                }
            };

        rockPaperSc = {
            /**
             * Set the values of object or array properties
             *
             * @param  {object} object          - Object to change its properties
             * @param  {*} value                - Value to be set for object's properties
             */
            setsPropertiesValues: function (object, value) {
                angular.forEach(object, function (val, key) {
                    object[key] = value;
                });
            },

            /**
             * Calls the setsPropertiesValues method
             */
            setValues: function () {
                rockPaperSc.setsPropertiesValues(results.score, 0);
            },

            /**
             * Get the random value of the array of elements
             *
             * @param   {Object[]} choices        - The choices available to choose from
             *
             * @return  {string}
             */
            getComputerChoice: function (choices) {

                return choices[Math.floor(Math.random() * choices.length)];
            },

            /**
             * Get the random value of the array of elements
             *
             * @param   {string} userSelection      - User's selection
             * @param   {string} cpuSelection       - Computer's selection
             *
             * @return  {object}                    - An object containing round winner and score information
             */
            getRoundWinner: function (userSelection, cpuSelection) {
                computerChoice = cpuSelection;
                userChoice = userSelection;
                rockPaperSc.setsPropertiesValues(results.notif, false);

                if (computerChoice !== userChoice) {
                    if (((userChoice === 'Rock') && (computerChoice !== 'Paper')) ||
                        ((userChoice === 'Paper') && (computerChoice === 'Rock')) ||
                        ((userChoice === 'Scissors') && (computerChoice === 'Paper'))) {

                        results.score.user++;
                        results.notif.hasUserWon = true;

                    } else {
                        results.score.cpu++;
                        results.notif.hasCpuWon = true;
                    }

                } else {
                    results.score.draw++;
                    results.notif.isDraw = true;
                }

                return results;
            }
        };

        return rockPaperSc;
    });
}(window, window.angular));
