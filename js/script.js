window.addEventListener("DOMContentLoaded", () => {

    function req() {  // функция которая посылает запрос на сервер
        /* 
        const request = new XMLHttpRequest();      //инструмент, new XMLHttpRequest() - это конструктор нового обьекта
        request.open("GET", "http://localhost:3000/people");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.send();  // отправляем запрос

        request.addEventListener('load', function() {    // отслеживаем определенные стадии запроса
            if (request.status == 200) {
                let data = JSON.parse(request.response); // json-формат превращаем в обычный обьект или масив (роспарсить)
                console.log(data);
                createCards(data);

            } else {
                console.error("Что-то пошло не так");
            }
        }); */

        getResource("http://localhost:3000/people") // идет get запрос по указанному адресу; возвращается промис
            .then(data => createCards(data.data))
            .catch(err => console.error(err));


        this.remove(); // то на чем произошло событие исчезнит со страницы, в этом примере кномка
    }
    document.querySelector("button").addEventListener("click", req, {"once": true});

    /* async function getResource(url) { // вспомогательная функция, для того что б не вызывать постоянно fetch
        const res = await fetch(`${url}`);   // операция fetch как и любая другая операция с сервером есть асинхронной

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    } */

    async function getResource(url) { // вспомогательная функция, для того что б не вызывать постоянно fetch
        const res = await axios(`${url}`);   // операция fetch как и любая другая операция с сервером есть асинхронной

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res;
    }

    function createCards(response) {
        response.forEach(item => {
            let card = document.createElement("div");

            card.classList.add("card");

            let icon;
            if (item.sex === "male") {
                icon = "/icons/mars.png";
            } else {
                icon = "/icons/female.png";
            }

            card.innerHTML = `
                <img src="${item.photo}" alt="photo">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src="${icon}" alt="male">
                </div>
                <div class="age>${item.age}</div>
            `;
            document.querySelector('.app').appendChild(card);
        });
    }

});