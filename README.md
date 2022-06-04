# GWI QA Engineering Manager Challenge

## Exercise: Charts page testing

### Describe the test scenarios and automate them

In this assigment you need to implement a E2E testing of your taste based on a preexisting micro application. Instructions on how to run the micro application can be found right below.

### `My Charts` Micro application

Charts are a central piece of our platform. `My Charts` is a small app that allows you to view your existing charts. This micro application consists of a

- dummy server with a single endpoint and
- a 3-page web interface where the e2e testing should only take place on the first page  

### Setup

In order to be able to run the application locally you have to:

1. Install node version < 16 (due to a bug on [create-react-app](https://stackoverflow.com/questions/69693907/error-err-package-path-not-exported-package-subpath-lib-tokenize-is-not-d))
2. Clone git repository: `git clone https://github.com/GlobalWebIndex/platform2.0-qa-em-challenge.git`
3. Goto dir: `cd platform2.0-qa-em-challenge`
4. Install dependencies: `npm install`
5. Start application: `npm run start`
    - This creates and runs a server on <http://localhost:3001> and also
    - a react application on <http://locahost:3000> which proxies requests to the server above.
6. After that the micro application can be found here: <http://localhost:3000>

We prefer using the cypress e2e framework but any tool of choice would do.

### QA Testing challenge

Please provide E2E & API testing for the `My Charts` app and endpoints.

1. #### Frontend / E2E automation test on the following

    Please provide Functional E2E test suite using your UI automation framework of choice.

    Note that we have omitted a lot of details in this description on what kind of tests should be implemented and how. We hope you will fill these details in and prove to us that you are aware of industry best practices and that you also follow them. In your code, we would like to see your code structure, test design, and test strategy.

2. #### API test

    The below endpoint is responsible for fetching the charts.
    | URL | `http://localhost:3000/api/charts` |
    | --- | --- |
    | Method | GET |
    
    | Param | Values | Description|
    | --- | --- | --- |
    | orderBy | dateCreated | Order results based on their creation date |
    | orderBy | dateModified | Order results based on their modified date |
    | orderBy | name | Order results based on their name |
    | order | desc / asc | Specify ascending or descending order |


    #### Responses

    | Code | Description |
    | --- | --- |
    | 200 | OK ```[{ name: string, created_at: timestamp, modified_at: timestamp}]``` |
    | 400 | Client Error |
    | 404 | Not Found  |
    | 500 | Server Error |

In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.
Feel free to ask questions if something is not clear, please give your best shot on this task.

### Submission

Just a make a PR to the current repo! Good luck, potential colleague!

## E2E UI - API Test Suite

We use Cypress for E2E UI - API Tests but we cover only functional testing (we could integrate visual or accessibility testing apis so we can have non functional testing covered as well but we wanted to stick to functional testing).  

Lets review the test plan we created for the chart application:

1. ```api.spec.js```: We test multiple cases with cy.request
    * Get graphs by date created on ascending order
    * Get graphs by date created on descending order
    * Get graphs by date modified ascending order
    * Get graphs by date modified descending order
    * Get graphs by name ascending order
    * Get graphs by name descending order
    * Test 404 Response

2. ```search.spec.js```: We test from UI the following cases
    * Search for specific chart
    * Clear search

3. ```sort.spec.js```: Following the API tests we created we have implemented from UI the sorting of the graphs table
    * Sort by name
    * Sort by creation date
    * Sort by modified date

**Products Bugs**

1. Create a graph is not possible
2. API Test: Get graphs by date modified on descending order: Gives 500 Internal Server Error
3. UI Test: Sort by modified date: The column is not sorted correctly

In all cases (UI - API) we are not asserting hardcoded values rather than implementing a function to properly validate that appropriate data are calculated

### How to execute test suite

1. **Scripts in package.json**
    * ```npm run cy:run:<browserType>```: This will execute the test suite (against firefox or chrome if we want to test cross browser testing compatibility)
    * ```npm run report:merge```: This will merge mochawesome reports into one json file
    * ```npm run report:generate```: This will generate HTML from JSON
    * ```npm run report:copyScreenshots```: This will copy cypress screenshots (for failed tests) to the needed directory (HTML Reports)

For reporting there are other possibilities and by far the one we use is ReportPortal.io which is a realtime monitoring platform 

2. **Docker**

For docker we created a Dockerfile from official cypress image: ```cypress/browsers:node14.19.0-chrome100-ff99-edge```<br>
We just copy package.json and needed cypress configuration files. The prefered way is to go with Docker so you can isolate dependencies.<br> To build the image prior to run the container for the tests see the stages described jenkins.gdsl (if we are using jenkins pipelines :-) )

    * docker build -f Dockerfile -t cypress-chart-image:1.0.0 .
    * docker run --privileged --ipc=host -v ${WORKSPACE}/docker:/cypress/results cypress-chart-image:1.0.0

Volume ```${WORKSPACE}/docker``` so we can access the test results after test execution...