"use strict";

function createCSV(){

    let xhr = new XMLHttpRequest();
    let endpoint = 'https://api.thingspeak.com/channels/1040901/feeds.json'
    
    xhr.open('GET', endpoint);
    xhr.send();
    
    xhr.onload = () => {
        if(xhr.status == 200){
            
            let registryInfo = JSON.parse(xhr.response);
            let headers = "date,ID,PH,Salinidad,Temperatura,,";
            
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += headers + "\r\n";
    
            let feed = registryInfo.feeds

            console.log(feed);
    
            feed.forEach(function (rowArray){
                let rowResult = "";
                let row = "";

                for(let k in rowArray){
                    row += rowArray[k] + ",";
                }

                csvContent += row + "\r\n";
            
            });
        
            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `equipo5_registro.csv`);
            document.body.appendChild(link);
            link.click();
        }
    }

   
}