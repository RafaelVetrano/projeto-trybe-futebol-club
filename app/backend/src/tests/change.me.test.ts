import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { fakeLogin, trueLogin } from './mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes de cobertura /login', () => {

  it('deve retornar "status 400" se o login for invalido',
  async () => {
    const resp = await chai.request(app).post('/login').send(fakeLogin);
    expect(resp.status).to.equal(400);
  }
  );

  it('deve retornar "status 400" se o "email" nao for inserido',
  async () => {
    const resp = await chai.request(app).post('/login').send(fakeLogin.password);
    expect(resp.status).to.equal(400);
  }
  );

  it('deve retornar "status 200" se o login for valido',
  async () => {
    const resp = await chai.request(app).post('/login').send(trueLogin);
    expect(resp.status).to.equal(200);
  }
  );

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
