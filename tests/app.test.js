const test = require('tape')
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


/**
  * @desc Testes da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#A1 - POST de: /api/addBet/', function (t) {
    supertest(app.server)
    .post('/api/addBet/')
    .send(bet1)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        // TESTE A
        t.error(err, '#A1 - Execução do POST /api/addBet')
        t.end()
    })
})

/**
  * @desc Testes da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#A2 - POST de: /api/addBet/', function (t) {
  supertest(app.server)
  .post('/api/addBet/')
  .send(bet2)
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
      // TESTE A
      t.error(err, '#A2 - Execução do POST /api/addBet')
      t.end()
  })
})


/**
  * @desc Teste de leitura da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#B - GET de: api/getBets', function (t) {
  // Chama app.server porque foram exportados "server" e "db"
  // para que o teste possa fechar a conexao do db ao final e 
  // o teste não ficar suspenso
  supertest(app.server)
  .get('/api//getBets/')
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200)
  .expect(function(res) {
    res.body[0]._id = 'some fixed id'
    res.body[0].__v = 0
    res.body[1]._id = 'some fixed id'
    res.body[1].__v = 0
  })    
  .expect(200, 
    [
      {
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
      console.log(res.body);
      // TESTE B
      t.error(err, '#B - Execução do GET /api/getBets')
      t.end()
  })
})


/**
  * @desc Teste de leitura da API
  * @param  string testDescription - the message to be displayed
            callback - tests to be done
  * @return ???
*/
test('#Z - GET de: api/getCurrentBet', function (t) {
    // Chama app.server porque foram exportados "server" e "db"
    // para que o teste possa fechar a conexao do db ao final e 
    // o teste não ficar suspenso
    supertest(app.server)
    .get('/api//getCurrentBet/')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .expect(function(res) {
      res.body._id = 'some fixed id'
      res.body.__v = 0
    })    
    .expect(200, {
        _id: 'some fixed id',
        betDate: "2020-01-05T22:00:00.000Z",
        initialRound: 1020,
        finalRound: 1028,
        __v: 0
    })
    .end((err, res) => {
        console.log(res.body);
        // TESTE Z
        t.error(err, '#Z - Execução do GET /api/getCurrentBet')
        
        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        app.db.connection.close()
        t.end()
    })
})

