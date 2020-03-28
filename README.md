# Map-Locator
Testing webApp for google map

## Setup

Make sure [Meteor js](https://www.meteor.com/install) is already installed in your machine.

To start installing used npm packages
```bash
meteor npm install --save
```

Remember to insert your google map api key to enable google map

replace "YOUR_GOOGLE_MAP_API_TOKEN" with your API key in `private/apiKey.json`
```json
    "keys": {
        "googleMap": "YOUR_GOOGLE_MAP_API_TOKEN"
    }
```

To run the server. Simply run
```bash
meteor
```
by default it will run in `localhost:3000`

## Enjoy!