describe('PetClinic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')  
  })

  it('should display error message', () => {
    cy.get('a').contains('Error').click()

    cy.contains('Something happened...').should('be.visible')
  })

  it('should display veterinarians page', () => {
    cy.get('a').contains('Veterinarians').click()

    cy.get('table#vets tbody tr').should($tr => {
      expect($tr).to.have.length.above(0)
    })
  })

  it('should navigate to a menu item on mobile devices', () => {
    cy.viewport('iphone-6')

    cy.get('.navbar-header button').click()

    cy.get('a').contains('Veterinarians').click()

    cy.get('table#vets tbody tr').should($tr => {
      expect($tr).to.have.length.above(0)
    })
  })
})
