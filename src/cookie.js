/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

reloadTable();

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    reloadTable();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;

    reloadTable();
});

function getCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function reloadTable() {
    const cookies = getFilteredCookies();

    clearTable();

    for (const cookie in cookies) {
        if (cookies.hasOwnProperty(cookie)) {
            const tr = document.createElement('tr'),
                tdName = document.createElement('td'),
                tdValue = document.createElement('td'),
                tdDel = document.createElement('td'),
                delBtn = document.createElement('button');

            tdName.classList.add('coockie-name');
            tdValue.classList.add('coockie-value');
            tdDel.classList.add('coockie-del');

            delBtn.innerHTML = 'Удалить';
            tdName.innerHTML = cookie;
            tdValue.innerHTML = cookies[cookie] || '';

            tdDel.appendChild(delBtn);
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdDel);
            listTable.appendChild(tr);

            delBtn.addEventListener('click', (e) => {
                deleteCookie(cookie);
                e.target.parentNode.parentNode.remove();
            });            
        }
    }
}

function clearTable() {
    while (listTable.rows.length>0) {
        listTable.deleteRow(0);
    }
}

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function getFilteredCookies() {
    const cookies = getCookies();
    const filtered = {};
    const filterValue = filterNameInput.value;

    for (let cookie in cookies) {
        if (filterValue.length == 0) {
            filtered[cookie] = cookies[cookie];
        } else if (isMatching(cookie, filterValue) || isMatching(cookies[cookie], filterValue)) {
            filtered[cookie] = cookies[cookie];
        }
    }

    return filtered;
}
