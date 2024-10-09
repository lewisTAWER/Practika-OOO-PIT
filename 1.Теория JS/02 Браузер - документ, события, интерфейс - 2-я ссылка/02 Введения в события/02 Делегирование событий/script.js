// 1-я задача Спрячьте сообщения с помощью делегирования
container.onclick = function (event) {
	if (event.target.className != 'remove-button') return

	let pane = event.target.closest('.pane')
	pane.remove()
}

// 2-я задача Создайте дерево, которое по клику на заголовок скрывает-показывает потомков:
for (let li of tree.querySelectorAll('li')) {
	let span = document.createElement('span')
	li.prepend(span)
	span.append(span.nextSibling)
}

tree.onclick = function (event) {
	if (event.target.tagName != 'SPAN') {
		return
	}

	let childrenContainer = event.target.parentNode.querySelector('ul')
	if (!childrenContainer) return

	childrenContainer.hidden = !childrenContainer.hidden
}

// 3-я задача Сортируемая таблица
grid.onclick = function (e) {
	if (e.target.tagName != 'TH') return

	let th = e.target
	// если ячейка TH, тогда сортировать
	// cellIndex - это номер ячейки th:
	//   0 для первого столбца
	//   1 для второго и т.д.
	sortGrid(th.cellIndex, th.dataset.type)
}

function sortGrid(colNum, type) {
	let tbody = grid.querySelector('tbody')

	let rowsArray = Array.from(tbody.rows)

	// compare(a, b) сравнивает две строки, нужен для сортировки
	let compare

	switch (type) {
		case 'number':
			compare = function (rowA, rowB) {
				return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML
			}
			break
		case 'string':
			compare = function (rowA, rowB) {
				return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
					? 1
					: -1
			}
			break
	}

	// сортировка
	rowsArray.sort(compare)

	tbody.append(...rowsArray)
}

// 4-я задача Напишите JS-код, реализующий поведение «подсказка».
let tooltipElem

document.onmouseover = function (event) {
	let target = event.target

	// если у нас есть подсказка...
	let tooltipHtml = target.dataset.tooltip
	if (!tooltipHtml) return

	// ...создадим элемент для подсказки

	tooltipElem = document.createElement('div')
	tooltipElem.className = 'tooltip'
	tooltipElem.innerHTML = tooltipHtml
	document.body.append(tooltipElem)

	// спозиционируем его сверху от аннотируемого элемента (top-center)
	let coords = target.getBoundingClientRect()

	let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2
	if (left < 0) left = 0 // не заезжать за левый край окна

	let top = coords.top - tooltipElem.offsetHeight - 5
	if (top < 0) {
		// если подсказка не помещается сверху, то отображать её снизу
		top = coords.top + target.offsetHeight + 5
	}

	tooltipElem.style.left = left + 'px'
	tooltipElem.style.top = top + 'px'
}

document.onmouseout = function (e) {
	if (tooltipElem) {
		tooltipElem.remove()
		tooltipElem = null
	}
}
