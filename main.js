const readline = require('readline');
const ms = require('ms')

console.log("Nodejs Timer - Started\n")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let timers = []
let running = true;

while (running) {
    rl.
}

function createNewTimer() {
    rl.question("What would you like to call the timer\n", (name) => {
        let timer = {
            name: name.trim()
        }

        rl.question("How long should the timer be?\n", (time) => {
            timer.time = time
            setTimeout(function () {
                spawn = require('child_process').spawn
                spawn('say', [timer.name])
                console.log(timer.name + " done")
            }, ms(time))
        })
    })
}