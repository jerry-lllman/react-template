import Stepper from './index'

describe('<Stepper>', () => {
  it('mounts', () => {
    cy.mount(<Stepper />)
    cy.get('[data-cy=counter]').should('have.text', '0')
  })

  it('can decrement a count', () => {
    cy.mount(<Stepper />)
    cy.get('[data-cy=decrement]').click().then(() => {
      cy.get('[data-cy=counter]').should('have.text', '-1')
    })
  })
})