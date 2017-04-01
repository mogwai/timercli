#! /usr/bin/env node
'use strict'
const readline = require('readline');
const say = require('say')
const ms = require('ms')

console.log("Nodejs Timer - Started\n")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function createNewTimer() {
    rl.question("What would you like to call the timer\n", (name) => {
        let timer = {
            name: name.trim()
        }

        rl.question("How long should the timer be?\n", (time) => {
            timer.time = parseTime(time)
            setTimeout(function () {
                say.speak(timer.name)
                console.log(`Timer ${timer.name} is finished`)
            }, timer.time)
            createNewTimer();
        })
    })
})()

function parseTime(timeString) {
    var times = timeString.trim().split(' ')
    var totalMS = 0;
    for (var i in times) {
        totalMS += ms(times[i])
    }
    return totalMS
}