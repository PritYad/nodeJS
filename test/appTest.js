const request = require('supertest');
const app = require('../app');

const { products } = require('../lib/mock.products.data');

describe('App', function () {
    it('app.get(/v1/ping) should return the current version of the microservice in ```package.json`', function () {
        request(app).get("/v1/ping")
            .expect(200)
            .expect(/1.0.0/)
    });
    it('app.get(invalidUrl) should return not found error', function (done) {
        request(app).get("/v1/prt")
            .expect(404)
            .expect(/Not found/, done)
    });
    it('app.get(/v1/products) should return product list', function (done) {
        request(app).get("/v1/products")
            .expect(200)
            .expect({ products }, done)
    });
    it('app.get(/v1/products:id) should return product details of the id specified, if found', function (done) {
        request(app).get("/v1/products:123")
            .expect(200)
            .expect(products[0], done)
    });
    it('app.get(/v1/products:id) should return product not found error, if product with specified id is not found', function (done) {
        request(app).get("/v1/products&afdasf")
            .expect(404)
            .expect('Product with the given product id was not found', done)
    });
});