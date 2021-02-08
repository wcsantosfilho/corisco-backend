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

describe('Module', () => {
  // after(function (done) {
  //   app.close(done)
  // })

  it('#A0 - GET /getStatus', (done) => {
    supertest(app.server)
      .get('/api/getStatus')
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err)
        done()
      })
  })

  it('#A1 - POST /api/addBet/', (done) => {
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

  it('#A2 - POST /api/addBet/', (done) => {
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

  it('#B - GET api/getBets', (done) => {
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
        if (err) throw done(err)
        done()
    })
  })
      
  it('#C - GET api/getCurrentBet', (done) => {
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
          if (err) throw done(err)
          done()
      })
  })

  it('#D1 - POST /api/addDraw/', (done) => {
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

  it('#E1 - GET api/checkIfLastBetIsEqualDraw ', (done) => {
    supertest(app.server)
      .get('/api//checkIfLastBetIsEqualDraw/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, `Oh,oh... Last Bet 1028 = last Draw 1030.`)
      .end((err, res) => {
          if (err) throw done(err)
          done()
      })
  })

  it('#E2 - GET api/addBet ', (done) => {
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

  it('#E3 - GET api/checkIfLastBetIsEqualDraw ', (done) => {
    supertest(app.server)
      .get('/api//checkIfLastBetIsEqualDraw/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, `Don't worry. Last Bet 1039 <> last Draw 1030.`)
      .end((err, res) => {
          if (err) throw done(err)
          done()
      })
  })

  it('#Z9 - GET /getStatus', (done) => {
    supertest(app.server)
      .get('/api/getStatus')
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err)

        // Fecha a conexão com o banco para encerrar o teste, 
        // caso contrário ficava suspenso
        app.db.connection.close()
        done()
      })
  })

})