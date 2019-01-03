var config = {
    production: {
        "PORT": 8087,
        "title": "app",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff'],
        "item": ['', ''],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4']
    },
    productionv2: {
        "PORT": 8088,
        "title": "CricketV2",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff'],
        "item": ['', '='],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4']
    },
    default: {
        "PORT": 8080,
        "title": "dev",
        "colour": ['#ffff00', '#00ff00', '#00ffff', '#0000ff'],
        "item": ['', ''],
        "name": ['Joueur_1', 'Joueur_2', 'Joueur_3', 'Joueur_4', 'Joueur_5', 'Joueur_6', 'Joueur_7', 'Joueur_8', 'Joueur_9']
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}