const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const salesControllers = require('../../../src/controllers/sales.controller');
const salesServices = require('../../../src/services/sales.service');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa o middleware da Sales', function () {
  let createSalesStub;

  before(function () {
    createSalesStub = sinon.stub(salesControllers, 'createSalesController');
  });

  after(function () {
    createSalesStub.restore();
  });

  it('Valida se é retornado um objeto "{ message: ""productId" is required" }" caso nenhum id for passado no Body', function () {
    chai.request(app)
    .post('/sales') // endpoint que será testado
    .send([{ quantity: 1 }]) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('"productId" is required');
    }); // o que fazer com a resposta
  });

  it('Valida se é retornado um objeto "{ message: ""quantity" is required" }" caso nenhum quantity for passado no Body', function () {
    chai.request(app)
    .post('/sales') // endpoint que será testado
    .send([{ productId: 1 }]) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('"quantity" is required');
    }); // o que fazer com a resposta
  });

  it('Valida se é retornado um objeto "{ message: ""quantity" must be greater than or equal to 1" }" caso a quantidade passada no body seja menor ou igual a 0', function () {
    chai.request(app)
    .post('/sales') // endpoint que será testado
    .send([{ productId: 1, quantity: 0 }]) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('"quantity" must be greater than or equal to 1');
    }); // o que fazer com a resposta 
  });

  it('Verifica se é possivel criar uma venda caso o body esteja de acordo com os requisitos acima', function () {
    const sale = {
      status: 201,
      data: {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      },
    };

    sinon.stub(salesServices, 'createSaleService').resolves(sale);

    chai.request(app)
    .post('/sales') // endpoint que será testado
    .send([{ productId: 1, quantity: 1 }]) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.productId).to.be.equal(1);
      expect(res.body.quantity).to.be.equal(1);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
