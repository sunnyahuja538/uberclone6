# API Documentation

## /users/register

### Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database.

### Method
POST

### Endpoint
`/users/register`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string (min length 3)",
    "lastname": "string (min length 3)"
  },
  "email": "string (valid email format)",
  "password": "string (min length 6)"
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "string (JWT token)"
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (parameter name)",
      "location": "string (location of the parameter)"
    }
  ]
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## /users/login

### Description
This endpoint is used to log in an existing user. It validates the input data and checks the user's credentials.

### Method
POST

### Endpoint
`/users/login`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "email": "string (valid email format)",
  "password": "string (min length 6)"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "user": {
    "id": "string (user ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string (user email)"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (parameter name)",
      "location": "string (location of the parameter)"
    }
  ]
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid Email or password"
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## /users/profile

### Description
This endpoint is used to retrieve the profile of the currently logged-in user.

### Method
GET

### Endpoint
`/users/profile`

### Headers
- `Authorization`: Bearer `<JWT token>`

### Response

#### Success (200 OK)
```json
{
  "id": "string (user ID)",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string (user email)"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

### Example Request
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <JWT token>"
```

### Example Response
```json
{
  "id": "12345",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## /users/logout

### Description
This endpoint is used to log out the currently logged-in user by invalidating their token.

### Method
GET

### Endpoint
`/users/logout`

### Headers
- `Authorization`: Bearer `<JWT token>`

### Response

#### Success (200 OK)
```json
{
  "message": "User Logged Out"
}
```

### Example Request
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <JWT token>"
```

### Example Response
```json
{
  "message": "User Logged Out"
}
```

## /captains/register

### Description
This endpoint is used to register a new captain. It validates the input data and creates a new captain in the database.

### Method
POST

### Endpoint
`/captains/register`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string (min length 3)",
    "lastname": "string (min length 3)"
  },
  "email": "string (valid email format)",
  "password": "string (min length 6)",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "string (JWT token)",
  "captain": {
    "id": "string (captain ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string (captain email)",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (parameter name)",
      "location": "string (location of the parameter)"
    }
  ]
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "AB123CD",
    "capacity": 4,
    "vehicleType": "Car"
  }
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "Car"
    }
  }
}
```

## /captains/login

### Description
This endpoint is used to log in an existing captain. It validates the input data and checks the captain's credentials.

### Method
POST

### Endpoint
`/captains/login`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "email": "string (valid email format)",
  "password": "string (min length 6)"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "captain": {
    "id": "string (captain ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string (captain email)",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (parameter name)",
      "location": "string (location of the parameter)"
    }
  ]
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid Email or password"
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB123CD",
      "capacity": 4,
      "vehicleType": "Car"
    }
  }
}
```