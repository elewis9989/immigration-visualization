/* D3 */
var data;
var thisYear;
var males1990 = getImmByGender(1990, 'Male');
var males1995 = getImmByGender(1995, 'Male');
var males2000 = getImmByGender(2000, 'Male');
var males2005 = getImmByGender(2005, 'Male');
var males2010 = getImmByGender(2010, 'Male');
var males2015 = getImmByGender(2015, 'Male');
var males2017 = getImmByGender(2017, 'Male');
var females1990 = getImmByGender(1990, 'Female');
var females1995 = getImmByGender(1995, 'Female');
var females2000 = getImmByGender(2000, 'Female');
var females2005 = getImmByGender(2005, 'Female');
var females2010 = getImmByGender(2010, 'Female');
var females2015 = getImmByGender(2015, 'Female');
var females2017 = getImmByGender(2017, 'Female');


function getData(year){
    d3.select("#yearText").text("Year: " + year)
    
    d3.json("/data/" + year + "Cleaned.json", function(d){
        data = d;
        thisYear = year
        draw()
    });
}



function correctJson(d){
    var correctedData = {"Immigration": {}, "Emigration": {}};
    
    //Immigration
    for(var key in d.Immigration){
        if(key == "Bolivia (Plurinational State of)"){
            correctedData['Immigration']["Bolivia, Plurinational State of"] = d["Immigration"][key];
        }
        
        else if(key == "Cabo Verde"){
            correctedData['Immigration']["Cape Verde"] = d["Immigration"][key];
        }
        
        else if(key == "Cote d'Ivoire"){
            correctedData['Immigration']["Côte d'Ivoire"] = d["Immigration"][key];
        }
        
        else if(key == "Czechia"){
            correctedData['Immigration']["Czech Republic"] = d["Immigration"][key];
        }
        
        else if(key == "Democratic Republic of the Congo"){
            correctedData['Immigration']["Congo, the Democratic Republic of the"] = d["Immigration"][key];
        }
        
        else if(key == "Iran (Islamic Republic of)"){
            correctedData['Immigration']["Iran, Islamic Republic of"] = d["Immigration"][key];
        }
        
        else if(key == "Micronesia (Fed. States of)"){
            correctedData['Immigration']["Micronesia, Federated States of"] = d["Immigration"][key];
        }
        
        else if(key == "Republic of Korea"){
            correctedData['Immigration']["Korea, Republic of"] = d["Immigration"][key];
        }
        
        else if(key == "Republic of Moldova"){
            correctedData['Immigration']["Moldova, Republic of"] = d["Immigration"][key];
        }
        
        else if(key == "State of Palestine"){
            correctedData['Immigration']["Palestinian Territories"] = d["Immigration"][key];
        }
        
        else if(key == "Venezuela (Bolivarian Republic of)"){
            correctedData['Immigration']["Venezuela, Bolivarian Republic of"] = d["Immigration"][key];
        }
        
        else{
            correctedData["Immigration"][key] = d["Immigration"][key]
        }
        
        
    }
    
    //Emigration
    for(var key in d.Emigration){
        if(key == "Bolivia (Plurinational State of)"){
            correctedData['Emigration']["Bolivia, Plurinational State of"] = d["Emigration"][key];
        }
        
        else if(key == "Cabo Verde"){
            correctedData['Emigration']["Cape Verde"] = d["Emigration"][key];
        }
        
        else if(key == "Cote d'Ivoire"){
            correctedData['Emigration']["Côte d'Ivoire"] = d["Emigration"][key];
        }
        
        else if(key == "Czechia"){
            correctedData['Emigration']["Czech Republic"] = d["Emigration"][key];
        }
        
        else if(key == "Democratic Republic of the Congo"){
            correctedData['Emigration']["Congo, the Democratic Republic of the"] = d["Emigration"][key];
        }
        
        else if(key == "Iran (Islamic Republic of)"){
            correctedData['Emigration']["Iran, Islamic Republic of"] = d["Emigration"][key];
        }
        
        else if(key == "Micronesia (Fed. States of)"){
            correctedData['Emigration']["Micronesia, Federated States of"] = d["Emigration"][key];
        }
        
        else if(key == "Republic of Korea"){
            correctedData['Emigration']["Korea, Republic of"] = d["Emigration"][key];
        }
        
        else if(key == "Republic of Moldova"){
            correctedData['Emigration']["Moldova, Republic of"] = d["Emigration"][key];
        }
        
        else if(key == "State of Palestine"){
            correctedData['Emigration']["Palestinian Territories"] = d["Emigration"][key];
        }
        
        else if(key == "Venezuela (Bolivarian Republic of)"){
            correctedData['Emigration']["Venezuela, Bolivarian Republic of"] = d["Emigration"][key];
        }
        
        else{
            correctedData["Emigration"][key] = d["Emigration"][key]
        }
    }
    console.log(JSON.stringify(correctedData));
    
    return correctedData;
    
}



function draw() {
    var total = parseInt(data['Immigration']['Total']);
    d3.select('#totalImm')
        .text("Total Immigrants: " + numToString(total));

    drawImmigrationArcs()
    topFive = getTopFive()
    makePie(topFive)
    makeGenderChart()
    

}

