var config = {
    production: {
        "PORT": 8086,
        "title": "CountScore",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00'],
        "item": ['', ''],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4', 'Joueur_5', 'Joueur_6', 'Joueur_7', 'Joueur_8', 'Joueur_9']
    },
    productionv2: {
        "PORT": 8086,
        "title": "CountScore",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00'],
        "item": ['', '='],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4', 'Joueur_5', 'Joueur_6', 'Joueur_7', 'Joueur_8', 'Joueur_9']
    },
    default: {
        "PORT": 8086,
        "title": "CountScoreDev",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ffff00'],
        "item": ['', ''],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4', 'Joueur_5', 'Joueur_6', 'Joueur_7', 'Joueur_8', 'Joueur_9']
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}