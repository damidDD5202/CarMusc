export const getUsers = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении пользователей');
    }
    return response.json();
};

export const updatePassword = async (userId, newPassword) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
        redirect: 'manual'
    });

    if (!response.ok) {
        throw new Error('Ошибка при обновлении пароля');
    }

    return response.json();
};

export const addUser = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error('Ошибка при добавлении пользователя');

    const createdUser = await response.json();

    try{
        await addCartDefault(user.id);
    }catch(error){
        await deleteUser(user.id);
    }

    return createdUser;
};

export const deleteUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error('Ошибка при удалении пользователя');
    else throw new Error('Пользователь создан, но корзину создать не удалось. Пользователь удален.');
};



//--- cart ----



export const addCartDefault = async (userId) => {
    const response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: userId, ordered: [], completed: []}),
    });
    if (!response.ok) {
        throw new Error('Ошибка при добавлении корзины для пользователя');
    }
    return response.json();
};

export const getCartUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/carts/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении корзины для пользователя');
    }
    return response.json();
};

export const getCartUserFilter = async (userId, type) => {
    let services;

    try{    
        const userCart = await getCartUser(userId);

        services = userCart[type];
    }catch(error){
        console.log(error);
    }
   
   return services;
};


export const addCartService = async (userId, type, service) => {
    const cart = await getCartUser(userId);

    cart[type].push(service); // Добавляем новый сервис в массив ordered

    const updateResponse = await fetch(`http://localhost:3000/carts/${userId}`, { // Отправляем обновлённую корзину обратно на сервер
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    });

    if (!updateResponse.ok) {
        throw new Error('Ошибка при обновлении корзины для пользователя');
    }

    return updateResponse.json();
};


// ---- service ----

export const getServices = async () => {
    const response = await fetch(`http://localhost:3000/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении услуг');
    }
    return response.json();
};

export const updateServicePrice = async (serviceId, newPrice) => {
    const services = await getServices();

    for (const key in services) {
        for(let i = 0; i < services[key].length; i++){
            if(services[key][i].id == serviceId){
                services[key][i].price = newPrice;
                break;
            }
        }
    }

    const response = await fetch(`http://localhost:3000/services`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(services),
    });
    console.log(serviceId);
    if (!response.ok) {
        throw new Error('Ошибка при обновлении цены услуги');
    }

    return response.json();
};