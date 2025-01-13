import jsonServer from "json-server";
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

import list from "./mockdata.json" assert { type: "json" };

server.use( jsonServer.bodyParser );

server.use( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', req.headers.origin );
    res.header( 'Access-Control-Allow-Credentials', "true" );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );

    next();
});

//Example
server.get( '/todolist', (req, res) => {
    const response = list.todoList;

    res.status(200).jsonp(response);
});

server.use( middlewares );

const port = 5000;
server.listen( port, () => {
    console.info( 'JSON Server running on port ' + port );
});