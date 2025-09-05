let particles = [];
let originalPositions = [];
let interactionRadius = 150;
let forceStrength = 1.5;
let particleSize = 2;
let pg;
let bgTextSize;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('bc-container');
            
    if (windowWidth > 1200) {
        bgTextSize = 700;
    } else if (windowWidth > 768) {
        bgTextSize = 300;
    } else {
        bgTextSize = 200;
    }
            
    background("#4a0c0c");
            
    createTextParticles();
}
        
function draw() {
    background('rgba(250, 247, 247, 0.13)');
            
    drawBackgroundText();
            
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let o = originalPositions[i];
                
        let d = dist(mouseX, mouseY, p.x, p.y);
                
        if (d < interactionRadius) {
            let angle = atan2(p.y - mouseY, p.x - mouseX);
            p.vx += cos(angle) * forceStrength;
            p.vy += sin(angle) * forceStrength;
        }
                
        p.vx += (o.x - p.x) * 0.02;
        p.vy += (o.y - p.y) * 0.02;
                
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;
                
        fill(255, 1, 1);
        noStroke();
        circle(p.x, p.y, particleSize);
    }
}
        
function drawBackgroundText() {
    push();
    textAlign(CENTER, CENTER);
    textSize(bgTextSize);
    textStyle(BOLD)
    fill('rgba(243, 222, 222, 0.13)'); 
    noStroke();
    text("FASTLI", width/2, height/2);
    pop();
}
        
function createTextParticles() {
    particles = [];
    originalPositions = [];
            
    pg = createGraphics(windowWidth, windowHeight);
    pg.pixelDensity(1);
    pg.background(0);
            
    let textSizeValue = 200;
    if (windowWidth < 768) {
        textSizeValue = 150;
    }
    if (windowWidth < 480) {
        textSizeValue = 100;
    }
            
    pg.textSize(textSizeValue);
    pg.textAlign(CENTER, CENTER);
    pg.fill(255, 1, 1);
    pg.text("FASTLI", width / 2, height / 2);
            
    let stepX = 5;
    let stepY = 2;
            
    if (windowWidth < 768) {
        stepX = 4;
        stepY = 2;
    }
    if (windowWidth < 480) {
        stepX = 3;
        stepY = 2;
    }
            
    pg.loadPixels();
    for (let y = 0; y < pg.height; y += stepY) {
        for (let x = 0; x < pg.width; x += stepX) {      
            let index = (x + y * pg.width) * 4;
            let r = pg.pixels[index];
            if (r > 200) {
                particles.push({ x: x, y: y, vx: 0, vy: 0 });
                originalPositions.push({ x: x, y: y });
            }
        }
    }
}
        
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
            
    if (windowWidth > 1200) {
        bgTextSize = 500;
    } else if (windowWidth > 768) {
        bgTextSize = 400;
    } else {
        bgTextSize = 300;
    }
            
    createTextParticles();
}

function touchMoved() {
    if (touches.length > 0) {
        mouseX = touches[0].x;
        mouseY = touches[0].y;
        return false;
    }
}
