# Grepolis Live Map
This project is a live map for the browser game Grepolis. It stores the publicly available world data supplied by Grepolis and renders that data as an interactive map. This data is updated and cached only once an hour so will be slightly out of date to the actual state of the game.

Currently this project is hosted at:
https://grepolislivemap.com/

## Options

The url is https://grepolislivemap.com/<world-code>/<date> where `world-code` is the greplis world code, for example en100 and `date` is a date in for form yyyy_MM_dd

The allowed query params are:
- islands: `none | center | outer | all`
- greyPlayers: `true | false`
- cityScale: `50...300`
- fullscreen: `true | false`
