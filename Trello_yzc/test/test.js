var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = `http://localhost:3000`;
var util = require("util");

describe('returns columns api', function () {
    it('returns columns', function (done) {
        request.get({ url: baseUrl + '/columns' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    })
});

describe('returns cards api', function () {
    it('returns cards', function (done) {
        request.get({ url: baseUrl + '/cards' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    })
});

describe('returns first column api', function () {
    it('returns first column', function (done) {
        request.get({ url: baseUrl + '/columns' + '/1' },
            function (error, response, body) {
                var bodyObj = JSON.parse(body);
                console.log(bodyObj);
                expect(bodyObj.id).to.equal(1);
                expect(bodyObj.title).to.equal("Column 1");
                expect(response.statusCode).to.equal(200);
                // console.log(body);
                done();
            });
    })
});

describe('returns first card api', function () {
    it('returns first card', function (done) {
        request.get({ url: baseUrl + '/cards' + '/1' },
            function (error, response, body) {
                var bodyObj = JSON.parse(body);
                console.log(bodyObj);
                expect(bodyObj.id).to.equal(1);
                expect(bodyObj.title).to.equal("Card 1");
                expect(bodyObj.description).to.equal("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
                expect(bodyObj.columnId).to.equal(1);
                expect(response.statusCode).to.equal(200);
                // console.log(body);
                done();
            });
    })
});