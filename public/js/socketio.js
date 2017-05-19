var socket = io.connect();

socket.on('connect', () => { console.log("connected", socket.id); });

socket.on('connect_error', e => { console.error("connect_error", e); });