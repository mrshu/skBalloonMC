
function JuloCC(options) {
    
    this.CALLSIGN = 'OM3KEG-11';
    this.API_KEY = '53388.60hsRyf8M9JV4Py';
    this.API_URL = 'http://api.aprs.fi/api/get?name='+ this.CALLSIGN + '&what=loc&apikey=' + this.API_KEY + '&format=json';
    
    this.baloon = {
        altitude: 0,
        speed: 0,
        battery_voltage: 0,
        battery_power_used: 0,
        battery_power_actual: 0,
        active_gps: 0,
    }; 

    this.sensors = {
        pressure: 0,
        tempreature: 0,
        humidity: 0
    };
    
    this.update = function() {
        var $this = this;
        $.getJSON('http://query.yahooapis.com/v1/public/yql',
                {q:      "select * from json where url='"+this.API_URL+"'",
                 format: 'json'} 
                ,
            function(data){
                if (data.query.results) {
                    data = data.query.results.json;
                    console.log(data);
                    $this.parsePacket(data.entries.comment);
                    $this.baloon.altitude = data.entries.altitude;
                    $this.baloon.speed = data.entries.speed;

                    console.log($this.baloon);
                } else {
                    // no data 
                }
            }
        );
        return; 
    };

    this.updateView = function() {
    
    };

    this.parsePacket = function(packet) {
        var data = packet.split(',');
        var type = data[0][4];

        this.baloon.active_gps = parseInt(data[0][2]);;

        if (type == 'P') {
            this.baloon.battery_voltage = parseInt(data[0].substring(5)) / 1000.0;
            this.baloon.battery_power_actual = parseInt(data[1]) * 10.0 + 3;
            this.baloon.battery_power_used = parseInt(data[2]);
        } else if (type = 'A') {

        }

    };

};


