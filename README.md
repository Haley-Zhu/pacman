## Available Scripts

### `Pacman CodeTest`

The Pacman CodeTest requests and details see [ie/Code-Challenge-1](https://github.com/ie/Code-Challenge-1)



### `Code Structure`

```js
|-- pacman
    |-- .gitignore
    |-- package.json
    |-- README.md
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |-- src
        |-- App.js						  // App file
        |-- App.test.js
        |-- index.js                      // entry file
        |-- components
        |   |-- InputArea.js			  // Enter command
        |   |-- Pacman.js				  // describe the pacman icon
        |   |-- PacmanMap.js			  // describe the map
        |   |-- Simulator.js			  // the Pacman simulator root file
        |-- styles
        |   |-- style.scss
        |   |-- _input-area.scss
        |   |-- _pacman-map.scss
        |   |-- _pacman.scss
        |   |-- _simulator.scss
        |-- __test__
            |-- InputArea.test.js
            |-- Pacman.test.js
            |-- PacmanMap.test.js
            |-- Simulator.test.js
            |-- __snapshots__
                |-- InputArea.test.js.snap
                |-- Pacman.test.js.snap
                |-- PacmanMap.test.js.snap
                |-- Simulator.test.js.snap

```



### `yarn start`

You could clone this repository.

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### `yarn test`

Launches the test runner in the interactive watch mode.<br />



### `See The Pacman Online`

Open https://pacmanh.netlify.com/  to see this application online.


