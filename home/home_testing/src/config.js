var CONFIG = {
    "androidUrl": "",
    "appleUrl": "",
    "amazonUrl": "",
    "gameEvents": {
        "time-after-interaction": {
            "time": 15000,
            "cta": false,
            "activation": "interaction"
        },
        "interaction": {
            "interactions": 30,
            "cta": false
        },
        "time": {
            "time": 30000,
            "cta": false
        },
        "time-after-outro": {
            "time": 2500,
            "cta": true,
            "activation": "outro"
        }
    },
    "idsForVungleStyles": [ 
        //"logo_portrait", 
        //"logo_landscape", 
        //"download_button_portrait", 
        //"download_button_landscape", 
        "cake_portrait", 
        //"cake_landscape"
    ],
    "I18": {
        "locale": "en",
        "strings": {
            "Play": {
                "en": "Play",
                "ru": "Играть"
            },
            "Your score: %s": {
                "en": "Your score: %s",
                "ru": "Вы набрали %s очков!"
            }
        }
    },
    "application": {
        "showFPS": false,
        "skipOutro": false
    }
};