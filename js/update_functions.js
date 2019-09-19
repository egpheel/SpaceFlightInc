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

function createPlanetDiv(name, distance) {
    let container = document.getElementsByClassName('trav-c')

    container[0].innerHTML += '<div class="dest-c"><span>' + name + '</span><span>Distance: ' + distance + ' dunits</span><button>Travel</button></div>'
}

function updateDestinations() {
    planets.forEach(function(item, index) {
        if (planets[index].distance !== -1 && index !== player.location) {
            var distance = Math.abs(
                planets[player.location].distance - planets[index].distance
            )

            createPlanetDiv(planets[index].name, distance)
        }
    })
}

export { updateStats, updateDestinations }