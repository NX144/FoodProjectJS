const postData = async (url, data) => {
    let result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await result.json(); // Возвращаем Promise чтобы использовать цепочку then
};
const getResource = async (url) => {
    let result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        // Если запрос не окей, то выкидываем на страницу ошибку
    }

    return await result.json(); // Возвращаем Promise чтобы использовать цепочку then
};

export {postData, getResource};