function getImmByGender(year, gender){
    var total = 0;
    for(key in genderData[year]['Immigration']){
        total = total + parseInt(genderData[year]['Immigration'][key][gender]);
    }
    
    return total;
}

function makeGenderChart(){
    var ctx = document.getElementById("genderChart");
    ctx.width = 600;
    ctx.height = 240;
    
    var values;
    if(thisYear == 1990)
        values = [males1990, females1990]
    else if(thisYear == 1995)
        values = [males1995, females1995]
    else if(thisYear == 2000)
        values = [males2000, females2000]
    else if(thisYear == 2005)
        values = [males2005, females2005]
    else if(thisYear == 2010)
        values = [males2010, females2010]
    else if(thisYear == 2015)
        values = [males2015, females2015]
    else 
        values = [males2017, females2017]
    
    var random = {
        labels: ["Males", "Females"],
        datasets:[{
            data: values,
            backgroundColor: ["aqua", "pink"],
            hoverBackgroundColor: ["aqua", "pink"]
        }]
    };
    
    var mychart = new Chart(ctx, {
        type: 'doughnut',
        data: random,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            responsive: false,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Sex'
            }
        }
    });
    
}

function getTopFive(){
    // Create items array
    var items = Object.keys(data.Immigration).map(function(key){
        return [key, data.Immigration[key]];
    });
    
    // Sort
    items.sort(function(first, second){
        return second[1] - first[1];    
    });
    
    return items.slice(1, 6);
}

function makePie(topFive){
    var ctx = document.getElementById("chart");
    ctx.width = 600;
    ctx.height = 235;
    
    var countryNames = []
    topFive.forEach(function(element){
        countryNames.push(element[0]);
    });
    
    var values = []
    topFive.forEach(function(element){
        values.push(parseInt(element[1]));
    });
        
    
    var random = {
    labels: countryNames,
    datasets: [
        {
            data: values,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#c137e8",
                "#FFCE56",
                "#42f480",
                "#e83680",
                "#f46541",
                "#6441af",
                "#f20000",
                "#ddf4ff"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#c137e8",
                "#FFCE56",
                "#42f480",
                "#e83680",
                "#f46541",
                "#6441af",
                "#f20000",
                "#ddf4ff"
            ]
        }]
};
    var myDoughnutChart = new Chart(ctx, {
        type: 'pie',
        data: random,
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            responsive: false,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Top 5 Countries'
            }
        }
    });
}

function findInMaps(country){
    word = country.split(" ")
    
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    for(var i = 0, j = countries.length; i < j; i++){
        countryName = countries[i].properties.name.split(" ");
        if(countryName[0] == word[0]){
            if(countryName[0] == "United"){
                if(countryName[1] == word[1]){
                    return true;
                }
                
                else
                    return false;
            }
            
            if(countryName[0] == "Saint"){
                if(countryName[1] == word[1]){
                    return true;
                }
                else
                    return false;
            }
            
            return true;
        }


    }

    return false;
}

function getCountry(country){
    
    var word = country.split(" ")
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    for(var i = 0, j = countries.length; i < j; i++){
        countryName = countries[i].properties.name.split(" ");
        if(countryName[0] == word[0]){
            if(countryName[0] == "United"){
                if(countryName[1] == word[1]){
                    return countries[i];
                }
                
                else
                    return null;
            }
            
            if(countryName[0] == "Saint"){
                if(countryName[1] == word[1]){
                    return countries[i];
                }
                else
                    return null;
            }
            
            return countries[i];
        }


    }

    return null;
}

function drawImmigrationArcs(){
    var countriesArray = [];
    var immData = data.Immigration;
    
    for(key in immData){
        var orgDest = {destination: 'USA'}
        var country = getCountry(key);
        if(country != null){
            orgDest['origin'] = country.id
            orgDest['strokeColor'] = getRandomColor()
            countriesArray.push(orgDest)
        }
        
        
    }
    
    map.arc(countriesArray)
    
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function countryMigrants(geography){
    if(data.Immigration[geography.properties.name]){
        var value = data.Immigration[geography.properties.name];
        d3.select('#country')
        .text(geography.properties.name + ": " + numToString(value));
    }
    
    else{
        d3.select('#country')
        .text(geography.properties.name + ": " + "none");
    }
    
}

function numToString(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* DATAMAPS */
var map = new Datamap({
    element: document.getElementById('container'),
    scope: 'world',
    hideHawaiiAndAlaska:true,
    borderWidth: 5,
    //projection: 'mercator',
    done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
                countryMigrants(geography);
            });
        
    },
    popupTemplate: function(geography, data) { // This function should just return a string
        return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + geography.properties.name + '&lt;/strong&gt;&lt;/div&gt;';
    },
    popupOnHover: true,
    highlightOnHover: true,
    fills: {
        'USA': 'rgba(33,36, 40, 0.8)',
        defaultFill: 'rgba(33,36, 40, 0.4)'
    },
    arcConfig: {
        animationSpeed: 3000,
        popupOnHover: false,
        strokeWidth: 0.2,
    }
});

