PlayerEvents.loggedIn(event => {
    event.level.runCommand('gamerule naturalRegeneration false')
    event.level.runCommand('gamerule playersSleepingPercentage 0')
})