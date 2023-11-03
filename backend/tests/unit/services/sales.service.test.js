const chai = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../src/services/sales.service');
const { allSales } = require('../../mock/sales.mock');
const salesModels = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Teste da SALES SERVICE', function () {
  it('Verifica se é possivel retornar todas as vendas', async function () {
    const [products] = allSales;
    sinon.stub(salesModels, 'allSalesDBModel').resolves(products);

    const result = await salesServices.allSalesService();

    expect(result.data).to.be.deep.equal(products);
    expect(result.status).to.be.equal(200);
    expect(result).to.be.an('object');
  });

  it('Verifica se é possivel retornar uma venda pelo id', async function () {
    const [product] = allSales;
    sinon.stub(salesModels, 'findSalesByIdDBModel').resolves([product]);

    const result = await salesServices.findSalesByIdService(1);

    expect(result.data).to.be.deep.equal([product]);
    expect(result.status).to.be.equal(200);
    expect(result).to.be.an('object');
  });

  // it('Verifica se é possivel deletar uma venda pelo id', async function () {
  //   const [product] = allSales;
  //   sinon.stub(salesModels, 'deleteSalesDBModel').resolves(product);

  //   const result = await salesServices.deleteSalesService(1);

  //   expect(result.data).to.be.deep.equal(product);
  //   expect(result.status).to.be.equal(204);
  //   expect(result).to.be.an('object');
  // });
});