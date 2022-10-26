import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { fakeLogin, fakeToken, fakeUser, trueLogin, trueToken, trueUser } from './mock';
import loginService from '../api/services/loginService'
import Usermodel from '../database/models/User'
// import jwt, { authToken } from '../JWT/tokenGenerate';
import { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

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

describe('testes de cobertura /login/validate', async () => {

  it('deve retornar status "200" se o token existir', async () => {
    sinon.stub(loginService, 'decode').resolves(trueToken as any);
    sinon.stub(Usermodel, 'findOne').resolves(trueUser as any);

    const resp = await chai.request(app).get('/login/validate').set('Authorization', 'hash').send();
    expect(resp.status).to.equal(200);

    (loginService.decode as sinon.SinonStub).restore();
    (Usermodel.findOne as sinon.SinonStub).restore()
  });

  it('deve retornar status "401" se o token nao existir', async () => {

    const resp = await chai.request(app).get('/login/validate').send();
    expect(resp.status).to.equal(401);
  });

  it('um erro deve ser capturado', async () => {
    sinon.stub(loginService, 'decode').returns({ } as any);
    
    const resp = await chai.request(app).get('/login/validate').set('Authorization', 'hash').send();
    expect(resp.status).to.equal(500);
  });
});

describe('testando funcoes', async () => {
  
  it('testando funcao decode loginservice', async () => {
    const func:JwtPayload | string = loginService.decode(trueToken);

   expect(func).to.equal({
     
    email: "admin@admin.com",
    exp: 1753122210,
    iat: 1666808610,
    password: "secret_admin",
    } );

  });

});


