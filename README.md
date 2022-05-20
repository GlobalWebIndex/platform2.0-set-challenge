# GWI QA Engineering Manager Challenge

## Exercise: Charts page testing

### Describe the test scenarios and automate them

In this assigment you need to implement a E2E testing of your taste based on a preexisting micro application. Instructions on how to run the micro application can be found right below.
Please take your time with the assignment, we think it should not take more than 6 hours.

### `My Charts` Micro application

Charts are a central piece of our platform. `My Charts` is a small app that allows you to view your existing charts. This micro application consists of a

- dummy server with a single endpoint and
- a 3-page web interface where the e2e testing should only take place on the first page  

### Technical stuff

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

Provide Functional E2E test suite using your UI automation framework of choice.

We consider the following test scenarios:

1. ### Frontend automation test on the following

    1. The first page of the micro application
        1. Search functionality works
        2. Charts are displayed properly
        3. Clicking on chart table header sorts the table
        4. Clicking `Create a chart` button opens Page2
    2. The second page of the micro application
        1. Make sure navigation takes place
        2. Make sure Page 2 is rendered

2. ### API test

    The below endpoint is responsible for fetching the charts.
    | URL | `http://localhost:3000/api/charts` |
    | --- | --- |
    | Method | GET |

    Make sure you handle the below with your E2E framework:
    1. Success response
        1. Code: 200
        2. Content: `[
  {
    name: "Chart 1",
    created_at: 1631530148312,
    modified_at: 1631530148312,
  },
  {
    name: "Chart 2",
    created_at: 1617010419094,
    modified_at: 1627284724744,
  },
  {
    name: "Test 3",
    created_at: 1626174889659,
    modified_at: 1626180305757,
  },
  {
    name: "My awesome test 4",
    created_at: 1622454043335,
    modified_at: 1622454043335,
  },
  {
    name: "Chart 5",
    created_at: 1622453396409,
    modified_at: 1622453396409,
  },
]`
    2. Error response (404):
        | URL | `http://localhost:3000/api/charts1` |
        | --- | --- |
        | Code | 404 |
        | Content | `Cannot GET /api/charts1` |
    3. Error response (500):
        | URL | `http://localhost:3000/api/charts?orderBy=dateCreated&order=desc` |
        | --- | --- |
        | Code | 500 |
        | Content | `{"error": "Currently no order by datecreated descending has been implemented"}`|
    4. Error response (400):
        | URL | `http://localhost:3000/api/charts?orderBy=chartType` |
        | --- | --- |
        | Code | 400 |
        | Content | `{"error": "Please check your request parameters"}`|

In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.
Feel free to ask questions if something is not clear, please give your best shot on this task.

### Submission

Just a make a PR to the current repo! Good luck, potential colleague!
