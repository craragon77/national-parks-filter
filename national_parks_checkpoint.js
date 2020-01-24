//developer.nps.gov/api/v1/parks

const apiKey = 'tg3iuJhu0fNZp8JDNiNbcSO6M8xOQPvVkRVYmqDU';
const searchURL = 'developer.nps.gov/api/v1/parks'


function fetchRequest(url){
    fetch(url)
    .then(response => {
        if (response.ok){
            (responseJson => console.warn(responseJson))
        }
    })
    .catch(error => alert("Unfortunately, something went wrong! Go play outside and try again later!"))
}

function creatingVariables(){
    let stateInitials = $(".state-code").val()
    let requestedNumber = $(".requested-number").val() === "" ? 10 : $(".requested-number").val()
    console.log(stateInitials)
    console.log(requestedNumber)
    iHopeThisWorks(stateInitials, requestedNumber)
}

function iHopeThisWorks(stateInitials, requestedNumber){
    const params = {
        key: apiKey,
        limit: requestedNumber,
        stateCode: stateInitials,
    }
    const queryString = formatQuery(params)
    const url = searchURL + '?' + queryString
    fetchRequest(url)
}

function formatQuery(params){
    const queryItems = Object.keys
        .map(keys => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function submitButton(){
    $(".button").click(function(event){
        event.preventDefault();
        creatingVariables()
    })
}
submitButton()