export const utilService = {
    makeId,
    getRandomInt,
    displayedTimestamp,
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function displayedTimestamp(ts) {
    const tsDate = new Date(ts)
    const now = new Date()

    const yyyy = tsDate.getFullYear()
    const mm = tsDate.getMonth()
    const dd = tsDate.getDate()
    
    if(now.getFullYear() === yyyy && now.getMonth() === mm && now.getDate() === dd){
        const hours = ('0' + tsDate.getHours()).substr(-2, 2)
        const mins = ('0' + tsDate.getMinutes()).substr(-2, 2)
        return `${hours} : ${mins}`
    }
    
    return `${dd + 1} - ${mm + 1} - ${yyyy}`
}
