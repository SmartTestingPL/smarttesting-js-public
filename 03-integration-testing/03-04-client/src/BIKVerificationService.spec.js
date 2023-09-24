const { BIKVerificationService } = require("./BIKVerificationService")
const { CustomerVerificationResultStatus } = require("./CustomerVerificationResult")
const { createMockCustomer } = require('./mocks')
const { rest } = require ('msw')
const { setupServer } = require('msw/node')
const { default: Axios, AxiosError } = require("axios")

// ten URL nie ma znaczenia
const baseUrl = 'http://localhost:6789'
// a w razie potrzeby znalezienia dostępnego portu (podobnie jak w kodzie javowym) można skorzystać z pakietu get-port:
// const getPort = require('get-port');
// await getPort()

// tworząc mock, określamy atrybut national ID poprzez parametr, dzięki temu wygodniej nam z poziomu testu (1) określać jego wartość i (2) uzależniać od tego mocki

const handlers = [
  rest.get(`${baseUrl}/18210116951`, async (req, res, ctx) => {
    return res(
      ctx.json("VERIFICATION_PASSED"),
    )
  }),
  rest.get(`${baseUrl}/18210116952`, async (req, res, ctx) => {
    return res(
      ctx.json("VERIFICATION_FAILED"),
    )
  }),
  rest.get(`${baseUrl}/18210116953`, async (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({ data: "some response" }),
    )
  }),
  rest.get(`${baseUrl}/18210116954`, async (req, res, ctx) => {
    throw new SyntaxError('Unexpected token')
  }),
]

const server = setupServer(...handlers)

describe('BIKVerificationService', () => {

  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  /**
   * Referencyjny test, w którym nie testujemy wychwytywania wyjątków, tylko poprawnie konfigurujemy mock i oczekujemy go otrzymać
   */
  it('should return positive verification', async () => {
    const service = new BIKVerificationService(baseUrl);
    const zbigniew = createMockCustomer('18210116951');
    const result = await service.verify(zbigniew);
    expect(result).toEqual(CustomerVerificationResultStatus.VERIFICATION_PASSED);
  })

  it('should return negative verification', async () => {
    const service = new BIKVerificationService(baseUrl);
    const zbigniew = createMockCustomer('18210116952');
    const result = await service.verify(zbigniew);
    expect(result).toEqual(CustomerVerificationResultStatus.VERIFICATION_FAILED);
  })

  // W tym i kolejnych testach zaślepiamy wywołanie GET zwracając różne
  // błędy techniczne. Chcemy się upewnić, że potrafimy je obsłużyć.

  describe('No IO Exceptions', () => {

    /**
     * Ważne:
     * Timeout per-test określamy w trzecim parametrze `it`, poniżej - 1 sekunda, zakomentowane
     * Timeout klienta na żądaniu HTTP określamy na poziomie konkretnej biblioteki HTTP (u nas - Axios), tu - przekazujemy w drugim parametrze verify; moglibyśmy też ustawić globalnie dla całej instancji Axiosa
     * 
     * W naszym teście interesuje nas zweryfikowanie, że klient oczekujący odpowiedzi w przeciągu 1s nie otrzyma jej, bo server/`msw` wyśle ją dopiero po 2 sekundach. Nie ma to nic wspólnego z timeoutem na teście.
     */
    it('should fail with timeout', async () => {
      const service = new BIKVerificationService(baseUrl);
      const zbigniew = createMockCustomer('18210116953');
      const { status } = await service.verify(zbigniew, 1000);
      expect(status).toEqual(CustomerVerificationResultStatus.VERIFICATION_FAILED);
    })
    // }, 1000) // <- tutaj możemy określić timeout testu
  
    /**
     * Sprawdzamy, czy nie zostało wywołane połączenie na niechciany adres
     * onUnhandledRequest: 'error',
     */
    it('should fail with unsupported resource', async () => {
      const service = new BIKVerificationService(baseUrl);
      const zbigniew = createMockCustomer('nie-ma-takiego-adresu');
      const { status } = await service.verify(zbigniew);
      expect(status).toEqual(CustomerVerificationResultStatus.VERIFICATION_FAILED);
    })

    it('should fail with a malformed JSON', async () => {
      const service = new BIKVerificationService(baseUrl);
      const zbigniew = createMockCustomer('18210116954');
      const { status } = await service.verify(zbigniew);
      expect(status).toEqual(CustomerVerificationResultStatus.VERIFICATION_FAILED);
    })
  })

  describe('IO Exceptions', () => {
    // nadpisywanie metod w JS może być wykonane na naprawdę wiele sposobów 🙃
    // co wcale nie znaczy że to dobrze 🤔

    // poniżej możemy przeciążyć klasę - po to aby zmienić implementację przetwarzania wyjątku
    class BIKVerificationServiceRethrow extends BIKVerificationService {
      processException(err){
        throw err
      }
    }

    it('should fail with timeout', async () => {
      // override #1
      const service = new BIKVerificationServiceRethrow(baseUrl);
      // service.processException = (err) => { throw err };
      const zbigniew = createMockCustomer('18210116953');
  
      await expectAsync(service.verify(zbigniew, 1000)).toBeRejected();
    })

    // w tym teście z kolei, zamiast używać klasy przeciążonej robimy zwykły monkey-patching na metodzie serwisu
    // stety niestety, monkey patching w JS to po prostu nadpisanie atrybutu nową lambdą. Nie jest potrzebna żaden mechanizm refleksji.
    it('should fail with unsupported resource', async () => {
      await expectAsync(Axios.get(`${baseUrl}/nie-ma-takiego-adresu`)).toBeRejected()
      await expectAsync(Axios.get(`${baseUrl}/nie-ma-takiego-adresu`)).toBeRejectedWithError(/GET http:\/\/localhost:6789\/nie-ma-takiego-adresu/)
  
      const service = new BIKVerificationService(baseUrl);
      // override #2
      service.processException = (err) => { throw err };
      const zbigniew = createMockCustomer('nie-ma-takiego-adresu');
      await expectAsync(service.verify(zbigniew)).toBeRejectedWithError(/GET http:\/\/localhost:6789\/nie-ma-takiego-adresu/)
    })

    it('should fail with a malformed JSON', async () => {
      const service = new BIKVerificationService(baseUrl);
      service.processException = (err) => { throw err };
      const zbigniew = createMockCustomer('18210116954');
      await expectAsync(service.verify(zbigniew)).toBeRejectedWithError(AxiosError)
    })
  })
})
