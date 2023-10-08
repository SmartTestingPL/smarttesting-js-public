const { faker } = require('@faker-js/faker');

// https://stackoverflow.com/a/7091965
function getAge(birthDate) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const randomDate = () => {
  const randomDate = faker.date.between({ from: new Date('1980'), to: new Date('1990') })
  return {
    dateOfBirth: [randomDate.getUTCFullYear(), randomDate.getUTCMonth(), randomDate.getUTCDay()],
    age: getAge(randomDate)
  }
}

const sampleCustomerPayload = () => {
  const { dateOfBirth, age } = randomDate()
  return {
    customer: {
      uuid: faker.string.uuid(),
      person: {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        dateOfBirth,
        gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
        nationalIdentificationNumber: faker.number.int({ min: 10000000000, max: 99999999999  }),
        age,
      },
      student: faker.datatype.boolean()
    },
    status: "NEW"
  }
}

module.exports = {
  sampleCustomerPayload,
}
