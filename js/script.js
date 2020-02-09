document.addEventListener('DOMContentLoaded', () => {

    const search = document.querySelector('.search'),
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        category = document.querySelector('.category');

           

        //Создание каточек товаров
        const createCardGoods = (id, title, price, img) => {
            const card = document.createElement('div');
            card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
            card.innerHTML = `
            <div class="card">
            <div class="card-img-wrapper">
                <img class="card-img-top" src="${img}" alt="">
                <button class="card-add-wishlist" data-goods-id="${id}"></button>
            </div>
            <div class="card-body justify-content-between">
                <a href="#" class="card-title">${title}</a>
                <div class="card-price">${price} ₽</div>
                <div>
                    <button class="card-add-cart data-goods-id="${id}">Добавить в корзину</button>
                </div>
            </div>
        </div>
            `;

            return card;
        }

        // //карточки товаров
        // goodsWrapper.append(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg'));
        // goodsWrapper.append(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg'));
        // goodsWrapper.append(createCardGoods(3, 'Носки', 333,'img/temp/Socks.jpg' ));

        //вывод товаров витрины
        const renderCard = (items) => {
            items.forEach( (item) => {
                const { id, title, price, imgMin } = item;
                //добавляем карточку товара
                goodsWrapper.append(createCardGoods(id, title, price, imgMin));             
            } );
        };

        //получение товаров из API
        const getGoods = (handler, filter) => {
            fetch('db/db.json')
                .then((response) => {
                    return response.json();
                })
                .then(filter)
                .then(handler);
        };

        //закрытие карзины Окно Крестик ESC
        const closeCart = (event) => {
            const target = event.target;
            if(target === cart || target.classList.contains('cart-close') || event.keyCode === 27) {
                cart.style.display = 'none';
            }

        };

        //открытие карзины
        const openCart = (event) => {
            event.preventDefault();
            cart.style.display = 'flex';
        };

        //рандом на товары витрины
        const randomSort = (item) => {
            return item.sort( () => Math.random() - 0.5 );
        };

        //выбор категории
        const choiceCategory = (event) => {
            event.preventDefault();
            const target = event.target;

            if( target.classList.contains('category-item') ){
                const category = target.dataset.category;
                getGoods(renderCard,  items => items.filter( (item => item.category.includes(category)))
            }
                
            

        }
                
        

        //обработчик  открытие карзины
        cartBtn.addEventListener('click', openCart );

        //обработчик закрытие карзины
        cart.addEventListener('click', closeCart);

        //обработчик закрытие карзины ESC
        document.addEventListener('keyup', closeCart);

        //обработчик выбор категории
        category.addEventListener('click', choiceCategory);

        //вызов вывод товаров витрины
        getGoods(renderCard, randomSort);

});