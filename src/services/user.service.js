import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import axios from 'axios';

const SCORE_FOR_REVIEW = 10;

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore,
    uploadImg,
};

window.userService = userService;
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

function getUsers() {
    return storageService.query('user');
    // return httpService.get(`user`)
}

function getById(userId) {
    return storageService.get('user', userId);
    // return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return storageService.remove('user', userId);
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user);
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser();
    user.score = user.score + by || by;
    await update(user);
    return user.score;
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)
    const user = await httpService.post('auth/login', userCred);
    if (user) return _saveLocalUser(user);
}
async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred);
    return _saveLocalUser(user);
}
async function logout() {
    sessionStorage.clear();
    return await httpService.post('auth/logout');
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    console.log('logged in as', JSON.parse(sessionStorage.getItem('loggedinUser') || 'null'));
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null');
}

async function uploadImg(ev) {
    // Defining our variables
    const CLOUD_NAME = 'rachelmistertoy'; // Insert yours
    const UPLOAD_PRESET = 'oa9nnanl'; // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0]);
    FORM_DATA.append('upload_preset', UPLOAD_PRESET);

    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA);
        return res.data;
    } catch (err) {
        console.error('ERROR!', err);
    }
}
