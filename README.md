- [Installatoin](#Installatoin)
- [API](#API)

## Installation
### Install node.js
### Install mySql server
### Run tipping
After installing node.js and mySql server, the back end can be setup by

> git clone https://github.com/fa93hws/tipping.git
> cd tipping
> npm install

To start the server, simply type the following and go http://localhost:3000 to have a check.
> npm start

and type the following to terminate
> npm stop

## Milestones

### 0.2.0
![Progress](http://progressed.io/bar/100)
- [x] Refactoring to OOP
- [x] Log-in Modulue

### 0.3.0
![Progress](http://progressed.io/bar/90)
- [x] User login/sign system
- [x] Update user profile
- [ ] Reset Password

### 0.4.0
![Progress](http://progressed.io/bar/0)
- [ ] Single game play prototype


## API
### Sign-up (/signup)
It is used to post sign-up info to the server to regisiter an account.

|input|description|
|:-:|:-:|
|username| username|
|email|email address|
|password|a sha256 string|

|status|description|
|:-:|:-:|
|200|success|
|400|Failed| 

### Login (/login)
It is used to post login info to the server to get the uid. Input can be user or email and return with json-web-token if correct.

|input|description|
|:-:|:-:|
|username or email| string |
|password|a sha256 string|

|status|description|
|:-:|:-:|
|200| success|
|401| Failed| 

### get profile(/profile)
It will return the detail of the user profile.
- input: json web token
- outpu: personal detail (see ERR diagram in sql for detail)

### update profile(/updateProfile)
|input|description|
|:-:|:-:|
|sex| F,M or DK |
|imageurl|portrait|
|birthday| yyyy-mm-dd|
|location|any text|
|phone| any-text|
|display name| any-text|

|output|description|
|:-:|:-:|
|200| success|
|400| failed|


### forget password(/forget)
Send the email address in token and the sever will send the email to the target email account. Even if
the email address doesn't exists in the database, the message will imply success any way.
|input|description|
|:-:|:-:|
|email|sign-up email address |

|output|description|
|:-:|:-:|
|200| success|





