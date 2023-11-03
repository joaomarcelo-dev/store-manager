const sinon = require('sinon');
const chai = require('chai');
// const connectionDB = require('../../../src/providers/connectionDB');
const allProducts = require('../../mock/model.mock');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const { expect } = chai;

describe('Testando a camada SERVICE de PRODUCTS', function () {
  it('Verifica se é possivel buscar todos os produtos na servicce e retonar um objeto que cotenha o status e o data (dados da requisição)', async function () {
    const [products] = allProducts;

    sinon.stub(productsModel, 'allProductsDBModel').resolves(products);

    const returnService = await productsService.allProductsService();

    expect(returnService.status).to.deep.equal(200);
    expect(returnService).to.be.an('object');
    expect(returnService.data).to.deep.equal(products);
  });

  it('Verifica se é possivel Buscar um produto pelo id', async function () {
    const [[product]] = allProducts;
    sinon.stub(productsModel, 'findProductByIdDBModel').resolves(product);
  
    const responseService = await productsService.findProductByIdService(1);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.be.equal(product);
  });

  it('Verifica se ao tentar buscar um produto inexistente é retornado um objeto "{ message: "Product not found" }"', async function () {
    sinon.stub(productsModel, 'findProductByIdDBModel').resolves();

    const responseService = await productsService.findProductByIdService(89);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Caso ocorra um erro ao criar um produto é retornado um objeto "{ message: "Error adding product" }"', async function () {
    sinon.stub(productsModel, 'createProductDBModel').rejects();

    const responseService = await productsService.createProductService('Martelo de Thor');

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(422);
    expect(responseService.data).to.deep.equal({ message: 'Error adding product' });
  });

  it('Verifica se é possivel criar é retornado o produto criado e o status de criação', async function () {
    const [[product]] = allProducts;
    sinon.stub(productsModel, 'createProductDBModel').resolves({ insertId: 1 });
    sinon.stub(productsModel, 'findProductByIdDBModel').resolves(product);

    const responseService = await productsService.createProductService('Martelo de Thor');

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(201);
    expect(responseService.data).to.deep.equal(product);
  });

  // it('Verifica se ao tentar atualizar um produto inexistente é retornado um objeto "{ message: "product not found" }"', async function () {
  //   const [products] = allProducts;
  //   sinon.stub(productsService, 'findProductByIdService').resolves(products);

  //   const responseService = await productsService.updateProductService('Martelo de Thor', 89);

  //   expect(responseService).to.be.an('object');
  //   expect(responseService.status).to.deep.equal(404);
  //   expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  // });

  it('Verifica se é possivel atualizar um produto', async function () {
    const [products] = allProducts;
    sinon.stub(productsService, 'findProductByIdService').resolves(products);
    sinon.stub(productsModel, 'updateProductDBModel').resolves();
    sinon.stub(productsModel, 'findProductByIdDBModel').resolves(products);

    const responseService = await productsService.updateProductService('Martelo de Thor', 1);

    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(products);
  });

  // it('Verifica se ao tentar deletar um produto inexistente é retornado um objeto "{ message: "product not found" }"', async function () {
  //   const [product] = allProducts;
  //   sinon.stub(productsService, 'findProductByIdService').resolves(product);

  //   const responseService = await productsService.deleteProductService(89);

  //   expect(responseService).to.be.an('object');
  //   expect(responseService.status).to.deep.equal(404);
  //   expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  // });

  // it('Verifica se é possivel deletar um produto', async function () {
  //   sinon.stub(productsService, 'findProductByIdService').resolves();
  //   sinon.stub(productsModel, 'deleteProductDBModel').resolves();

  //   const responseService = await productsService.deleteProductService(1);

  //   expect(responseService).to.be.an('object');
  //   expect(responseService.status).to.deep.equal(204);
  //   expect(responseService.data).to.deep.equal({ message: 'Product deleted' });
  // });

  afterEach(function () {
    sinon.restore();
  });
});
