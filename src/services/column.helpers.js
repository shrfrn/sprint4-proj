import { utilService } from './util.service.js'
export const columnHelpers = {

    delegates: {
        txt: _delegateTxt,
        matches: _delegateMatches,
        init: _initDelegates,
    },
    date: {
        txt: _dateTxt,
        matches: _dateMatches,
        init: _initDate,
    },
    status:{
        txt: _statusTxt,
        matches: _statusMatches,
        init: _initStatus,
    },
    tags:{
        txt: _tagsTxt,
        matches: _tagsMatches,
        init: _initTags,
    },

    // This function returns the component name for the column type.
    // Used in task-preview.vue to load the correct dynamic components.

    componentType(column){
        switch(column){
            case 'delegates': return 'person-column'
            case 'status': return 'status-column'
            case 'date': return 'date-column'
            case 'tags': return 'tags-column'
            default: console.log('bad column type - ', column)
        }
    },
}
function _delegateTxt(columnData){
    const names = columnData.map(person => person.fullname)
    return names.join(' ')
}
function _delegateMatches(columnData, dataToMatch){
    return columnData.some(person => person._id === dataToMatch._id)
}
function _initDelegates(){
    return []
}
function _dateTxt(columnData){
    return utilService.msToShortDate(columnData)
}
function _dateMatches(columnData, dataToMatch){
    return columnData === dataToMatch
}
function _initDate(){
    return 0
}
function _statusTxt(columnData){
    return columnData.txt
}
function _statusMatches(columnData, dataToMatch){
    return columnData.txt === dataToMatch.txt
}
function _initStatus(){
    return { id: 's000', txt: '', color: '#c4c4c4' }
}
function _tagsTxt(columnData){
    const tags = columnData.map(tag => tag)
    return tags.join(' ')
}
function _tagsMatches(columnData, dataToMatch){
    return columnData.some(tag => tag === dataToMatch)
}
function _initTags(){
    return []
}
