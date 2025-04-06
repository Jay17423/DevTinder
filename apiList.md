#DevTinder APIs
  ##AuthRouter
- POST/signup
- POST/login
- POST/logout

  ##ProfileRouter
- PATCH/profile/edit
- GET/profile/view
- PATCH /profile/password

  ##ConnectionRequestRouter
- POST/request/send/intrested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

  ##userRouter
- GET/users/connections
- GET/user/request
- GET/user/feed - Gets you the feed 

Status: ignore, intreseted, accepted, rejected

