


(function () {
	let canvas = document.querySelector('#canvas');
	let ctx = canvas.getContext('2d');

	let w = canvas.width = innerWidth;
	let h = canvas.height = innerHeight;
	let particles = [];

	let properties = {
		backgroundColor: 'rgba(17, 17, 19, 1)',
		particleColor: 'rgba(255, 40, 40, 1)',
		particleRadius: 3,
		particalCount: 60,
		particleMaxVelocity: 0.5,
		lineLength: 150,
		particleLife: 6
	}
	//working with windows:

	window.addEventListener('resize', () => {
		let w = canvas.width = innerWidth;
		let h = canvas.height = innerHeight;
	});

	class Particle {
		constructor() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.velocityX = (Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity);
			this.velocityY = (Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity);
			this.life = Math.random() * properties.particleLife * 60;
		}
		position() {
			this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;

			this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;

			this.x += this.velocityX;
			this.y += this.velocityY;
		}
		redraw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}
		// reCalculateLife() {
		// 	if (this.life < 1) {
		// 		this.x = Math.random() * w;
		// 		this.y = Math.random() * h;
		// 		this.velocityX = (Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity);
		// 		this.velocityY = (Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity);
		// 		this.life = Math.random() * properties.particleLife * 60;
		// 	}
		// 	this.life--;
		// }
	}

	function reDrawBackBackground() {
		ctx.fillStyle = properties.backgroundColor;
		ctx.fillRect(0, 0, w, h);
	}
	function drawLines() {
		let x1, y1, x2, y2, length, opacity;
		for (let i in particles) {
			for (let j in particles) {
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
				if (length < properties.lineLength) {
					opacity = 1 - length / properties.lineLength;
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}
	function reDrawParticles() {
		for (var i in particles) {
			// particles[i].reCalculateLife();
			particles[i].position();
			particles[i].redraw();
		}
	}
	function loop() {
		reDrawBackBackground();
		reDrawParticles();
		drawLines();
		requestAnimationFrame(loop);
	}
	init();
	function init() {
		for (let i = 0; i < properties.particalCount; i++) {
			particles.push(new Particle);
		}
		loop();

	}

})();
(function () {
	let customized = document.querySelector('.customization');
	let w = window.innerWidth;
	let h = window.innerHeight;
	customized.style.height = h + 'px';
	customized.style.width = w + 'px';
	//adding the width depending on the width of the customization width:

	//!adding effects to .close:

	let closer = document.querySelector('.close');



	closer.addEventListener('click', () => {
		document.querySelector('.innercustomization').style.display = 'none';
	});


	//add event listener to customize:
	let button = document.querySelector('div');
	button.onclick = function () {
		console.log('Hi, dummy')
	}
	//adding an event listener to close:



})(); 
