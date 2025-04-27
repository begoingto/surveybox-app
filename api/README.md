
## Getting Started Install SurveyBox API

### Reference Documentation

SurveyBox is a software system service which created in 2023 by Institute of Science and Technology Advanced Development students

### Requirement
***
* Java version 17 or latest
* postgesql 14 up
***


### Installation

after clone this project run command below
```
- After cloning this project, run the command below.
- Open the folders that you git cloned and open them.
- mouse right-click Scroll to find the IntelliJ IDE and double-click it.
- When you open it, you can see README.md to guide you through the next steps that we want you to take.
```
### So here are some guidelines that we want you to follow when you have already open a project.
```
Go to application.properties. We want you to put something in it.
src\main\resources\application.properties
```
###

### Connection Database
Check the file ```application.properties``` and create database name ``` surveybox_db ```
```
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/surveybox_db
spring.datasource.username=postgres
spring.datasource.password=
```
### API App
```
- Base URL: http://136.228.158.126:8000/api/v1 (surveybox-stage)
- End-Point:
    Auth
  1. Register: /auth/register
  2. Verify with Email: /auth/register
  3. forgot-password :/auth/forgot-password
  4. new-password : /auth/new-password
  5. refresh-token : /auth/refresh-token
  6. AuthProfile : /auth/me
   User
  1. find all:/users
    Survey
  1. Get Survey Single :/surveys/1
  2. survey-question : surveys/1/survey-question
  3. create surveys : /surveys
  4. update info : /surveys/12/update-survey
  5.find by uuid :/surveys/uuid/9812d947-8aa9-40b8-944f-89e2148c530
  6.update status: surveys/77/flipStatus
  7.Delete:/surveys/3
   Survey Response
  1.Submit Survey answers: /responses/228
  2.responsesId : /responses/survey/117?limit=100&page=1
   Category
  1.create :/categories
  2.Delete :/categories/5
  3.update :/categories/73
  4.get by id :/categories/50
  5.get all :/categories?categoryName=ed&categoryId=1&_limit&_page
   File
  1.upload single: /files
  2.upload multiple:/files/multiple
  3.get by name :/files/5be68361-a423-4df0-865e-44ce95c311cb.jpg
  4.delete :/files/181bbb83-a31a-451d-9ac7-9d23af5f1b5a.png
   Vote
  1.create :/votes
  2.get by id:/votes/340
  3.delete :/votes/299
  4.update :/votes/301
  5.get all :/votes
  6.find vote by uuid: /votes/uuid/c4ca779f-6b15-4f45-9e90-e0b2e72443101
   VoteResult
  1. response vote result :/vote-results/344/submit
  2.vote result :/votes/response
  3.response vote by id: /votes/response/350
   Question
  1.create : /questions
  2.get by id :/questions/250
  3.delete :/questions/290
  4.update :/questions/250
  5.existing question:/existing-questions
  6.get all : /questions
   Dashboard
  1.dashboard:/dashboard
  2.dashboard:/dashboard/graphs
   FeedBack
  1.create :/feedbacks
  2.all feedback :/feedbacks
  3.top 6 feedback/public-feedbacks
  Themes
  1.create :/themes
  2.find by id :/themes/1467
  3.update :/themes/148
  4.delete :/themes/148
  5.find all :/themes
```
