
function JuloMC(options) {
    
    this.CALLSIGN = 'OM3KEG-11';
    this.API_KEY = '53388.60hsRyf8M9JV4Py';
    this.API_URL = 'http://api.aprs.fi/api/get?name='+ this.CALLSIGN + '&what=loc&apikey=' + this.API_KEY + '&format=json';
    
    this.baloon = {
        altitude: 0,
        altitude_computed: 0,
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
    
    this.update = function(type) {
        var $this = this;

        if (type !== 'local') {
            $.getJSON('http://query.yahooapis.com/v1/public/yql',
                    {q:      "select * from json where url='"+this.API_URL+"'",
                     format: 'json'} 
                    ,
                function(data){
                    if (data.query.results) {
                        data = data.query.results.json;
                        console.log(data);
                        $this.parsePacket(data.entries.comment);
                        $this.baloon.altitude = Math.round(data.entries.altitude);
                        $this.baloon.speed = Math.round(data.entries.speed);

                        $this.updateView();
                    } else {
                        // no data 
                    }
                }
            );
        } else {
             $.getJSON(this.API_URL,
                function(data){
                    if (data) {
                        console.log(data);
                        $this.parsePacket(data.comment);
                        $this.baloon.altitude = data.altitude;
                        $this.baloon.speed = data.speed;

                        $this.updateView();
                    } else {
                        // no data 
                    }
                }
            );            
        }
        return; 
    };

    this.updateView = function() {
        $('#data_altitude').html(this.baloon.altitude + ' m');
        $('#data_altitude_computed').html(this.baloon.altitude_computed + ' m');
        $('#data_speed').html(this.baloon.speed + ' km/h');
        $('#data_voltage').html(this.baloon.battery_voltage + ' V');
        $('#data_power').html(this.baloon.battery_power_actual+ ' mA');
        $('#data_power_used').html(this.baloon.battery_power_used+ ' mAh');

        $('#data_pressure').html(this.sensors.pressure + ' hPa');
        $('#data_temperature').html(this.sensors.tempreature + ' °C');
        $('#data_humidity').html(this.sensors.humidity + ' %Rh');
    };

    this.parsePacket = function(packet) {
        var data = packet.split(',');
        var type = data[0][4];

        this.baloon.active_gps = parseInt(data[0][2]);;

        if (type == 'P') {
            this.baloon.battery_voltage = Math.round(parseInt(data[0].substring(5)) / 1000.0);
            this.baloon.battery_power_actual = parseInt(data[1]) * 10.0 + 3;
            this.baloon.battery_power_used = (parseInt(data[2]));
        } else if (type == 'A') {
            console.log(data);
            this.sensors.tempreature = Math.round(parseInt(data[0].substring(5)) / 10.0);
            var p =parseInt(data[1]) / 10.0;
            this.sensors.pressure = Math.round(p);
            this.sensors.humidity = Math.round(parseInt(data[2]) / 100.0);
            $this.baloon.altitude_computed = 43252.0048-2.9910839*p-5870.47115*Math.log(p);

        }
    };

};


