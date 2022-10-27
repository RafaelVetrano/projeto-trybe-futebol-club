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
    expect(resp.status).to.equal(401);
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

describe('testes de cobertura /teams e /teams:id', async () => {
  
  it('deve retornar todos os times com status 200', async () => {
    const resp = await chai.request(app).get('/teams').send();
    expect(resp.status).to.equal(200);
    // expect(resp.body).length.to.equal(16);
  });

  it('deve retornar apenas o time do id com status 200', async () => {
    const resp = await chai.request(app).get('/teams/1').send();
    expect(resp.status).to.equal(200);
    // expect(resp.body).length.to.equal(1);
  });

});

describe('testes de cobertura /matches', async () => {
  
  it('deve retornar todas as partidas com status 200', async () => {
    const resp = await chai.request(app).get('/matches').send();
    expect(resp.status).to.equal(200);
    // expect(resp.body).equal(48);
  });

  it('deve retornar todas as partidas em progresso com status 200', async () => {
    const resp = await chai.request(app).get('/matches?inProgress=true').send();
    expect(resp.status).to.equal(200);
    // expect(resp.body).equal(8);
  });

  it('deve retornar todas as partidas em progresso com status 200', async () => {
    const resp = await chai.request(app).get('/matches?inProgress=false').send();
    expect(resp.status).to.equal(200);
    // expect(resp.body).length(40);
  });

});

