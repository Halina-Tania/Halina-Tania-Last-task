describe('Api', () => {
  it('get', () => {
    cy.request('https://cloudtesting.contosotraders.com/').should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('login', () => {
    cy.request({
      method: 'POST',
      url: 'https://contoso-traders-productsctprd.eastus.cloudapp.azure.com/v1/Login',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "username": "Tania",
        "password": "Qq12345678",
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Create Shopping cart', () => {
    cy.request({
      method: 'POST',
      url: 'https://contoso-traders-cartsctprd.bluestone-748d2276.eastus.azurecontainerapps.io/v1/ShoppingCart',
      body: {
        "cartItemId": "my first",
        "email": "trektrek037@gmail.com",
        "productId": 1,
        "name": "Tania",
        "price": 10,
        "quantity": 50
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('Change Shopping Cart', () => {
    cy.request({
      method: 'PUT',
      url: 'https://contoso-traders-cartsctprd.bluestone-748d2276.eastus.azurecontainerapps.io/v1/ShoppingCart/product',
      body: {
        "cartItemId": "my first",
        "email": "trektrek037@gmail.com",
        "productId": 1,
        "name": "Tania",
        "price": 10,
        "quantity": 1000
      },
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
  
  it('Delete Shopping Cart', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://contoso-traders-cartsctprd.bluestone-748d2276.eastus.azurecontainerapps.io/v1/ShoppingCart/product',
      body: {
        "cartItemId": "my first",
        "email": "trektrek037@gmail.com",
        "productId": 1,
        "name": "Tania",
        "price": 10,
        "quantity": 1000
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Verify Shopping Cart Page Availability', () => {
    cy.request('https://contoso-traders-cartsctprd.bluestone-748d2276.eastus.azurecontainerapps.io/v1/ShoppingCart/loadtest')
      .then((response) => {
        expect(response.status).to.eq(200)
        const expectedCartItem = {
          "cartItemId": "406bbf1f-267e-4dd4-83c7-f382e92aed08",
          "email": "testuser@contosotraders.com",
          "productId": 17,
          "name": "Dell Optiplex 380 17 inch (43.18 cms) Desktop",
          "price": 1399,
          "imageUrl": "https://contoso-traders-imagesctprod.azureedge.net/product-details/PID17-1.jpg",
          "quantity": 1
        }
        expect(response.body).to.deep.eq([expectedCartItem]);
      })
  })
})

describe('UI tests', () => {
  it('url check', () => {
    cy.visit('https://cloudtesting.contosotraders.com/')
  })

  it('h1', () => {
    cy.visit('https://cloudtesting.contosotraders.com/')
    cy.get('.LapHead').should('have.text', 'MICROSOFT LAPTOPS')
    cy.get('h1').should('have.text', 'Play more, wait less')
  })

  it('Nav cart', () => {
    cy.visit('https://cloudtesting.contosotraders.com/')
    cy.get('.secondary-nav__cart > .MuiButtonBase-root > .MuiBadge-root > img').should('exist')
    cy.get('.secondary-nav__login > .MuiButtonBase-root').should('be.visible')
    cy.get('.secondary-nav > .u-empty').should('have.class', 'u-empty')
  })

  it('image', () => {
    cy.visit('https://cloudtesting.contosotraders.com/')
    cy.get('.content-section > .MuiButtonBase-root').should('be.visible')
    cy.get('.MuiInputBase-root').should('exist')
    cy.get('.lapsecimage').should('have.attr', 'src')
  })

  it('My Cart', () => {
    cy.visit('https://cloudtesting.contosotraders.com/')
    cy.get('.secondary-nav__cart > .MuiButtonBase-root > .MuiBadge-root > img').click()
    cy.url().should('eq', 'https://cloudtesting.contosotraders.com/cart')
    cy.get('.CartTopHeadPart').should('have.text', 'My Cart')
  })
})