# Welcome to ROCK-N-ROLL 🎼

## About

ROCK-N-ROLL is a web service that allows you to create music jams and discover existing ones, all while taking care of security by implementing user authentication.

This project implements the following user stories:

- Register as a user
- Once the user is authenticated, you will be able to access other Endpoints
- As a registered user you can create(host) music jams 🎸
- As a registered user you can browse existing jam sessions

## Technical Overview

For this project I have implemented an ExpressJS web server in Typescript which follows the **Model-View-Controller (MVC)** software design pattern.

I created

- User and JamSession models
- Protected Routes to forward supported request to appropriate controller actions
- User and JamSession Controllers actions to get requested data from the models
- AuthController to authenticate user
- Postgres database
- Database connections using `TypeORM`
- Implemented Front End skeleton with React

<!-- - Views(templates) would be needed to add in a future, as for now it is in a form of json. -->

**Note**: User credentials (for Postgres) are stored in plain text in the code to make sure that anyone can clone this project and run it on their own without any additional configuration. In a real-world project, secrets and credentials should be stored outside of the context of this repository and referenced accordingly in the code, for example in a key file on the user's machine.

## How to run

Clone the repo

```bash
git clone git@github.com:Odetyte/rock-n-roll.git
```

and navigate to the `back-end` folder

```bash
cd rock-n-roll/back-end
```

Finally run

```bash
docker-compose up
```

This will start two services:

- a Postgres database, listening on port `5432`
- an Expressjs web server, listening on port `3001`

## How to use

This app exposes a RESTful API that can be accessed via any HTTP client such as Postman at http://localhost:3001.

| Endpoint                   | Method | Request body                                                                                      | Response                                                                                                                                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                             |
| :------------------------- | :----- | :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/register`                | `POST` | `{"username": "username", "email": "email", "password": "password", "bandRole": "Accordionist"}`  | `{"userId": number, "username": "username", "bandRole": "Accordionist"}`                                                                                                                                                                                                                                                                                                                                  | Register with a username, email, password and bandRole                                                                                                                                  |
| `/login`                   | `POST` | `{"username": "username", "password": "password"`                                                 | `JWT authorization-token`                                                                                                                                                                                                                                                                                                                                                                                 | Login with a username and password. Copy the returned auth token to use with the following endpoints                                                                                    |
| `/users/<id>/jam-sessions` | `POST` | `{"title": "title", "location": "location", "bandRoleParticipants": ["Accordionist", "Pianist"]}` | `{"id": number, "title": "title", "location": "location", "bandRoleParticipants": ["Accordionist", "Pianist"], "host":{"username": "username"}`,                                                                                                                                                                                                                                                          | Create a jam session for a user specified by their `id` with a `title`, `location` and `bandRoleParticipants`. Use the auth token in your request Headers that was returned by `/login` |
| `/jam-sessions`            | `GET`  | `None`                                                                                            | `{"id": 42, "title": "Private Jam Session No 300", "location": "Spandau", "bandRoleParticipants": "{\"Accordionist\",\"Vocalist\"}","createdAt": "2022-01-12T19:39:51.351Z", "updatedAt": "2022-01-12T19:39:51.351Z", "host": {"id": 1, "username": "odeta", "email": "odeta@email.com", "bandRole": "Vocalist", "createdAt": "2022-01-12T19:03:57.708Z","updatedAt": "2022-01-12T19:03:57.708Z"},{...}}` | Get a list of jam sessions with their respective properties. Use the auth token in your request Headers that was returned by `/login`                                                   |

### Use of Authorization token

In your HTTP request header, add:

| key        | Value                                         |
| :--------- | :-------------------------------------------- |
| auth-token | JWT token returned from the `/login` endpoint |

## Future Imporovements

- Input validations for all fields
- Hash password
- Swagger API docs
- Add more cool features
- Implement Front End
