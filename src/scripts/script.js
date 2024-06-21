const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX, startY, currentX, currentY;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        currentX = e.offsetX;
        currentY = e.offsetY;
        drawArrow(startX, startY, currentX, currentY, false);
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (isDrawing) {
        isDrawing = false;
        currentX = e.offsetX;
        currentY = e.offsetY;
        drawArrow(startX, startY, currentX, currentY, true);
    }
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

function drawArrow(fromX, fromY, toX, toY, finalDraw) {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la línea principal
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Calcular el ángulo de la línea
    const angle = Math.atan2(toY - fromY, toX - fromX);

    // Longitud de la cabeza de la flecha
    const headLength = 10;

    // Dibuja la cabeza de la flecha
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
