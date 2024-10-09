// 1-я задача Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
let elem = document.getElementById('elem')

function clear(elem) {
	for (let i = 0; i < elem.childNodes.length; i++) {
		elem.childNodes[i].remove()
	}
}
clear(elem)

// 2-я задача Создайте список
let ol = document.getElementById('ol')

while (true) {
	let zadacha = prompt('введите задачу:', '')

	if (!zadacha) {
		break
	}

	let li = document.createElement('li')
	li.textContent = zadacha
	ol.append(li)
}

// 3-я задача Напишите функцию createTree, которая создаёт вложенный список ul/li из объекта.
let data = {
	Рыбы: {
		форель: {},
		лосось: {},
	},

	Деревья: {
		Огромные: {
			секвойя: {},
			дуб: {},
		},
		Цветковые: {
			яблоня: {},
			магнолия: {},
		},
	},
}

function createTree(container, obj) {
	container.innerHTML = createTreeText(obj)
}

function createTreeText(obj) {
	let li = ''
	let ul

	for (let key in obj) {
		li += '<li>' + key + createTreeText(obj[key]) + '</li>'
	}

	if (li) {
		ul = '<ul>' + li + '</ul>'
	}

	return ul || ''
}

createTree(container, data)

// 4-я задача Выведите список потомков в дереве
let lis = document.getElementsByTagName('lis')

for (let li of lis) {
	let descendantsCount = li.getElementsByTagName('li').length
	if (!descendantsCount) continue

	li.firstChild.data += ' [' + descendantsCount + ']'
}

// 5-я задача Создайте календарь в виде таблицы
function createCalendar(elem, year, month) {
	let mon = month - 1
	let d = new Date(year, mon)

	let table =
		'<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>'

	for (let i = 0; i < getDay(d); i++) {
		table += '<td></td>'
	}

	while (d.getMonth() == mon) {
		table += '<td>' + d.getDate() + '</td>'

		if (getDay(d) % 7 == 6) {
			table += '</tr><tr>'
		}

		d.setDate(d.getDate() + 1)
	}

	if (getDay(d) != 0) {
		for (let i = getDay(d); i < 7; i++) {
			table += '<td></td>'
		}
	}

	table += '</tr></table>'

	elem.innerHTML = table
}

function getDay(date) {
	let day = date.getDay()
	if (day == 0) day = 7
	return day - 1
}

createCalendar(calendar, 2012, 9)

// 6-я задача Цветные часы с использованием setInterval
let timerId

function update() {
	let clock = document.getElementById('clock')
	let date = new Date()

	let hours = date.getHours()
	if (hours < 10) hours = '0' + hours
	clock.children[0].innerHTML = hours

	let minutes = date.getMinutes()
	if (minutes < 10) minutes = '0' + minutes
	clock.children[1].innerHTML = minutes

	let seconds = date.getSeconds()
	if (seconds < 10) seconds = '0' + seconds
	clock.children[2].innerHTML = seconds
}

function clockStart() {
	if (!timerId) {
		timerId = setInterval(update, 1000)
	}
	update()
}

function clockStop() {
	clearInterval(timerId)
	timerId = null
}
