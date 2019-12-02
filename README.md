## Pacman

### `Pacman CodeTest`

The Pacman CodeTest requests and details see [ie/Code-Challenge-1](https://github.com/ie/Code-Challenge-1)



### `See The Pacman Online`

Open https://pacmanh.netlify.com/  to see this application online.



### `Play It`

1. Enter single command in input area, then press 'Enter' to submit the command

2. If the command is not valid, there will be Error Message

3. Use commands below to control the pacman

   - PLACE x,y,face    // To place pacman
     - valid x from 0 to 4
     - valid y from 0 to 4
     - valid face is ['NORTH', 'EAST', 'SOUTH', 'WEST']
   - MOVE  // To move pacman 1 grid toward the direction
   - LEFT  // To rotate direction 
   - RIGHT //
   - REPORT   // To output the position

   Notice: the command is Case-insensitive, you can also use 'move', 'left', etc; but they are strict format, command such as 'place 2,   3   , north' is invalid.

4. Once submit 'REPORT' command, the test is over; Please click 'RESET' button to start a new one.



### `Test Data`

There are provided test data [here](https://github.com/Haley-Zhu/pacman/blob/master/testdata.txt)

You can use them to play it.



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






