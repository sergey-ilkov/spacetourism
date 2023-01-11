$(function () {
    $('.slider__box').slick({
        prevArrow: `<button type="button" class="slick-prev"><img src="./images/arrow-left.svg" alt="arrow-left"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="./images/arrow-right.svg" alt="arrow-right"></button>`,
        speed: 1000,
        responsive: [
            {
                breakpoint: 481,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });

    // JavaScript

    // burger menu

    const burgerBtn = document.querySelector('.menu-btn');
    const menuList = document.querySelector('.menu__list');
    const body = document.querySelector('body');

    burgerBtn.addEventListener('click', () => {
        clickBurgerMenu();
    });

    menuList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.hasAttribute('href')) {
            clickBurgerMenu();
            const id = e.target.getAttribute('href').substr(1);
            element = document.getElementById(id);
            if (element) {
                scrollTo(element);
            }
        }
    });
    const clickBody = (e) => {
        if (!e.target.closest('.header__top')) {
            clickBurgerMenu();
        }
    };

    function clickBurgerMenu() {
        const elBurger = burgerBtn.classList;
        const elMenu = menuList.classList;
        const elBody = body.classList;

        elBurger.contains('active') ? elBurger.remove('active') : elBurger.add('active');
        elMenu.contains('active') ? elMenu.remove('active') : elMenu.add('active');
        elBody.contains('fixed-page') ? elBody.remove('fixed-page') : elBody.add('fixed-page');
        elBody.contains('fixed-page') ? body.addEventListener('click', clickBody) : body.removeEventListener('click', clickBody);
    }

    // scroll

    function scrollTo(element) {
        window.scroll({
            left: 0,
            top: element.offsetTop,
            behavior: 'smooth',
        });
    }

    const Btn = document.querySelectorAll('.button');
    const haederBtn = document.querySelector('.header__btn');
    const clientsBtn = [...Btn, haederBtn];
    const contacts = document.querySelector('.contacts');

    for (let i = 0; i < clientsBtn.length; i++) {
        if (clientsBtn[i]) {
            clientsBtn[i].addEventListener('click', (e) => {
                e.preventDefault();
                if (contacts) {
                    scrollTo(contacts);
                }
            });
        }
    }

    /* ANIMATION */

    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
});
