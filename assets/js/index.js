let qtdStickers = document.getElementById("qtd-stickers");
let add = document.getElementById("add");
let sub = document.getElementById("sub");
let buttonSubmit = document.getElementById("buttonSubmit");

add.onclick = function () {
    qtdStickers.value = parseInt(qtdStickers.value) + 1;
    sub.classList.remove("disable");
};

sub.onclick = function () {
    if (qtdStickers.value == null || parseInt(qtdStickers.value) < 1) {
        sub.classList.add("disable");
    } else if (qtdStickers.value == 1) {
        sub.classList.add("disable");
        qtdStickers.value = parseInt(qtdStickers.value) - 1;
    } else {
        qtdStickers.value = parseInt(qtdStickers.value) - 1;
    }
};

buttonSubmit.onclick = function () {
    event.preventDefault();

    let chkReact = document.getElementById("chk-react");
    let chkVue = document.getElementById("chk-vue");
    let chkAngular = document.getElementById("chk-angular");
    let observacoes = document.getElementById("observacoes").value;
    let label = document.getElementsByTagName("label");
    let chk = document.getElementsByTagName("input");
    let form = document.getElementById("form");
    let boxFooter = document.getElementById("box-footer");
    let success = document.createElement("span");
    let successTxt = document.createTextNode("Formulário enviado com sucesso!");


    let data = {
        stickers: [],
        quantidade: qtdStickers.value,
        observacoes: observacoes
    };

    if (chkReact.checked == false && chkVue.checked == false && chkAngular.checked == false) {

        for (let i = 0; i < 3; i++) {
            label[i].classList.add("error");
        }
        return false;

    } else {
        for (let i = 0; i < 3; i++) {
            label[i].classList.remove("error");
        }
        for (let i = 0; i < chk.length; i++) {
            if (chk[i].checked == true) {
                data.stickers.push(chk[i].name);
            }
        }
    }

    if (qtdStickers.value <= 0 || qtdStickers.value == null) {
        qtdStickers.classList.add("error");
        return false;
    } else {
        qtdStickers.classList.remove("error");
    }

    fetch('https://httpbin.org/post', {
        method: 'post',
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function () {

        form.reset();
        success.appendChild(successTxt);
        boxFooter.insertBefore(success, buttonSubmit);
        boxFooter.style.justifyContent = "space-between";
        sub.classList.add("disable");

        setTimeout(function () {
            boxFooter.removeChild(boxFooter.childNodes[1]);
            boxFooter.style.justifyContent = "flex-end";
        }, 3000);
    })

}