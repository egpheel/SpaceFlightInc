import { player, planets, statuses, spaceships } from './components.js'

function updateStats() {
    var stats = document.getElementsByClassName('lbl')

    var i;

    for (i = 0; i < stats.length; i++) {
        let stat = stats[i];
        
        // update money
        if (stat.innerHTML.startsWith('Money', 6)) {
            stat.innerHTML = '<span>Money: <span>' + player.money + '</span> munits</span>'
        }
        // update spaceship
        else if (stat.innerHTML.startsWith('Spaceship', 6)) {
            stat.innerHTML = '<span>Spaceship: <span>' + spaceships[player.spaceship].name + '</span></span>'
        }
        // update spaceship's speed
        else if (stat.innerHTML.startsWith('Speed', 6)) {
            stat.innerHTML = '<span>Speed: <span>' + spaceships[player.spaceship].timeMultiplier + '</span> sec/dunit</span>'
        }
        // update spaceship's jump distance
        else if (stat.innerHTML.startsWith('Jump Distance', 6)) {
            stat.innerHTML = '<span>Jump Distance: <span>' + spaceships[player.spaceship].jumpDistance + '</span> dunits</span>'
        }
        // update spaceship's passenger capacity
        else if (stat.innerHTML.startsWith('Passenger', 6)) {
            stat.innerHTML = '<span>Passenger Capacity: <span>' + spaceships[player.spaceship].capacity + '</span></span>'
        }
        // update current location
        else if (stat.innerHTML.startsWith('Location', 6)) {
            stat.innerHTML = '<span>Location: <span>' + planets[player.location].name + '</span></span>'
        }
        // update current status
        else if (stat.innerHTML.startsWith('Status', 6)) {
            stat.innerHTML = '<span>Status: <span>' + statuses[player.status] + '</span></span>'
        }
    }
}

function createPlanetDiv(index, distance) {
    let container = document.getElementsByClassName('trav-c')
    
    let div = document.createElement('div')
    div.setAttribute('class', 'dest-c')
    div.innerHTML = '<span>' + planets[index].name + '</span><span>Distance: ' + distance + ' dunits</span>'

    let btn = document.createElement('button')
    let btnText = document.createTextNode('Travel')
    btn.setAttribute('class', 'travelBtn')
    
    if (distance > spaceships[player.spaceship].jumpDistance) {
        btn.setAttribute('disabled', 'true')
        btnText = document.createTextNode('Too far')
    }

    btn.appendChild(btnText)

    btn.addEventListener('click', function() {
        travelTo(index, distance)
    })

    div.appendChild(btn)

    container[0].appendChild(div)
}

function travelTo(index, distance) {
    player.location = 0
    player.status = 1
    player.travellingTo = index

    updateStats()

    var travelTime = Math.round(distance * spaceships[player.spaceship].timeMultiplier)

    let date = new Date()
    let now = date.getTime()

    player.arrivalTime = now + travelTime * 1000

    clearDestinations()

    startTravel(index)
}

function startTravel(index) {
    var date = new Date()
    var now = date.getTime()
    var travelTime = Math.round((player.arrivalTime - now)/1000)

    var container = document.getElementsByClassName('trav-c')

    container[0].innerHTML = travelTime + " seconds left to arrive at " + planets[index].name

    var timeLeft = setInterval(function() {
        date = new Date()
        now = date.getTime()
        travelTime = Math.round((player.arrivalTime - now)/1000)

        container[0].innerHTML = travelTime + " seconds left to arrive at " + planets[index].name

        if (travelTime <= 0) {
            clearInterval(timeLeft)
            
            player.location = index
            player.status = 0
            
            container[0].innerHTML = ''

            updateStats()
            updateDestinations()
        }
    }, 1000)
}

function clearDestinations() {
    let container = document.getElementsByClassName('trav-c')
    
    container[0].innerHTML = ''
}

function updateDestinations() {
    // if travelling, do not update destinations and start travel countdown
    if (player.status === 1) {
        startTravel(player.travellingTo)
    } else {
        planets.forEach(function(item, index) {
            if (planets[index].distance !== -1 && index !== player.location) {
                var distance = Math.abs(
                    planets[player.location].distance - planets[index].distance
                )
    
                createPlanetDiv(index, distance)
            }
        })
    }
}

export { updateStats, updateDestinations }