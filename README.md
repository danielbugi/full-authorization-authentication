# Authentication & Authorization API

Full CRUD MongoDB, Nodejs, authentication and authorization API server,
get access to protected routes with jwt token.
Restricted endpoints that only admin can access.

- Full CRUD MongoDB, Nodejs, authentication and authorization API.
- Get access to protected routes with jwt token.
- Error handling for development and production environment.
- Forgot and reset password functions with node mailer

### Routes Endpoints

- Create user - http://localhost/3000/api/v1/users/signup (post)
- Login user - http://localhost/3000/api/v1/users/login (post)
- Forgot password - http://localhost/3000/api/v1/users/forgotPassword (post)
- Reset password - http://localhost/3000/api/v1/users/resetPassword/{reset token you got to your email box} (patch)

#### Restricted routes

- Get all users - http://localhost/3000/api/v1/users (get)
- Get user - http://localhost/3000/api/v1/users/id (get)
- Delete user - http://localhost/3000/api/v1/users/id (delete)
- Update user - http://localhost/3000/api/v1/users/id (patch)

#### User routes

- Update current users password - http://localhost/3000/api/v1/users/updateMyPassword (patch)
- Update users data - http://localhost/3000/api/v1/users/updateMe (patch)
- Unactivate user - http://localhost/3000/api/v1/users/deleteMe (delete)

### Tech used:

- Nodejs
- Express
- MongoDB
- Bcrypt
- Jsonwebtoken
- Mongoose
- Morgan
- Validator
- Node mailer
