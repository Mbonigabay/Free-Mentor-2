# <a href="#"><img src="app/public/img/Capture.PNG" title="FVCproductions" alt="FVCproductions" width="30%"></a>
Free Mentors is a social initiative where accomplished professionals become role models to 
young people to provide free mentorship sessions.

[![Build Status](https://travis-ci.org/Mbonigabay/Free-Mentor-2.svg?branch=develop)](https://travis-ci.org/Mbonigabay/Free-Mentor-2)
[![Coverage Status](https://coveralls.io/repos/github/Mbonigabay/Free-Mentor-2/badge.svg?branch=develop)](https://coveralls.io/github/Mbonigabay/Free-Mentor-2?branch=develop)

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Additional Links](#additional-links)
* [API endpoints](#additional-links)

## General info
Free Mentors is a social initiative where accomplished professionals become role models to
young people to provide free mentorship sessions.

## Features
* Users can sign up
* Users can sign in
* Admin can change a user to a mentor
* Users can view mentors
* Users can view a specific mentor
* Users can create a mentorship session request with a mentor
* A mentor can accept a mentorship session request
* A mentor can decline a mentorship session request

## Technologies
### Bank-End
* Node / Express js
* Express
* Joi
* ESLint
* Travis CI
* Coveralls
### Front-End
* HTML
* CSS
* JavaScript
	
## Setup
Clone this repo from GitHub 

```
$ cd ../Free-Mentor-2
$ yarn install
$ yarn start
```

## Methods and paths to test API Endpoints
| Method      | Path                                                           | Description                          |
|-------------|----------------------------------------------------------------|--------------------------------------|
| POST        | /api/v1/auth/signup                                            | Create User Account                  |
| POST        | /api/v1/auth/signin                                            | User login                           |
| PATCH       | /api/v1/user/:userId                                           | Change a user to a mentor            |
| GET         | /api/v1/mentors                                                | Get all mentors                      |
| GET         | /api/v1/mentors/:mentorId                                      | Get a specific mentor                |
| POST        | /api/v1/sessions                                               | Create a mentorship session request  |
| PATCH       | /api/v1/sessions/:sessionId/accept                             | A mentor accepts a session request   |
| PATCH       | /api/v1/sessions/:sessionId/reject                             | A mentor rejects a session request   |


## Additional Links
**Pivot tracker stories**

> https://www.pivotaltracker.com/projects/2385284

**Free-Mentor API Documentation**

> https://documenter.getpostman.com/view/5787397/SVfWL5Rp

**Heroku**

> https://free-mentor-four.herokuapp.com/


