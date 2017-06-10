# Tipping (Back End

标签（空格分隔）： Gamble

---

[TOC]
## Installation
### Install node.js
### Install mySql server
### Run tipping
After installing node.js and mySql server, the back end can be setup by

> git clone https://github.com/fa93hws/tipping.git
> cd tipping
> npm install

To start the server, simply type the following and go http://localhost:3000 to have a check.
> node tipping start

and type the following to terminate
> node tipping stop

## Milestones
### 0.1.0
![Progress](http://progressed.io/bar/100)
- [x] Project Setup
- [x] SQL EER Diagram

### 0.1.1
![Progress](http://progressed.io/bar/100)
- [x] Sign-up Modulue

### 0.2.1
![Progress](http://progressed.io/bar/0)
- [x] Log-in Modulue

## API
### Sign-up (/signup)
It is used to post sign-up info to the server to regisiter an account.

|input|description|restriction|
|:-:|:-:|:-:|
|username| username| unique, length between 1 and 25, contain letters, number, "-", "_" and "." only.
|email|email address| unique, not empty, a valid email address|
|password|a sha256 string| not empty

|output-code|description|
|:-:|:-:|
|0|success|
|1|error inserting into mysql. Probably a repeated or empty username or email address| 
|2|invalid char in username|
|3| email address not valid|
|4| empty username|
|5| username too long|


### login






