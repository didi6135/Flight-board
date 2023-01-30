const tracksTable = document.getElementById('tracksTable')
const waitLanding = document.getElementById('waitLanding')
const waitDeparture = document.getElementById('waitDeparture')

const flightsArray = []
const tracksArray = []

const landingPlane = []
const departurePlane = []

const createNewTrack = ( flightNumber, isAvilable, time,where, status) => {

    return {
        
        flightNumber,
        isAvilable,
        time,
        where,
        status
    }
}


const planeDetails = (numberFlight, numberPepole, timeDeparture, timeLanding, where, onAir) => {
    return {
        numberFlight,
        numberPepole,
        timeDeparture,
        timeLanding,
        where,
        onAir
    }
} 

// מוסיף בתחילת הרצה 20 מטוסים
const addNewPlane = () => {

    for(let i =0; i < 20; i++) {
        const numberFlight = Math.floor(Math.random()*16777215 ).toString(16).toUpperCase()
        const numberPepole = Math.floor(Math.random() * 400 + 50)
        const timeDeparture = Math.floor(Math.random() * 40 + 20)
        const timeLanding = Math.floor(Math.random() * 40 + 20)
        const where = Math.floor(Math.random() * countryList.length)
        const onAir = (Math.floor(Math.random() * 10 )%2 === 0) ? "Departure" : "Landing"
        

        const newPlane = planeDetails(
            numberFlight, 
            numberPepole, 
            timeDeparture, 
            timeLanding,
            countryList[where],
            onAir
            )
        flightsArray.push(newPlane)
    
    }

}


// רשימת ארצות בעולם
const countryList = [
"Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad Tobago","Tunisia","Turkey","Turkmenistan","Turks Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","USA","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
];


// מוסיף מטוסים למסלולים
const initTracksArray = () => {
   
    flightsArray.forEach((item, num) => {


    if(tracksArray.length <= 10) {
  

            if(item.onAir === "Departure") {
                const flightNum = item.numberFlight
                const departure = item.timeDeparture
                const where = item.where
                const status = item.onAir
                const statusObj = createNewTrack( 
                    flightNum, 
                    false,
                    departure,
                    where,
                    status, 
                    "Departure" )

                tracksArray.push(statusObj)
                departurePlane.push(statusObj)
                flightsArray.splice(num, 1)
                
            } else {
                
                const flightNum = item.numberFlight
                const landing = item.timeLanding
                const where = item.where
                const status = item.onAir
                
                const statusObj = createNewTrack( 
                    flightNum, 
                    false, 
                    landing, 
                    where, 
                    status, 
                    "Departure" )

                tracksArray.push(statusObj)
                landingPlane.push(statusObj)
                flightsArray.splice(num, 1)
                
            }
           
        }
        },
        console.log(flightsArray),
        console.log(landingPlane),
        console.log(departurePlane)
)}



// מייצר טבלה 
const tracksData = () => {
    let tracksDataStr = ''
    for (const item of tracksArray) {
        
        
        item.time --

        tracksDataStr += `<tr>
        <td id="flightNumber">${item.flightNumber} </td>
        <td id="isAvilable">${item.isAvilable} </td>
        <td id="time">00:${item.time} </td>
        <td id="where">${ item.where} </td>
        <td id="status">${item.status} </td>
        </tr>`
    }
    return tracksDataStr

}


// מייצר את ראש הטבלה
const drawTracks = (tracksData) => {

    tracksTable.innerHTML = `
    
    <table id="tableMenu">
        <thead id="theadTable">

        <th id="thStyle">flight Number</th>
        <th id="thStyle">isAvilable</th>
        <th id="thStyle">Time to Landing / Departure</th>
        <th id="thStyle">From / To</th>
        <th id="thStyle">Status</th>
        </thead>

        <tbody id="tbodyTable">
            ${tracksData}
        </tbody>
    </table>

    `
}
 

// מדפיס בהתחלה את ה10 מטוסים הראשונים
const initiateWebsite = () => {
    addNewPlane();
    initTracksArray();

}
initiateWebsite();



// טיימר להורדת המטוסים שכבר נחתו או המריאו
const testtest = () => {
    const tracksTableDeparture = tracksData();
    drawTracks(tracksTableDeparture);
}


let counterDown = setInterval(function () {
    wait()
    testtest()
    tracksArray.forEach((item, num) => {
        if(item.time <= 0) {
            if(item.status === "Departure") {
                departurePlane.splice(num, 1)
                initTracksArray()
                tracksArray.splice(num, 1)
                addOneNewPlane()
                tracksTable.innerHTML = ''
                testtest()
                wait()
            } else if (item.status === "Landing"){
                departurePlane.splice(num, 1)
                initTracksArray()
                tracksArray.splice(num, 1)
                addOneNewPlane()
                tracksTable.innerHTML = ''
                testtest()
                wait()
            }

        }
        
    }

)}, 1000)


// מוסיף מטוס אחד כאשר מטוס אחד מוסר מהרשימה
const addOneNewPlane = () => {

        const numberFlight = Math.floor(Math.random()*16777215 ).toString(16).toUpperCase()
        const numberPepole = Math.floor(Math.random() * 400 + 50)
        const timeDeparture = Math.floor(Math.random() * 40 + 20)
        const timeLanding = Math.floor(Math.random() * 40 + 20)
        const where = Math.floor(Math.random() * countryList.length)
        const onAir = (Math.floor(Math.random() * 10 )%2 === 0) ? "Departure" : "Landing"
         
        const newPlane = planeDetails(
            numberFlight, 
            numberPepole, 
            timeDeparture, 
            timeLanding,
            countryList[where],
            onAir
            )
        flightsArray.push(newPlane)
    console.log(flightsArray)
    
}


const wait = () => {
    waitDeparture.innerHTML = `plane wait to Departure: ${departurePlane.length}`
    waitLanding.innerHTML = `plane wait to Landing: ${landingPlane.length}`
}

