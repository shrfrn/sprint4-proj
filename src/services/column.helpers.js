import { utilService } from './util.service.js'
export const columnHelpers = {

    delegates: {
        init: _initDelegates,
        txt: _delegateTxt,
        matches: _delegateMatches,
        compare: _delegateCompare
    },
    date: {
        init: _initDate,
        txt: _dateTxt,
        matches: _dateMatches,
        compare: _dateCompare
    },
    status:{
        init: _initStatus,
        txt: _statusTxt,
        matches: _statusMatches,
        compare: _statusCompare
    },
    tags:{
        init: _initTags,
        txt: _tagsTxt,
        matches: _tagsMatches,
        compare: _tagsCompare
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
    componentSummeryType(column){
        switch(column){
            case 'delegates': return 'person-summery-column'
            case 'status': return 'status-summery-column'
            case 'date': return 'date-summery-column'
            case 'tags': return 'tags-summery-column'
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
function _delegateCompare(delegates1, delegates2){
    if(delegates1.length !== delegates2.length)   return delegates1.length - delegates2.length
    const d1 = JSON.parse(JSON.stringify(delegates1)).sort()
    const d2 = JSON.parse(JSON.stringify(delegates2)).sort()
    return d1[0].fullname - d2[0].fullname
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
function _dateCompare(date1, date2){
    return date1 - date2
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
function _statusCompare(status1, status2){
    return status1 - status2
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
function _tagsCompare(tags1, tags2){
    if(tags1.length !== tags2.length)   return tags1.length - tags2.length
    const t1 = JSON.parse(JSON.stringify(tags1)).sort()
    const t2 = JSON.parse(JSON.stringify(tags2)).sort()
    return t1[0] - t2[0]
}
