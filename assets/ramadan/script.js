document.addEventListener('DOMContentLoaded', function() {
    // Create a placeholder logo if none exists
    const logo = document.getElementById('logo');
    if (logo.src.includes('placeholder-logo.png')) {
        createPlaceholderLogo();
    }
    
    // Particle system
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = this.getRandomColor();
            this.opacity = Math.random() * 0.5 + 0.3;
            this.lifespan = Math.random() * 200 + 50;
            this.age = 0;
        }
        
        getRandomColor() {
            const colors = [
                'rgba(37, 155, 194,', // Primary color
                'rgba(114, 195, 65,', // Secondary color
                'rgba(255, 255, 255,', // White
                'rgba(173, 216, 230,', // Light blue
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.age++;
            
            // Reset if off screen or too old
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height ||
                this.age > this.lifespan) {
                this.reset();
            }
            
            // Fade out as it ages
            const fadeRatio = 1 - (this.age / this.lifespan);
            this.currentOpacity = this.opacity * fadeRatio;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `${this.color} ${this.currentOpacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 10)); // Responsive particle count
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add subtle glow effect to the moon and lanterns
    function addGlowPulse() {
        const moon = document.querySelector('.moon');
        const lanternLights = document.querySelectorAll('.lantern-light');
        
        // Random glow intensity for moon
        setInterval(() => {
            const intensity = 20 + Math.random() * 10;
            moon.style.boxShadow = `0 0 40px ${intensity}px rgba(37, 155, 194, 0.4)`;
        }, 2000);
        
        // Random glow intensity for lanterns
        lanternLights.forEach(light => {
            setInterval(() => {
                const intensity = 0.3 + Math.random() * 0.3;
                light.style.opacity = intensity;
            }, 1000 + Math.random() * 1000);
        });
    }
    
    addGlowPulse();
    
    // Add interactive elements - stars appear on click
    canvas.addEventListener('click', (event) => {
        // Create a burst of particles at click location
        for (let i = 0; i < 10; i++) {
            const particle = new Particle();
            particle.x = event.clientX;
            particle.y = event.clientY;
            particle.speedX = Math.random() * 4 - 2;
            particle.speedY = Math.random() * 4 - 2;
            particle.size = Math.random() * 4 + 2;
            particles.push(particle);
        }
    });
    
    // Add subtle floating animation to the greeting
    const greeting = document.querySelector('.greeting');
    let floatY = 0;
    let floatDirection = 1;
    
    function floatGreeting() {
        floatY += 0.05 * floatDirection;
        
        if (floatY > 10) floatDirection = -1;
        if (floatY < 0) floatDirection = 1;
        
        greeting.style.transform = `translateY(${floatY}px)`;
        requestAnimationFrame(floatGreeting);
    }
    
    floatGreeting();
    
    // Create a placeholder logo if needed
    function createPlaceholderLogo() {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Draw circle background
        ctx.fillStyle = '#259bc2';
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw crescent moon
        ctx.fillStyle = '#72c341';
        ctx.beginPath();
        ctx.arc(100, 100, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#259bc2';
        ctx.beginPath();
        ctx.arc(130, 100, 60, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw star
        ctx.fillStyle = '#72c341';
        drawStar(ctx, 80, 80, 5, 15, 7);
        
        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('RAMADAN', 100, 160);
        ctx.fillText('LOGO', 100, 185);
        
        // Set as logo source
        logo.src = canvas.toDataURL();
    }
    
    // Helper function to draw a star
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
});