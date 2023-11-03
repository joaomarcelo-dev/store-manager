const chain = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesServices = require('../../../src/services/sales.service');
const { returnAllSalesServiceSuccesses } = require('../../mock/sales.mock');
const salesControllers = require('../../../src/controllers/sales.controller');

const { expect } = chain;
chain.use(sinonChai);

describe('Testing the products controller', function () {
  it('Verifica se é possivel buscar todas as vendas no banco de dados', async function () {
    sinon.stub(salesServices, 'allSalesService').resolves(returnAllSalesServiceSuccesses);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesControllers.getAllSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllSalesServiceSuccesses.data);
  });

  it('Verifica se é possivel buscar uma venda pelo id no banco de dados', async function () {
    const id = 1;
    sinon.stub(salesServices, 'findSalesByIdService').resolves({ 
      status: returnAllSalesServiceSuccesses.status, 
      data: returnAllSalesServiceSuccesses.data[0],
    });

    const req = {
      params: {
        id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesControllers.getAllSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllSalesServiceSuccesses.data[0]);
  });

  it('verifica se é possivel deletar uma venda pelo id no banco de dados', async function () {
    const id = 1;
    sinon.stub(salesServices, 'deleteSalesService').resolves({ 
      status: returnAllSalesServiceSuccesses.status, 
      data: returnAllSalesServiceSuccesses.data[0],
    });

    const req = {
      params: {
        id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesControllers.deleteSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllSalesServiceSuccesses.data[0]);
  });

  it('Verifica que se o produto não existir, retorna um erro', async function () {
    const id = 1;
    sinon.stub(salesServices, 'findSalesByIdService').resolves({ 
      status: returnAllSalesServiceSuccesses.status, 
      data: returnAllSalesServiceSuccesses.data[0],
    });

    const req = {
      params: {
        id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesControllers.getAllSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnAllSalesServiceSuccesses.data[0]);
  });

  afterEach(function () { 
    sinon.restore();
  });
});
