module.exports = https => {
        var io = require('socket.io')(https);

        io.set('origins', '*:*');
        rooms = {};

        io.on('connection', function(socket) {
            console.log('connect' , socket.id);

            socket.on("join",function( roomid, data ,fn ){
                try {
                    socket.roomid = roomid;
                    joinRoom(socket , data, fn);
                    console.log(rooms[socket.roomid][socket.id]);

                    socket.join(socket.roomid);
                }catch(e) {
                    console.error("\x1b[41m", e);
                }
            });
            socket.on("updatedata",function(data){
                try {
                    console.log("updatedata");
                    rooms[socket.roomid][socket.id] = data
                    socket.broadcast.to(socket.roomid).emit('updatedata', { id: socket.id, data: data });
                }catch(e) {
                    console.error("\x1b[41m", e);
                }
            });

            socket.on('signalling', function (data) {
                try {
                    if (rooms[socket.roomid] && rooms[socket.roomid][data.to]) {
                        socket.broadcast.to(data.to).emit('signalling', data);
                    } else {
                        console.warn('Invalid user');
                    }
                }
                catch(e) {
                    console.error("\x1b[41m", e);
                }
              
            });

            socket.on("disconnect",function(data){
                try {
                    if(socket && socket.roomid ) {
                        socket.broadcast.to(socket.roomid).emit('peer.disconnected', { id:socket.id, data:rooms[socket.roomid][socket.id] });
                        console.log('disconnect' , socket.id);
                        delete rooms[socket.roomid][socket.id];
                        if(isEmpty(rooms[socket.roomid])) {
                            delete rooms[socket.roomid];
                        }
                    }
                }catch(e) {
                    console.error("\x1b[41m", e);
                } 
            });
        });

        function joinRoom(socket, data, fn) {
            //console.log(socket);
            if( rooms[socket.roomid] === undefined || isEmpty(rooms[socket.roomid]) ) {
                rooms[socket.roomid] = {};
            }else{
                socket.broadcast.to(socket.roomid).emit('peer.connected', { id: socket.id, data: data });
            }
            rooms[socket.roomid][socket.id] = data;

            //removing to store selfdata from its client
            var clone = deepClone(rooms[socket.roomid]);
            delete clone[socket.id];
            fn(clone);
        }

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
