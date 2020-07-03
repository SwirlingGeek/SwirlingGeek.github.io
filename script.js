(function () {
	let canvas = document.querySelector('canvas');
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
	let bar = document.querySelector('div.bar');

	bar.style.width = '50px';
	bar.style.height = '20px';

	bar.style.backgroundColor = 'yellow';
	//?here we wirte mouse coords:
	let mouse = {
		x: 0,
		y: 0
	}

	//!Having a event listener:

	bar.addEventListener('mousedown', event => {

		[mouse.x, mouse.y] = [event.clientX, event.clientY];

	}, true);
	bar.addEventListener('mouseup', event => {

		if (mouse.x > event.clientX) {
			if (parseInt(bar.style.width) < 20) {
				alert('The smallest value was reached!');
			} else {
				let difference = mouse.x - event.clientX;

				let barWidth = parseInt(bar.style.width);

				barWidth -= difference;
				bar.style.width = barWidth + 'px';

			}

		} else if (mouse.x < event.clientX) {
			if (parseInt(bar.style.width) > 250) {
				alert('The biggest value was reached!');
				if (confirm('Do you want to optimise your value?')) {
					bar.style.width = (parseInt(bar.style.width) / 2) + 'px';
				}
			} else {
				//check whether the value fits:

				let difference = event.clientX - mouse.x;
				if (go(difference)) {
					let barWidth = parseInt(bar.style.width);

					barWidth += difference;
					bar.style.width = barWidth + 'px';
				}



			}
		}
		function go(diff) {

			let currentInnerContWidth = parseInt(document.querySelector('.bar').style.width);

			if ((currentInnerContWidth + diff) < 300) {
				return true;
			} else return false;
		}
	})

})();