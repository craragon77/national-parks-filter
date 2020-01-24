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
        $(".hidden").removeClass(".hidden")
        $(".parks").empty()
        creatingVariables()
    })
}

function renderTheParks(responseJson){
    console.warn(responseJson)
    for (let i = 0; i < responseJson.length; i++){
        $(".parks").append(
            `<li>
                <div>
                    <h4>${responseJson.data[i].fullName}</h4><br
                    <p>${responseJson.data[i].description}</p><br>
                    <p><span><a href="${response.data[i].url}">Learn More at the website!</a></span></p>
                </div>
            </li>`
        )
    }
}
submitButton()