[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15384691&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2


# Yaru!Time API Documentation

## Deployed Links
Server: https://server-yarutime.rinafira.my.id
Client: https://yarutime.web.app

## Endpoints

List of available endpoints:

- `POST /user-login`
- `POST /user-login/google`
- `POST /user-register`

And routes below need authentication

- `POST /chat-openAi`
- `GET /user-detail`

- `POST /task`
- `GET /task`
- `GET /task/:id`

And routes below need authorizationTask (task author must match with user logged in)
- `PUT /task/:id`
- `DELETE /task/:id`

And routes below need authorizationUser (user must match with token)
- `PUT /user-update`

## 1. POST /user-register

Request:

- body:

```json
{
  "fullName": "string (required)",
  "email": "string (required)",
  "password": "integer (required)",
  "gender": "string (required)",
  "phoneNumber": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "fullName": "string (required)",
  "email": "string (required)"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full name cannot be empty"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Gender cannot be empty"
}
OR
{
  "message": "Phone number cannot be empty"
}
```

&nbsp;

## 2. POST /user-login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "integer (required)"}
```

_Response (200 - Created)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
