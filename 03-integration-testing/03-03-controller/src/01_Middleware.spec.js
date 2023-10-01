const fraudMiddleware = require('./app/fraud')

describe('Fraud Middleware', () => {
  it('should reject loan application when person too young', () => {
    const tooYoungZbigniew = {
      "uuid": "7b3e02b3-6b1a-4e75-bdad-cef5b279b074",
      "name": "Zbigniew",
      "surname": "Zamłodowski",
      "dateOfBirth": "2005-01-01",
      "gender": "MALE",
      "nationalIdentificationNumber" : "18210116954"
    };

    const req = {
      body: tooYoungZbigniew
    }
    const res = {
      status(){},
      send(){},
    }
    const statusSpy = spyOn(res, 'status').and.returnValue(res);
    fraudMiddleware(req, res)

    expect(statusSpy).toHaveBeenCalledWith(401)
  });
});


