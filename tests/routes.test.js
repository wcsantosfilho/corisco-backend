const supertest = require('supertest')
const app = require('../src/loader')

/**
* @desc Chama app.server porque foram exportados "server" e "db"
para que o teste possa fechar a conexao do db ao final e 
o teste não ficar suspenso
*/

const bet1 = {
  betDate: "2020-01-05T22:00:00.000Z",
  initialRound: 1020,
  finalRound: 1028
}

const bet2 = {
  betDate: "2020-01-03T22:00:00.000Z",
  initialRound: 1011,
  finalRound: 1019
}

const bet3 = {
  betDate: "2020-01-07T08:18:00.000Z",
  initialRound: 1030,
  finalRound: 1039
}

const draw1 = {
  drawDate: "2020-01-08T20:00:00.000Z",
  drawRound: 1030
}

describe('Teste da API', function () {
  before(function () {
    console.log('Routes: before v')
    console.log(app.db.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }))
    console.log(`readyState: ${app.db.connection.readyState}`)
    console.log('Routes: before ^')
  })
  
  
  it('#A0 - GET /getStatus - Server está no ar?', function (done) {
    supertest(app.server)
    .get('/api/getStatus')
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#A1 - GET api/getCurrentBet - get com banco vazio', function (done) {
    supertest(app.server)
    .get('/api//getCurrentBet/')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(404)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#A2 - POST /api/addBet/ - adiciona uma aposta', function (done) {
    supertest(app.server)
    .post('/api/addBet/')
    .send(bet1)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#A3 - POST /api/addBet/ - adiciona segunda aposta', function (done) {
    supertest(app.server)
    .post('/api/addBet/')
    .send(bet2)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#B - GET api/getBets - leitura de todas as apostas', function (done) {
    supertest(app.server)
    .get('/api//getBets/')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .expect(function (res) {
      res.body[0]._id = 'some fixed id'
      res.body[0].__v = 0
      res.body[1]._id = 'some fixed id'
      res.body[1].__v = 0
    })
    .expect(200,
      [{
        _id: 'some fixed id',
        betDate: "2020-01-05T22:00:00.000Z",
        initialRound: 1020,
        finalRound: 1028,
        __v: 0
      },
      {
        _id: 'some fixed id',
        betDate: "2020-01-03T22:00:00.000Z",
        initialRound: 1011,
        finalRound: 1019,
        __v: 0
      }
    ]
    )
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#C - GET api/getCurrentBet - leitura da última aposta', function (done) {
    supertest(app.server)
    .get('/api//getCurrentBet/')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .expect(function (res) {
      res.body[0]._id = 'some fixed id'
      res.body[0].__v = 0
    })
    .expect(200, [{
      _id: 'some fixed id',
      betDate: "2020-01-05T22:00:00.000Z",
      initialRound: 1020,
      finalRound: 1028,
      __v: 0
    }])
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#D0 - GET api/checkIfLastBetIsEqualDraw - Testa retorno com tabela de concursos vazia', function (done) {
    supertest(app.server)
    .get('/api//checkIfLastBetIsEqualDraw/')
    .expect('Content-Type', /json/)
    .expect(404, {
      status: 404,
      message: "Não encontrou concurso ou aposta para comparar"
    })
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#D1 - POST /api/addDraw/ - adiciona um concurso', function (done) {
    supertest(app.server)
    .post('/api/addDraw/')
    .send(draw1)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#E1 - GET api/checkIfLastBetIsEqualDraw - Última aposta é igual ao último concurso?', function (done) {
    supertest(app.server)
    .get('/api//checkIfLastBetIsEqualDraw/')
    .expect('Content-Type', /json/)
    .expect(200, {
      status: 200,
      message: `Sua última aposta 1028 é menor que o concurso atual(1030).`
    })
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#E2 - GET api/addBet - adiciona a terceira aposta', function (done) {
    supertest(app.server)
    .post('/api//addBet/')
    .send(bet3)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#E3 - GET api/checkIfLastBetIsEqualDraw - Última aposta é igual ao último concurso? ', function (done) {
    supertest(app.server)
    .get('/api//checkIfLastBetIsEqualDraw/')
    .expect('Content-Type', /json/)
    .expect(200, {
      status: 200,
      message: `Sua última aposta 1039 é maior que o concurso atual(1030).`
    })
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  it('#Z9 - GET /getStatus - Teste Final!', function (done) {
    supertest(app.server)
    .get('/api/getStatus')
    .expect(200)
    .end((err, res) => {
      if (err) throw done(err)
      done()
    })
  })
  
  // You can put one ‘after()’ statement above all else that will run when all tests are finished
  after(async function () {
    console.log('Routes: after')
    app.db.connection.db.dropDatabase()
    console.log(`readyState: ${app.db.connection.readyState}`)
    console.log('Routes: after ^')
  })
  
})