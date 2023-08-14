const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "../img/ground.png";

const food = new Image();
food.src = "../img/icons.png";

let box = 32;
let score = 0;

let foot = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

const snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let dir;

function direction(e) {
    if (e.keyCode === 37 && dir !== "right") {
        return dir = "left"
    } else if (e.keyCode === 38 && dir !== "down") {
        return dir = "up"
    } else if (e.keyCode === 39 && dir !== "left") {
        return dir = "right"
    } else if (e.keyCode === 40 && dir !== "up") {
        return dir = "down"
    }
}

function eatTail (head, tel) {
    for (let i = 0; i < tel.length; i++) {
        if (head.x === tel[i].x && head.y === tel[i].y) {
            clearInterval(game)
        }
    }
}

document.addEventListener("keydown", direction)
const drawGame = () => {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(food, foot.x, foot.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "gray"
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white"
    ctx.font = "30px Areal"
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === foot.x && snakeY === foot.y) {
        score++
        foot = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 || snakeY > box * 17)
        clearInterval(game)


    if (dir === "left") snakeX -= box
    if (dir === "right") snakeX += box
    if (dir === "up") snakeY -= box
    if (dir === "down") snakeY += box


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)
};

let game = setInterval(drawGame, 100);
















