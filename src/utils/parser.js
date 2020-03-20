import constants from '../../common/config';

const imagePath = path => {
    const url = `${constants.apiAdress}${path}`;
    return url;
};

export { imagePath };
