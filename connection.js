module.exports = https => {
        var io = require('socket.io')(https);

        io.set('origins', '*:*');

        io.on('connection', function(socket) {

            console.log('connect' , socket.id);
            
            socket.on("updatedata",function(data){
                try {
                    console.log("updatedata", data);
                }catch(e) {
                    console.error("\x1b[41m", e);
                }
            });

            socket.on("disconnect",function(data){
                try {
                    console.log('disconnect' , socket.id);
                }catch(e) {
                    console.error("\x1b[41m", e);
                } 
            });
        });

        function isEmpty(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }

            return JSON.stringify(obj) === JSON.stringify({});
        }

        function deepClone(a) {
            var b = {};
            for(var p in a)
            {
                b[p] = a[p];
            }
            return b;
        }
    }
