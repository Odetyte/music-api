# Welcome to music-jam API APP 🎼

## About

- Register as a user.
- Once the user is authorized you will be able to access other Endpoints.
- As a regitered user you can create(host) music jams 🎸
- As a register user you can browse throught jam sessions(list).

## How to run

Clone the repo

```bash
git clone git@github.com:Odetyte/music-api.git
```

and navigate to the `back-end` folder

```bash
cd back-end
```

Finally run

```bash
docker-compose up
```

This will start two services:

- a Postgres database
- an Expressjs web server

## How to use

This app exposes a RESTful API that can be accessed via any HTTP client such as Postman.

| Endpoint                                       | Method | Request body                                                                                      | Response                                                                                                                                         | Description                                                                                                   |
| :--------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `http://localhost:3001/register`               | `POST` | `{"username": "username", "email": "email", "password": "password", "bandRole": "Accordionist"}`  | `{"userId": number, "username": "username", "bandRole": "Accordionist"}`                                                                         | Regisrter with a username, email, password and bandRole                                                       |
| `http://localhost:3001/login`                  | `POST` | `{"username": "username", "password": "password"`                                                 | `JWT authorization-token`                                                                                                                        | Login with a username and password                                                                            |
| `http://localhost:3001/users/:id/jam-sessions` | `POST` | `{"title": "title", "location": "location", "bandRoleParticipants": ["Accordionist", "Pianist"]}` | `{"id": number, "title": "title", "location": "location", "bandRoleParticipants": ["Accordionist", "Pianist"], "host":{"username": "username"}`, | Create a jam session with a title, location and bandRoleParticipants. Use auth-token in Headers from `/login` |
| `http://localhost:3001/jam-sessions`           | `GET`  | `None`                                                                                            | `List with all the jam sessions and their hosts`                                                                                                 | Requesting details about jam sessions. Use auth-token in Headers from `/login`                                |

### Use of Authorization token

In Headers add
| key | Value |
| :--- | :--- |
| auth-token| `Coppy token from http://localhost:3001/login response ` |

# Overview

I followed the software design pattern of **Model-View-Controller (MVC)** .

I created

- User and JamSession models
- Protected Routes to forward supported request to appropriate controller action.
- User and JamSession Controllers actions to get requested data from the models.
- AuthController to validate user.
- Views(templates) would be needed to add in a future, as for now it is in a form of json.

I used `TypeORM` to connect to Database

## Other future imporvements

- Validate all the entries
- Hash Password
- Add more cool features

# Diclaimer

Just because it is a sample web I haven't stored any crediatials to .env file.
But keep in mind it is very important to do in a real life projects.
