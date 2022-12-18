# Grepolis Live Map
This project is a live map for the browser game Grepolis. It stores the publicly available world data supplied by Grepolis and renders that data as an interactive map. This data is updated and cached only once an hour so will be slightly out of date to the actual state of the game.

Currently this project is hosted at:
https://grepolislivemap.com/

## Implementation

### Back-end
- An Azure function built as a TypeScript Node app that fetches the latest Grepolis world data for every open world once an hour. This data is hosted publically by Grepolis at {world-code}.grepolis.com/data/{file-name}.txt

### Front-end
- React + TypeScript front end, built with Vite
- A storage account deployed into Azure that hosts the front end application, that is built as a single page application static web app