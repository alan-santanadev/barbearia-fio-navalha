/* =========================================================
   MENU MOBILE
========================================================= */

const menu = document.getElementById("menu");
const menuMobile = document.getElementById("menuMobile");

if (menu && menuMobile) {

    function fecharMenu() {
        menu.classList.remove("aberto");
        menuMobile.setAttribute("aria-expanded", "false");
    }

    menuMobile.addEventListener("click", () => {

        const menuAberto = menu.classList.toggle("aberto");

        menuMobile.setAttribute("aria-expanded", menuAberto);

    });

    const linksMenu = menu.querySelectorAll("a");

    linksMenu.forEach(link => {
        link.addEventListener("click", fecharMenu);
    });

    window.addEventListener("scroll", fecharMenu);

}


/* =========================================================
   PORTFÓLIO — CARROSSEL
========================================================= */

const galeriaTrilho = document.querySelector(".galeria-trilho");
const galeriaFotos = document.querySelectorAll(
    ".galeria-trilho .foto-portfolio"
);

const galeriaAnterior = document.querySelector(".galeria-anterior");
const galeriaProxima = document.querySelector(".galeria-proxima");

if (
    galeriaTrilho &&
    galeriaFotos.length > 0 &&
    galeriaAnterior &&
    galeriaProxima
) {

    let indiceGaleria = 0;

    function fotosVisiveis() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;

    }


    function atualizarGaleria() {

        const limite = Math.max(
            0,
            galeriaFotos.length - fotosVisiveis()
        );

        indiceGaleria = Math.max(
            0,
            Math.min(indiceGaleria, limite)
        );

        const larguraFoto =
            galeriaFotos[0].getBoundingClientRect().width;

        const estiloTrilho =
            window.getComputedStyle(galeriaTrilho);

        const espacamento =
            parseFloat(estiloTrilho.gap) || 0;

        galeriaTrilho.style.transform =
            `translateX(-${indiceGaleria * (larguraFoto + espacamento)}px)`;

        galeriaAnterior.disabled = indiceGaleria === 0;
        galeriaProxima.disabled = indiceGaleria === limite;

        galeriaAnterior.style.opacity =
            indiceGaleria === 0 ? "0.4" : "1";

        galeriaProxima.style.opacity =
            indiceGaleria === limite ? "0.4" : "1";

    }


    galeriaAnterior.addEventListener("click", () => {

        indiceGaleria--;

        atualizarGaleria();

    });


    galeriaProxima.addEventListener("click", () => {

        indiceGaleria++;

        atualizarGaleria();

    });


    window.addEventListener("resize", atualizarGaleria);

    atualizarGaleria();

}