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
server.get( '/api/todolist', (req, res) => {

    if(req.query.search) {
        const filteredJokes = list.todoList.filter((todo) => {
            const query = (req.query.search as string).toLowerCase();
            
            return todo.title.toLowerCase().includes(query);
        });

        res.status(200).jsonp(filteredJokes);

        return;
    }

    const response = list.todoList;

    res.status(200).jsonp(response);

    return;
});

server.post( '/api/todolist', (req, res) => {
    const newTodo = req.body;

    const response = list.todoList;

    response.push(newTodo);

    setTimeout(() => {
        res.status(200).jsonp(newTodo);
    }, 3000);
});

server.get( '/api/empty', (req, res) => {
    const response = [];

    setTimeout(() => {
        res.status(200).jsonp(response);
    }, 3000);
});

server.use( middlewares );

const port = 5000;
server.listen( port, () => {
    console.info( 'JSON Server running on port ' + port );
});