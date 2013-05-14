
function JuloCC(options) {
    
    this.API_URL = 'http://api.aprs.fi/api/get?name=OM3KEG-11&what=loc&apikey=53388.60hsRyf8M9JV4Py&format=json';
    
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


