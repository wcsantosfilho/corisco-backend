# corisco
Aplicação Node.js + React para controlar a validade dos meus jogos da Mega-sena

# To do
- [x] upgrade para React 16
- [x] correção leitura backend
- [x] formatação dashboard
- [x] deploy backend heroku
- [x] adicionar concurso realizado
- [x] verificação jogo expirado
- [x] rever todos os testes - nova estrutura de payload
- [x] refatorar cronjob para usar http-fetch e não http "puro"
- [x] puppeteer não funciona no Heroku
- [ ] refatorar backgroundMailService para user fetch-node e não http
- [ ] criar esquema de 'workers'
- [ ] eliminar cronjob
- [ ] esquema MVC
- [x] testes de 'betService'
- [x] testes de 'drawService'
- [x] testes de 'expirationService'
- [x] corrigir "hanged" testes
- [ ] tratamento de erro MongoDB fora do ar
- [ ] testes de 'scrapAndInsertDrawService'
- [x] cronjob de 'scrapAndInsertDrawService'
- [x] esquema de variáveis de ambgiente: (dotenv)
- [x] logger ou coisa parecida
- [x] logger.info nos Services
- [ ] logger.info nas Routes
- [x] testes automáticos concurso realizado
- [ ] envio de e-mail concurso expirado
- [ ] deploy frontend heroku
- [x] leitura concurso realizado
- [ ] formulário para inclusão dos jogos
- [ ] resolver issues de segurança
- [ ] testes do front end
- [ ] deploy no Heroku

# To learn
- [ ] decorator = (o que é, como funciona?)
- [X] const { xalala } = this.props // O que é destruct de xalala
- [ ] COMMON JS vs ES6
- [ ] ESLint
