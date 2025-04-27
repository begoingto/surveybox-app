import defaultThumb from '../../public/default-thumb.png'
import avatar from '../../public/images/avatar.jpg'
export const thumbnailDefault = defaultThumb
export const avatarDefault = avatar
export const FILE_SIZE = 1024; // 1MB
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const currentDay = () => new Date().setHours(0, 0, 0, 0);
export const addDays = (date,days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const getFullName = (user) => {
    return [user.firstName,user.lastName].join(" ").trim();
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const CATEGORYFILTERCREATEBY = {
    all: 'ALL',
    myself: 'YOUR_SELF',
    admin: 'ADMIN'
}

export const DISPLAY = {
    grid: 'GRID',
    list: 'LIST'
}

export const flatten=(obj)=>Object.values(obj).flat(1)