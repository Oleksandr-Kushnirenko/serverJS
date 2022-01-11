window.addEventListener("DOMContentLoaded", () => {

    function req() {  // функция которая посылает запрос на сервер
        const request = new XMLHttpRequest();      //инструмент, new XMLHttpRequest() - это конструктор нового обьекта
        request.open("GET", "http://localhost:3000/people");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");
        request.send();  // отправляем запрос

        request.addEventListener('load', function() {    // отслеживаем определенные стадии запроса
            if (request.status == 200) {
                let data = JSON.parse(request.response); // json-формат превращаем в обычный обьект или масив (роспарсить)
                console.log(data);


                data.forEach(item => {
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
                            <img src=${icon}" alt="male">
                        </div>
                        <div class="age>${item.age}</div>
                    `;
                    document.querySelector('.app').appendChild(card);
                });

            } else {
                console.error("Что-то пошло не так");
            }
        });
        this.remove(); // то на чем произошло событие исчезнит со страницы, в этом примере кномка
    }
    document.querySelector("button").addEventListener("click", req, {"once": true});

});