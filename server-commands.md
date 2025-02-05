Curl in powershell 7

### Start server
```
npm run server
```

### GET todo list
```
curl.exe -X GET "http://localhost:5000/api/todolist"
```

### GET a todo
```
curl.exe -X GET "http://localhost:5000/api/todolist/2e70d95c-11b4-494b-ad69-026acc309a08"
```

Response:
{
  "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
  "title": "Complete project report",
  "completed": true
}

### GET todo list search query
```
curl.exe -X GET "http://localhost:5000/api/todolist?search=groceries"
```

Response:
[
  {
    "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
    "title": "Buy groceries",
    "completed": true
  }
]

### GET todo list filter query
```
curl.exe -X GET "http://localhost:5000/api/todolist?filter=completed"
```

Response:
[
  {
    "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
    "title": "Complete project report",
    "completed": true
  },
  {
    "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
    "title": "Buy groceries",
    "completed": true
  }
]

### GET todo list filter and search query
```
curl.exe -X GET "http://localhost:5000/api/todolist?filter=completed&search=groceries"
```

Response:
[
  {
    "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
    "title": "Buy groceries",
    "completed": true
  }
]

### POST a todo
Generate random uuid through the command line if needed
```
node -e "console.log(require('crypto').randomUUID())"
```

```
curl.exe -X POST "http://localhost:5000/api/todolist" `
    -H "Content-Type: application/json" `
    -d '{"title": "Buy pc", "completed": false}'
```

Payload:
{
  "title": "Buy pc",
  "completed": false
}

Response:
{
  "id": "46c1e488-2b2c-428f-8b8e-e9edbd276f78",
  "title": "Buy pc",
  "completed": false
}

### PATCH a todo
```
curl.exe -X PATCH "http://localhost:5000/api/todolist/2e70d95c-11b4-494b-ad69-026acc309a08" `
    -H "Content-Type: application/json" `
    -d '{"title": "Modified Title", "completed": true}'
```

Payload:
{
  "completed": true
}

Response:
{
  "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
  "title": "Buy groceries",
  "completed": true
}

### DELETE a todo
```
curl.exe -X DELETE "http://localhost:5000/api/todolist/2e70d95c-11b4-494b-ad69-026acc309a08"
```

Response:
{
  "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
  "title": "Complete project report",
  "completed": true
}
