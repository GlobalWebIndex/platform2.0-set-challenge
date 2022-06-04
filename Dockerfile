# This image will be used for functional tests
FROM cypress/browsers:node14.19.0-chrome100-ff99-edge

COPY cypress /cypress
COPY cypress.json /
COPY package.json /

RUN npm install -g yarn && yarn install

CMD yarn run cy:run
