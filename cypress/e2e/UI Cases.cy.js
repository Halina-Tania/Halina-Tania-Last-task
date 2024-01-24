describe('template spec', () => {
  //1) Check the title is correct
  it('passes', () => {
    cy.visit('https://www.epam.com/')
    cy.title().should('include', 'EPAM | Software Engineering & Product Development Services')
  });

  //2) Check the ability to switch Light / Dark mode
  it('passes',()=>{
    cy.visit('https://www.epam.com/')
    cy.get('.hamburger-menu__button').click()
    cy.get('.mobile-location-selector-ui > .mobile-location-selector__button-section > .mobile-theme-switcher > .theme-switcher-ui > .theme-switcher').click()
  })

  //3) Check that allow to change language to UA
  it('passes',()=>{
    cy.visit('https://www.epam.com/')
    cy.get('.hamburger-menu__button').click()
    
  })
});
