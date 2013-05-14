
function JuloCC(options) {
    
    this.CALLSIGN = 'OM3KEG-11';
    this.API_KEY = '53388.60hsRyf8M9JV4Py';
    this.API_URL = 'http://api.aprs.fi/api/get?name='+ this.CALLSIGN + '&what=loc&apikey=' + this.API_KEY + '&format=json';
    
    this.baloon = {
        altitude: 0,
        speed: 0,
        battery_voltage: 0,
        battery_power_used: 0,
        active_gps: 0,
    }; 

    this.sensors = {
        pressure: 0,
        tempreature: 0,
        humidity: 0
    };
    
    this.update = function() {
        console.log('updating');
        $.getJSON('http://query.yahooapis.com/v1/public/yql',
                {q:      "select * from json where url='"+this.API_URL+"'",
                 format: 'json'} 
                ,
            function(data){
                if (data.query.results) {
                    data = data.query.results.json;
                    console.log(data);
                } else {
                    // no data 
                }
            }
        );
        return; 
    };

};


