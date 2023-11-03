const chain = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/products.service');
const { returnAllProductsServiceSuccesses } = require('../../mock/products.mock');
const productsControllers = require('../../../src/controllers/products.controller');

const { expect } = chain;
chain.use(sinonChai);

describe('Testing the products controller', function () {
  it('should return all products', async function () {
    sinon.stub(productsService, 'allProductsService').resolves(returnAllProductsServiceSuccesses);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControllers.getAllProductController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllProductsServiceSuccesses.data);
  });

  it('should return a product with the given ID', async function () {
    sinon.stub(productsService, 'findProductByIdService').resolves(returnAllProductsServiceSuccesses);

    const req = { params: { id: '1' } };
    const res = { 
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsControllers.getProductByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllProductsServiceSuccesses.data);
  });

  it('Verifica se é possivel criar um produto no banco de dados', async function () {
    const newProduct = {
      name: 'Product Test',
      quantity: 10,
      price: 9.99,
    };

    sinon.stub(productsService, 'createProductService').resolves({ status: 201, data: newProduct });

    const req = { body: newProduct };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControllers.createProductController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Verifica se é possivel atualizar um produto no banco de dados', async function () {
    const product = {
      name: 'Product Test',
      quantity: 10,
      price: 9.99,
    };

    sinon.stub(productsService, 'updateProductService').resolves({ status: 200, data: product });

    const req = { params: { id: '1' }, body: product };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControllers.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });

  it('Verifica se é possivel deletar um produto no banco de dados', async function () {
    sinon.stub(productsService, 'deleteProductService').resolves({ status: 204 });

    const req = { params: { id: '1' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsControllers.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  afterEach(function () { 
    sinon.restore();
  });
});
