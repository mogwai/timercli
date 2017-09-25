#! /usr/bin/env node
'use strict'
const readline = require('readline');
const say = require('say')
const ms = require('ms')
const prettyMs = require('pretty-ms')
console.log("----------------------------")
console.log("Timer Command Line Interface")
console.log("----------------------------\nExamples:")
console.log("\nStart a Timer:\n timer Chicken 5m")
console.log(" t start Lap1")
console.log("\nCancel a Timer:\n timer Chicken cancel")
console.log("\nStart a Stopwatch:\n stopwatch start Lap1")
console.log(" s start Lap1")
console.log('\nStop a Stopwatch:\n stopwatch stop Lap1')
console.log('\nList stopwatches:\n stopwatch list')
console.log('\nList timers:\n timer list')
console.log("----------------------------")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let timers = {}
let stopwatches = {}

rl.on('line', (line) => {
    let args = line.split(' ')
    let command = args[0]
    if (command === "s" || command == "stopwatch") {
        stopwatchCommand(args)
    } else if (command === "t" || command === "timer") {
        timerCommand(args)
    } else {
        console.log('Invalid Command')
    }
})

function timerCommand(args) {
    let name = args[1]
    let value = args[2]
    if (name == "list") {
        console.log('\n Running Timers \n')
        for (var k in timers) {
            printTimer(k)
        }
        return
    }
    if (value == "cancel") {
        if (timers[name]) {
            timers[name] = null
            console.log(name + "timer cancelled")
        } else {
            console.log(`No timer with name ${name} found`)
        }
    } else if (!timers[name]) {
        args[0] = ''
        args[1] = ''
        let time = args.join(' ')
        if (!time.trim())
            return console.log('Please enter a time')
        time = parseTime(time)
        if (!time)
            return console.log('Invalid time')
        timers[name] = { time: time, start: new Date() }
        setTimeout(() => {
            if (timers[name]) {
                console.log('Timer Finished: ' + name + " " + currentTime())
                say.speak(name)
            }
        }, time)
        console.log('Timer Started: ' + name + " " + currentTime())
    } else {
        console.log('Invalid Command')
    }
}

function printTimer(name) {
    let timer = timers[name]
    if (timer) {
        let sincestart = new Date() - timer.start
        let timerleft = timer.time - sincestart
        console.log(name + ' : ' + prettyMs(timerleft))
    } else {
        console.log('No timer exists with name ' + name)
    }
}

function stopwatchCommand(args) {
    let subcommand = args[1]
    let name = args[2]

    if (subcommand == "start") {
        if (!name) console.log('Enter a name for the watch')
        if (stopwatches[name])
            console.log('Stop watch already exists')
        else {
            stopwatches[name] = Date.now()
            console.log('Stopwatch Started: ' + name)
        }
    }
    else if (subcommand == "stop") {
        if (!name) console.log('Enter a name for the watch')
        if (stopwatches[name]) {
            printStopWatch(name)
            stopwatches[name] = null
            console.log('Stopwatch Stopped: ' + name)
        } else {
            console.log('ERROR: Cannot find stopwatch ' + name)
        }
    } else if (subcommand == "list") {
        console.log('\n Running Stopwatches \n')
        for (var k in stopwatches) {
            printStopWatch(k)
        }
    } else {
        console.log('Invalid Command')
    }

}

function printStopWatch(watch) {
    var time = new Date() - stopwatches[watch]
    console.log(`${watch} : ${prettyMs(Date.now() - stopwatches[watch])}`)
}

function parseTime(timeString) {
    var times = timeString.trim().split(' ')
    var totalMS = 0;
    for (var i in times) {
        totalMS += ms(times[i])
    }
    return totalMS
}

function currentTime() {
    let time = new Date()
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}