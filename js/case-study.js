//
//
//

const GAMEBOARD_WIDTH = 900;
const GAMEBOARD_HEIGHT = 700;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const DEFAULT_CAR_X_POSITION = 450;
const DEFAULT_CAR_Y_POSITION = 250;
const DEFAULT_CAR_ORIENTATION = ORIENTATION_UP;
let carSpeed = 0;
let autorun = 0;

let X_RANDOM_BOOM = [];
let Y_RANDOM_BOOM = [];
let X_RANDOM_WALL = [];
let Y_RANDOM_WALL = [];

let boomWidth = 30;
let boomHeight = 32;
let wallWidth = 120;
let wallHeight = 26;
let diamondWidth = 50;
let diamondHeight = 28;
let carSize = 21;

let interval = 0;
let interval1 = 0;
let interval2 = 0;
let score = 0;
let xDiamond = null;
let yDiamond = null;
let xBoom = null;
let yBoom = null;

let crash = new Crash();
let diamond = new Diamond();
let car = new Car();
let boom = new Boom();
let gameBoard = new GameBoard(car, boom, diamond, crash);

