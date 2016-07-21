Todo Application Coding Challenge
=======

This is a sample Todo application built as a coding challenge for potential candidates of CenturyLink CLARC.
Our desire is to provide a basic application that should be easy to get up and running, but that provides an
example toolset of a modern webstack.

Because of that desire, we have built this on the following projects or tools:
* TodoMVC (http://todomvc.com/examples/angularjs/#/)
* AngularJS v1 (https://angularjs.org/)
* Flask Micro Web Framework (http://flask.pocoo.org/)
* Sqlite Database (https://www.sqlite.org/)
* SQLAlchemy Python ORM (http://www.sqlalchemy.org/)

## The Assignment

You will be given a feature to be added to this application.  If you are familiar with Angular and Flask
(or similar micro frameworks) this assignment should take less than an hour.  If you are not familiar with
any of the tools, it will take a bit longer.

The assignment you are given will require you to add features to both the front-end (Angular, both js and html)
and the back-end (Flask).

Our suggestion is to get this application up and running and spend a couple hours working on the assignment.
If you are stuck after that time, message your contact and let us know where you at.  While we like finished
products, our desire is not for you to spend a ton of time on this assignment.

## Requirements

This application will run on Windows, Linux or OS X.  However it will take a little extra work to get things going
in Windows, and so if you choose to use it plan on spending a little more time getting things to work (one hint:
make sure Sqlite is running).

* Sqlite
* Python 3
* Virtualenv (http://docs.python-guide.org/en/latest/dev/virtualenvs/)

## Quick Start
```
  < open directory you want to run from >
  cd dev

  < create and use virtualenv for python 3 >
  virtualenv -p <PATH_TO_PYTHON3> todoVenv
  source todoVenv/bin/activate

  < get code and run >
  git clone https://github.com/Cognilytics/todoChallenge.git
  cd todoChallenge
  pip install -r requirements.txt
  python server.py
```
Open browser to http://localhost:3000

## Structure

A few important files to know about:

```
├── api.py							< Flask Restful Api File >
├── bower.json						< Bower File for Vendor JS >
├── config.py						< Flask configuration file >
├── models.py						< SQLAlchemy Models >
├── requirements.txt				< Python Requirements File >
├── static							< Static Folder >
│   ├── lib								< Vendor Libraries >
│   ├── scripts							< Angular Stuff >
│   │   ├── app.js
│   │   ├── controllers						< Angular Controllers >
│   │   │   └── todoCtrl.js
│   │   ├── directives						< Angular Directives >
│   │   │   ├── todoFocus.js					< Directive for focus >
│   │   │   └── todoEscape.js					< Directive for escape >
│   │   └── services                        < Angular Service for Communication >
│   │       └── todoStorage.js
│   └── styles							< CSS Stuff >
│       └── main.css
├── templates							< Flask and Angular HTML Templates >
│   └── index.html						
├── test.db							< SQLite Database >
└── server.py						< Flask Main File >
```

## Notes

### Storage Service

/static/scripts/services/todoStorage.js was written by the todomvc.com authors to be used in two ways: local or remote.
The beginning of that script looks to see if it can access api endpoint /api/todos and if it can, it then says
'Hey, looks like we have a server behind this.  Lets use it.'  It then returns the 'api' factory.  If it doesn't find
anything at /api/todos then it says 'Bummer, no server.  I will use local storage instead.'  It then returns the
localStorage factory.  This is all invisible to the controller.  It just knows it has some kind of storage behind it.
Since we have a server (flask) behind this, you can focus on the api factory.

### Angular Resource

If you are unfamiliar with Angular and its Resource Provider, you will want to look at this page:
https://docs.angularjs.org/api/ngResource/service/$resource.  It will help you see how angular is mapping
functions like get(), save(), etc to GET, POST and so on.  You will also then see our app has defined
'update' to map to PUT as Resource does not have a default PUT method defined.
