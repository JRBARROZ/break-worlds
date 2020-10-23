(function () {

    var largura;
    var altura;
    var larguraMenu = 400;
    var alturaMenu = 300;

    var menu = document.getElementById("#menu" + i);
    //var ctx = menu.getContext("2d");


    function atualizarPlanoDeFundo() {
        largura = window.innerWidth;
        altura = window.innerHeight;
        menu.setAttribute("width", largura);
        menu.setAttribute("height", altura);
        
        var img = new Image();
        img.src = "bg.jpg";
        ctx.drawImage(img, 0, 0);
    }

    function desenharBaseMenu() {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        var x = parseInt((largura / 2) - (larguraMenu / 2));
        var y = parseInt((altura / 2) - (alturaMenu / 2));
        ctx.fillRect(x, y, larguraMenu, alturaMenu);
    }

    function desenharItensMenu() {
        var x = parseInt((largura / 2) - (larguraMenu / 2));
        var y = parseInt((altura / 2) - (alturaMenu / 2));
        var img;

        img = new Image();
        img.src = "iniciar_1.png";
        ctx.drawImage(img, x, y);

        img = new Image();
        img.src = "opcoes_1.png";
        ctx.drawImage(img, x, y + 100);

        img = new Image();
        img.src = "sair_1.png";
        ctx.drawImage(img, x, y + 200);
    }

    function desenharMenu() {
        atualizarPlanoDeFundo();
        desenharBaseMenu();
        desenharItensMenu();
    }

    function selecionarItem(indice) {
        desenharMenu();
        var x = parseInt((largura / 2) - (larguraMenu / 2));
        var y = parseInt((altura / 2) - (alturaMenu / 2));
        var img;
        img = new Image();
        switch (indice) {
            case 0:
                img.src = "iniciar_2.png";
                ctx.drawImage(img, x, y);
                break;
            case 1:
                img.src = "opcoes_2.png";
                ctx.drawImage(img, x, y + 100);
                break;
            case 2:
                img.src = "sair_2.png";
                ctx.drawImage(img, x, y + 200);
                break;
        }
    }

    window.onresize = function () {
        desenharMenu();
    }

    window.onmousemove = function () {
        var posX = event.clientX;
        var posY = event.clientY;
        var x = parseInt((largura / 2) - (larguraMenu / 2));
        var y = parseInt((altura / 2) - (alturaMenu / 2));
        var indice = -1;

        if (posX > x && posX < x + larguraMenu) {
            if (posY > y && posY < y + alturaMenu) {
                indice = parseInt((posY - y) / 100);
            }
        }

        selecionarItem(indice);
    }

}());