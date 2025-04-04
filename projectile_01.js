const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: 50,
    y: canvas.height - 50,
    vx: 20 * Math.cos(Math.PI / 3),
    vy: -20 * Math.sin(Math.PI / 3),
    radius: 5
};

const g = 9.8;
const dt = 0.02;
const k = 0.05; // Air resistance coefficient
const e = 0.05;
let path = [];

function update() {
    let v = Math.sqrt(ball.vx ** 2 + ball.vy ** 2);
    let ax = -k * ball.vx;
    let ay = g - k * ball.vy;

    ball.vx += ax * dt;
    ball.vy += ay * dt;

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    
    if(ball.y > (canvas.height - 55)) {
        ball.vy = - e * ball.vy;
    }

    path.push([ball.x, ball.y]);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trail
    ctx.beginPath();
    for (let i = 0; i < path.length - 1; i++) {
        ctx.moveTo(path[i][0], path[i][1]);
        ctx.lineTo(path[i + 1][0], path[i + 1][1]);
    }
    ctx.strokeStyle = "gray";
    ctx.stroke();

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function animate() {
    if (ball.y < canvas.height) {
        update();
        draw();
        requestAnimationFrame(animate);
    }
}

animate();

