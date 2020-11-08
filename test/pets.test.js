const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      profession: 'black',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  }).timeout(10000);

  it('should create a pet', async () => {
    const pet = {
      name: 'Rocky',
      age: 16,
      colour: 'black',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  }).timeout(10000);

  it('should find all pets', async () => {
    const res = await request(app).get('/pets')
    expect(res.status).to.equal(200);
  }).timeout(10000);

  it('should delete all pets', async () => {
    const res = await request(app).delete('/pets')
    expect(res.text).to.equal("All data deleted");
  }).timeout(10000);

});