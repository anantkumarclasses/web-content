// HTML buttons UI
const controls = document.createElement("div");
controls.style.position = "fixed";
controls.style.top = "10px";
controls.style.left = "10px";
controls.style.backgroundColor = "rgba(255,255,255,0.8)";
controls.style.padding = "10px";
controls.style.borderRadius = "8px";
controls.style.zIndex = "10";

["Uniform Velocity", "Uniform Acceleration", "Non-Uniform Acceleration"].forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.style.margin = "5px";
    btn.onclick = () => {
        if (idx === 0) motionType = "uniform_velocity";
        if (idx === 1) motionType = "uniform_acceleration";
        if (idx === 2) motionType = "non_uniform_acceleration";
    };
    controls.appendChild(btn);
});

document.body.appendChild(controls);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: 100,
    y: 100,
    vx: 2, // Initial velocity in x-direction
    vy: 1, // Initial velocity in y-direction
    ax: 0.1, // Acceleration in x-direction
    ay: 0.1, // Acceleration in y-direction
    radius: 20,
    color: "blue"
};

let motionType = "uniform_velocity"; // Options: uniform_velocity, uniform_acceleration, non_uniform_acceleration

function updateBall() {
    if (motionType === "uniform_velocity") {
        // Constant velocity
        ball.x += ball.vx;
        ball.y += ball.vy;
    } else if (motionType === "uniform_acceleration") {
        // Constant acceleration
        ball.vx += ball.ax;
        ball.vy += ball.ay;
        ball.x += ball.vx;
        ball.y += ball.vy;
    } else if (motionType === "non_uniform_acceleration") {
        // Random acceleration changes
        ball.ax = (Math.random() - 0.5) * 0.2;
        ball.ay = (Math.random() - 0.5) * 0.2;
        ball.vx += ball.ax;
        ball.vy += ball.ay;
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
    
    // Keep the ball within canvas bounds
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.vx *= -1;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.vy *= -1;
    }
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    updateBall();
    drawBall();
    requestAnimationFrame(animate);
}

// Start animation
animate();
