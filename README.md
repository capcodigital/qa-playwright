**Introduction**

This repo is created based on the Playwright Udemy course (Author : Rahulshetty).
To learn playwright in depth , refer [https://playwright.dev/docs/intro]


This project contains 

*   Basics of playwright (uibasics.spec.js) 
*   Page objects (uibasics_page_object.spec.js)
*	Mock API request (interceptAPIRequest.spec.js)
*	Mock API response (interceptAPIResponse.spec.js)
*	Abort API calls (AbortAPIcallsAndLogs.spec.js)
*	Visual testing (visualtesting.spec.js)
*	StrorageState (storageState.spec.js)
*	Custom configuration file (playwright.custom.config.js)
*	Responsive testing (Testing web application in tablet/mobile) 
*	Static Test data from fixture file and multi dataset from Json file


**Installation steps**

1.  Install node.js from [https://nodejs.org/en/download/]
2.	Install editor – Vscode (best for js and ts)
3.	Create empty folder and open in Vscode
4.	Run the below command in terminal.<br/>
```npm init playwright``` 
5.	Select language (TS/JS) – Typescript or Javascript
6.	Name/Choose the folder to write End to end test (default is tests)
7.	Add a GitHub Actions workflow to easily run tests on CI

**Executing Tests**

To execute all the tests in /tests/ folder <br/>

``` npx playwright test``` 

To execute specific test <br/>

```npx playwright test tests/ <Spec file name>```<br/><br/>
example :<br/> ```npx playwright test tests/uibasics.spec.js```

By default , tests will be executed based on configuration present in ```playwright.config.js``` file. 
If you would need to run against another config file

```npx playwright test –config=<config file name>``` <br/>
example: <br/>
```npx playwright test --config=playwright.custom.config.js```
