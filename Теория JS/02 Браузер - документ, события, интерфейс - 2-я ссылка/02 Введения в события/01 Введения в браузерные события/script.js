// 1-я задача Скрыть элемент по нажатию кнопки
document.getElementById('hiddenText').onclick = function () {
	document.getElementById('text').style.display = 'none'
}

// 3-я задача Передвиньте мяч по полю
field.onclick = function (event) {
	let fieldCoords = this.getBoundingClientRect()

	let ballCoords = {
		top:
			event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2,
		left:
			event.clientX -
			fieldCoords.left -
			field.clientLeft -
			ball.clientWidth / 2,
	}

	if (ballCoords.top < 0) ballCoords.top = 0

	if (ballCoords.left < 0) ballCoords.left = 0

	if (ballCoords.left + ball.clientWidth > field.clientWidth) {
		ballCoords.left = field.clientWidth - ball.clientWidth
	}

	if (ballCoords.top + ball.clientHeight > field.clientHeight) {
		ballCoords.top = field.clientHeight - ball.clientHeight
	}

	ball.style.left = ballCoords.left + 'px'
	ball.style.top = ballCoords.top + 'px'
}

// 4-я задача Создать меню, которое по нажатию открывается либо закрывается
let menuElem = document.getElementById('sweeties')
let titleElem = menuElem.querySelector('.title')

titleElem.onclick = function () {
	menuElem.classList.toggle('open')
}

// 5-я задача Добавить кнопку закрытия
let panes = document.querySelectorAll('.pane')

for (let pane of panes) {
	pane.insertAdjacentHTML(
		'afterbegin',
		'<button class="remove-button">[x]</button>'
	)
	pane.firstChild.onclick = () => pane.remove()
}

// 6-я задача Карусель
/* этот код помечает картинки, для удобства разработки */
let i = 1
for (let li of carousel.querySelectorAll('li')) {
	li.style.position = 'relative'
	li.insertAdjacentHTML(
		'beforeend',
		`<span style="position:absolute;left:0;top:0">${i}</span>`
	)
	i++
}

/* конфигурация */
let width = 130
let count = 3

let list = carousel.querySelector('ul')
let listElems = carousel.querySelectorAll('li')

let position = 0

carousel.querySelector('.prev').onclick = function () {
	position += width * count
	position = Math.min(position, 0)
	list.style.marginLeft = position + 'px'
}

carousel.querySelector('.next').onclick = function () {
	position -= width * count
	position = Math.max(position, -width * (listElems.length - count))
	list.style.marginLeft = position + 'px'
}
