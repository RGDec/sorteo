const stringsList = ["Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5", "Opción 6", "Opción 7", "Opción 8", "Opción 9", "Opción 10", "Opción 11"];
let selectedSegmentIndex = -1;

document.addEventListener("DOMContentLoaded", function () {
    setupWheel();
});

function setupWheel() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    const numSegments = stringsList.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    drawWheel(context, centerX, centerY, radius, numSegments, segmentAngle);
}

function startSpin() {
    const resultElement = document.getElementById("result");
    resultElement.style.opacity = 0;
    resultElement.innerText = '';

    let spins = Math.floor(Math.random() * 100);
    let spinDuration = 200000;
    let rotation = 0;

    const spinInterval = setInterval(function () {
        rotation += 30;
        drawRotatedWheel(rotation);

        spins--;

        if (spins === 0) {
            clearInterval(spinInterval);
            selectedSegmentIndex = getSelectedSegment(Math.floor(Math.random() * stringsList.length));
            const selectedString = stringsList[selectedSegmentIndex];
            resultElement.innerText = `¡Ganador del Sorteo: ${selectedString}!`;

            drawWheelAfterSelection();
            selectedSegmentIndex = -1; // Restablecer el índice para el próximo giro
            resultElement.style.opacity = 1;
        }
    }, spinDuration / (spins * 50));
}

function drawRotatedWheel(rotation) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((rotation * Math.PI) / 180);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    drawWheel(context, canvas.width / 2, canvas.height / 2, 200, stringsList.length, (2 * Math.PI) / stringsList.length);
    context.restore();
}

function drawWheel(context, centerX, centerY, radius, numSegments, segmentAngle) {
    const colors = ["#F190D8", "#E5B8FF", "#fdc2e1", "#F190F2", "#ffb8e9", "#D294FF"];

    for (let i = 0; i < numSegments; i++) {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);

        // Cambiar el color de fondo del segmento seleccionado
        if (i === selectedSegmentIndex) {
            context.fillStyle = "#E900E8";
        } else {
            context.fillStyle = colors[i % colors.length];
        }

        context.fill();
        context.stroke();

        const label = stringsList[i];
        context.save();
        context.translate(centerX, centerY);
        context.rotate(startAngle + segmentAngle / 2);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#000";
        context.font = "bold 20px Arial";
        context.fillText(label, radius / 1.5, 0);
        context.restore();
    }
}

function drawWheelAfterSelection() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    const numSegments = stringsList.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    // Volver a dibujar solo el segmento seleccionado con el nuevo color
    drawWheel(context, centerX, centerY, radius, numSegments, segmentAngle);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getSelectedSegment(rotation) {
    const numSegments = stringsList.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    const normalizedRotation = (rotation % 360 + 360) % 360;
    const selectedSegment = Math.floor((normalizedRotation + segmentAngle / 2) / segmentAngle) % numSegments;

    return (selectedSegment + numSegments) % numSegments;
}

function reloadPage() {
    location.reload();
}