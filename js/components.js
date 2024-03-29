var player = {
    money: 500,
    spaceship: 1,
    location: 3,
    status: 0,
    travellingTo: 3,
    arrivalTime: 0
}

var statuses = ["Docked", "Travelling"]

var planets = [
    { name: "Space", distance: -1 },
    { name: "Mercury", distance: 0 },
    { name: "Venus", distance: 2 },
    { name: "Earth", distance: 4 },
    { name: "Mars", distance: 6 },
    { name: "Jupiter", distance: 13 },
    { name: "Saturn", distance: 26 },
    { name: "Uranus", distance: 40 },
    { name: "Neptune", distance: 53 },
    { name: "Pluto", distance: 66 }
]

var spaceships = [
    { name: "Cessna Spc-Rocket", timeMultiplier: 1, jumpDistance: 10, capacity: 5, price: 250 },
    { name: "Airbus A9000", timeMultiplier: 0.75, jumpDistance: 25, capacity: 100, price: 3500 },
    { name: "Boeing 9000", timeMultiplier: 0.80, jumpDistance: 37, capacity: 130, price: 3750 }
]

export { player, statuses, planets, spaceships }