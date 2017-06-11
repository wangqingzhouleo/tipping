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
### 0.1.0
![Progress](http://progressed.io/bar/100)
- [x] Project Setup
- [x] SQL EER Diagram

### 0.1.1
![Progress](http://progressed.io/bar/100)
- [x] Sign-up Modulue

### 0.2.0
![Progress](http://progressed.io/bar/100)
- [x] Refactoring to OOP
- [x] Log-in Modulue

## API
### Sign-up (/signup)
It is used to post sign-up info to the server to regisiter an account.

|input|description|
|:-:|:-:|
|username| username|
|email|email address|
|password|a sha256 string|

|output-code|description|
|:-:|:-:|
|0|success|
|1|error inserting into mysql.| 
|2|invalid char in username|
|3| email address not valid|
|4| empty username|
|5| username too long|
|6| email already exists|
|7| username already exists|
|8| password not correctly hashed|

### Login (/login)
It is used to post login info to the server to get the uid. Input can be user or email.
|input|description|
|:-:|:-:|
|username or email| string |
|password|a sha256 string|

|output-code|description|
|:-:|:-:|
|0| success|
|1| username/email contain invalid char| 
|2| password not correctly hashed|
|3| username too long|
|4| wrong user/email or password|
|5| error with posing to server|






