//developer.nps.gov/api/v1/parks

const apiKey = 'tg3iuJhu0fNZp8JDNiNbcSO6M8xOQPvVkRVYmqDU';
const searchURL = 'https://developer.nps.gov/api/v1/parks'


function fetchRequest(url){
    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json()
        }
    })
    .then(responseJson => renderTheParks(responseJson))
    //.then(responseJson => renderInConsole(responseJson))
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
        limit: requestedNumber,
        stateCode: stateInitials,
        api_key: apiKey
    }
    const queryString = formatQuery(params)
    const url = searchURL + '?' + queryString
    fetchRequest(url)
}

function formatQuery(params){
    const queryItems = Object.keys(params)
        .map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function submitButton(){
    $(".button").click(function(event){
        event.preventDefault();
        $(".hidden").removeClass("hidden")
        $(".parks").empty()
        creatingVariables()
    })
}

function testingNull(res){
    if (res == []){
        return null
    }
    else{
        return res
    }
}

function renderTheParks(responseJson){
    console.warn(responseJson)
    
    for (let i = 0; i < responseJson.data.length; i++){
        if(!responseJson.data[i].imaged[0].url){
            return null
        }
            $(".parks").append(
            `<div>
                [<p>states: '${responseJson.data[i].states}'</p>
                <p>image: '${responseJson.data[i].images[0].url}'</p>
                <p>fullName: '${responseJson.data[i].fullName}'</p>
                <p>parkCode: '${responseJson.data[i].parkCode}'</p>],
            </div>`
        )
    }
}

function filterTheParks(responseJson){
    console.warn(responseJson)
    let parsedResponse = JSON.parse(responseJson)
    console.log(parsedResponse)
    //responseJson.filter(park => {
        //console.log(park.data.fullName)
        //park.image[0] || null,
        //park.parkCode,
        //park.fullName
    }


function renderInConsole(responseJson){
    for(let i = 0; i < responseJson.data.length; i++){
        console.log(responseJson.data[i].states,
            responseJson.data[i].url,
            responseJson.data[i].image[0],
            responseJson.data[i].fullName,
            responseJson.data[i].id,
            responseJson.data[i].parkCode)
    }
}
submitButton()