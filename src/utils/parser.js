import constants from '../../common/config';

const imagePath = path => {
    const url = `${constants.apiAdress}${path}`;
    return url;
};

const formatDate = value => {
    const date = new Date(value);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = date.getDate();
    let hours = date.getHours();
    hours = hours > 9 ? hours : `0${hours}`;
    const minutes = date.getMinutes();
    return `${year}.${month}.${day}`;
};

const pageinate = (collection, page = 1, numItems = 10) => {
    if (!Array.isArray(collection)) {
        throw `Expect array and got ${typeof collection}`;
    }
    const currentPage = parseInt(page);
    const perPage = parseInt(numItems);
    const offset = (page - 1) * perPage;
    const paginatedItems = collection.slice(offset, offset + perPage);

    return {
        currentPage,
        perPage,
        total: collection.length,
        totalPages: Math.ceil(collection.length / perPage),
        data: paginatedItems,
    };
};
export { imagePath, formatDate, pageinate };
