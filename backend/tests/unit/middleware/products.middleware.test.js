const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const productsControllers = require('../../../src/controllers/products.controller');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa o middleware validateNameProduct', function () {
  let createProductStub;

  before(function () {
    createProductStub = sinon.stub(productsControllers, 'createProductController');
  });

  // after(function () {
  //   createProductStub.restore();
  // });

  it('Valida se é retornado um objeto "{ message: "name is required" }" caso nenhum nome seja passado no body', function () {
    createProductStub.rejects(new Error('Validation error: name is required'));

    chai.request(app)
    .post('/products') // endpoint que será testado
    .send({ name: '' }) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('"name" is required');
    }); // o que fazer com a resposta
  });

  it('Valida se é retornado um objeto "{ message: "name" length must be at least 5 characters long }" caso o nome tenha menos de 5 caracteres', function () {
    createProductStub.rejects(new Error('Validation error: "name" length must be at least 5 characters long'));

    chai.request(app)
    .post('/products') // endpoint que será testado
    .send({ name: 'oi' }) // passando um nome vazio
    .end((err, res) => {
      if (err) return err;
      expect(res).to.have.status(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('"name" length must be at least 5 characters long');
    }); // o que fazer com a resposta
  });

  // it('Valida se é possivel postar um produto caso a chave nome do body esteja de acordo com os requisitos assima', function () {
  //   const product = { id: 1, name: 'Produto Teste' };
  //   createProductStub.resolves(product);

  //   chai.request(app)
  //   .post('/products') // endpoint que será testado
  //   .send({ name: 'Martelo do Thor' }) // passando um nome vazio
  //   .end((err, res) => {
  //     if (err) return err;
  //     expect(res).to.have.status(201);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body.name).to.be.equal('Martelo do Thor');
  //     expect(res.body.id).to.be.equal(4);
  //   }); // o que fazer com a resposta
  // });

  afterEach(function () {
    sinon.restore();
  });
});
