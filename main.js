window.onload = () => {
	let buttons = document.querySelectorAll('button');
	for (let element of buttons) {
		element.addEventListener('click', go, false);
	}
	let info1 = document.querySelector('.info1');
	let info2 = document.querySelector('.info2');
	let info3 = document.querySelector('.info3');
	function go(event) {
		if (event.currentTarget.classList.contains('btn1')) {
			info1.style.display = "block";
			info2.style.display = "none";
			info3.style.display = "none";
		} else if (event.currentTarget.classList.contains('btn2')) {
			info1.style.display = "none";
			info2.style.display = "block";
			info3.style.display = "none";
		} else if (event.currentTarget.classList.contains('btn3')) {
			info1.style.display = "none";
			info2.style.display = "none";
			info3.style.display = "block";
		}
	}
}