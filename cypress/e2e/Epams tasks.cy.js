describe('Task 1', () => {

  it('1) Check the title is correct', () => {
    cy.visit('https://www.epam.com/')
    cy.title().should('include', 'EPAM | Software Engineering & Product Development Services')
  })

  it('2) Check the ability to switch Light / Dark mode', () => {
    cy.visit('https://www.epam.com/')
    cy.get('body').should('have.class', 'dark-mode')
    cy.get(':nth-child(3) > .theme-switcher').click()
    cy.get('body').should('have.class', 'light-mode')
  })

  it('3) Check that allows changing language to UA', () => {
    cy.visit('https://www.epam.com/')
    cy.get('.location-selector__button > .location-selector__button-language').click()
    cy.get(':nth-child(6) > .location-selector__link').click()
    cy.on('uncaught:exception', (e) => {
      if (e.message.includes('Things went bad')) {
        return false
      }
    })
    cy.origin('https://careers.epam.ua', () => {
    })
  })

  it('4) Check the policies list', () => {
    cy.visit('https://www.epam.com/')
    const expectedPolicies = [
      'INVESTORS',
      'OPEN SOURCE',
      'PRIVACY POLICY',
      'COOKIE POLICY',
      'APPLICANT PRIVACY NOTICE',
      'WEB ACCESSIBILITY'
    ];
    cy.get('.policies-links-wrapper').invoke('text').should('include', ...expectedPolicies)
  })
  
  it('5) Check that allow to switch location list by region',()=>{
    cy.visit('https://www.epam.com/')
    cy.get('.tabs-23__title.active > .tabs-23__link').click()
    cy.get('.tabs-23__item.active > .locations-viewer > .locations-viewer-ui-23 > .locations-viewer-23__carousel > .owl-stage-outer > .owl-stage > .active > .locations-viewer-23__country').click()
    cy.get(':nth-child(2) > .tabs-23__link').click()
    cy.get(':nth-child(20) > .locations-viewer-23__country').click()
    cy.get(':nth-child(3) > .tabs-23__link').click()
    cy.get('.tabs-23__item.active > .locations-viewer > .locations-viewer-ui-23 > .locations-viewer-23__carousel > .owl-stage-outer > .owl-stage > :nth-child(8) > .locations-viewer-23__country').click()
  })

  it('6) Check the search function',()=>{
    cy.visit('https://www.epam.com/')
    cy.get('.search-icon').click()
    cy.get('#new_form_search').focus().type('AI{enter}')
    cy.get('.search-results__counter')
  })

  it("7) Chack form's fields validation",()=>{
    cy.visit('https://www.epam.com/about/who-we-are/contact')
    cy.get('.button-ui').click()
    cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name').should('have.attr', 'aria-invalid', 'true')
    cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name').should('have.attr', 'aria-invalid', 'true')
    cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email').should('have.attr','aria-invalid', 'true')
    cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone').should('have.attr','aria-invalid', 'true')
  })

  it('8) Check tha the Company logo on the header lead to the main page',()=>{
    cy.visit('https://www.epam.com/about')
    cy.get('.desktop-logo > .header__logo-light').click()
    cy.url().should('eq', 'https://www.epam.com/')
  })

  it('9) Check that allows to download report', () => {

    cy.visit('https://www.epam.com/about')
    cy.get('.colctrl__holder > .button > .button__wrapper > .button-ui-23 > .button__inner').click()
    cy.wait(5000)
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const expectedFileName = 'EPAM_Corporate_Overview_Q3_october.pdf'
      expect(files).to.include(expectedFileName)
      files.forEach((file) => {
      expect(file).to.equal(expectedFileName)
      })
    })
  })
})

describe('Task 2', () => {

  it('Verify that allows register a User', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.header-links > ul > :nth-child(1)').click()
    cy.get('#gender-male').click()
    cy.get('#FirstName').focus().type('John')
    cy.get('#LastName').focus().type('Dou')
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('#ConfirmPassword').focus().type('123456')
    cy.get('#register-button').click()
  })

  it('Verify that allows login a User', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.header-links > ul > :nth-child(2)').click()
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('form > .buttons > .button-1').click()
  })

  it("Verify that ‘Computers’ group has 3 sub-groups with correct names", () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.top-menu > :nth-child(2) > [href="/computers"]').click()
    cy.get('.current-item').should('have.text', 'Computers')
    cy.get('.sub-category-item').should('have.length', 3).each(($subCategory, index) => {
      if (index === 0) {
        expect($subCategory.text()).to.match(/Desktops/)
      } else if (index === 1) {
        expect($subCategory.text()).to.match(/Notebooks/)
      } else if (index === 2) {
        expect($subCategory.text()).to.match(/Accessories/)
      }
    })
  })

  it("Verify that allows sorting items (different options)", () => {
    cy.visit('https://demowebshop.tricentis.com/books')
    cy.get('#products-orderby').select('Price: Low to High')
    cy.get(':nth-child(1) > .product-item > .details > .product-title > a').should('have.text','Computing and Internet')
    cy.get(':nth-child(1) > .product-item > .details > .add-info > .prices > .actual-price').should('have.text','10.00')
    cy.get('#products-orderby').select('Name: Z to A')
    cy.get(':nth-child(1) > .product-item > .details > .product-title > a').should('have.text','Science')
  })

  it('Verify that allows changing the number of items on the page', () => {
    cy.visit('https://demowebshop.tricentis.com/books')
    cy.get('#products-pagesize').select('4')
    cy.get('#products-pagesize').select('12')
    cy.get('#products-pagesize').select('8')
  })

  it('Verify that allows adding an item to the Wishlist', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.header-links > ul > :nth-child(2)').click()
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('form > .buttons > .button-1').click()
    cy.get('.top-menu > :nth-child(6)').click()
    cy.get(':nth-child(2) > .product-item > .details > .product-title > a').click()
    cy.get('#add-to-wishlist-button-14').click()
  })

  it('Verify that allows adding an item to the card', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.header-links > ul > :nth-child(2)').click()
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('form > .buttons > .button-1').click()
    cy.get('.top-menu > :nth-child(6)').click()
    cy.get(':nth-child(2) > .product-item > .details > .product-title > a').click()
    cy.get('#add-to-cart-button-14').click()
  })  

  it('Verify that allows removing an item from the card', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.header-links > ul > :nth-child(2)').click()
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('form > .buttons > .button-1').click()
    cy.get('.top-menu > :nth-child(6)').click()
    cy.get(':nth-child(2) > .product-item > .details > .product-title > a').click()
    cy.get('#add-to-cart-button-14').click()
    cy.get('#topcartlink').click()
    cy.get('.remove-from-cart > input').click()
    cy.get('.update-cart-button').click()
  })

  it('Verify that allows checkout an item ', () => {
    cy.visit('https://demowebshop.tricentis.com/');
    cy.get('.header-links > ul > :nth-child(2)').click()
    cy.get('#Email').focus().type('111+1@gmail.com')
    cy.get('#Password').focus().type('123456')
    cy.get('form > .buttons > .button-1').click()
    cy.get('.top-menu > :nth-child(6)').click()
    cy.get(':nth-child(2) > .product-item > .details > .product-title > a').click()
    cy.get('#add-to-cart-button-14').click()
    cy.get('#topcartlink').click()
    cy.get('.remove-from-cart > input').click()
    cy.get('#CountryId').select('Ukraine')
    cy.get('#termsofservice').click()
    cy.get('#checkout').click()
  })   
})


describe('Task 3', () => {
  it('Verify that allows creating a User', () => {
    cy.request({
    method: 'POST',
    url: 'https://petstore.swagger.io/v2/user',
    body:   {
      "id": 100,
      "username": "my pep",
      "firstName": "Tetiana",
      "lastName": "Halina",
      "email": "qwery@emai.com",
      "password": "Qq12345",
      "phone": "",
      "userStatus": 5
      }
    }).then((response) => {
    expect(response.status).to.eq(200)
    })
    cy.request({
    method: 'GET',
    url: 'https://petstore.swagger.io/v2/user/my%20pep',
    }).then((getUserResponse) => {
    expect(getUserResponse.status).to.eq(200)
    expect(getUserResponse.body.username).to.eq('my pep')
    expect(getUserResponse.body.email).to.eq('qwery@emai.com')
    })
  })

  it('Verify that allows login as a User',()=>{
    cy.request({
      method: 'Get',
      url: 'https://petstore.swagger.io/v2/user/login?username=my%20pep&password=Qq12345',
      body: {
        'username': 'my pep',
        'password': 'Qq12345'
        }
    }).then((response) => {
    expect(response.status).to.eq(200)
    })
  })

  it('Verify that allows creating the list of Users', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user/createWithList',
      body: [
        {
          "id": '31',
          "username": "32",
          "firstName": "33",
          "lastName": "34",
          "email": "35",
          "password": "36",
          "phone": "37",
          "userStatus": 3
        },
        {
          "id": '41',
          "username": "42",
          "firstName": "43",
          "lastName": "44",
          "email": "45",
          "password": "46",
          "phone": "47",
          "userStatus": 4
        }
      ]
    }).then((response) => {
      expect(response.status).to.eq(200)
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/user/32',
    }).then((getUserResponse) => {
      expect(getUserResponse.status).to.eq(200)
      expect(getUserResponse.body.username).to.eq('32')
      expect(getUserResponse.body.email).to.eq('35')
    });
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/user/42',
    }).then((getUserResponse) => {
      expect(getUserResponse.status).to.eq(200)
      expect(getUserResponse.body.username).to.eq('42')
      expect(getUserResponse.body.email).to.eq('45')
      })
    })
  })

  it('Verify that allows Log out User', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/user/logout'
    }).then((logoutResponse) => {
      expect(logoutResponse.status).to.eq(200)
      })
    })

  it('Verify that allows adding a new Pet', () => {
    cy.request({
      method: 'Post',
      url: 'https://petstore.swagger.io/v2/pet',
      body:{
        "id": 5,
        "category": {
          "id": 55,
          "name": "dog"
        },
        "name": "doggies",
        "photoUrls": ['https://demowebshop.tricentis.com/content/images/thumbs/0000131_health-book_125.jpeg'],
        "tags": [{
          "id": 555,
          "name": "pes"
          }],
        "status": "available"
        }
    }).then((logoutResponse) => {
      expect(logoutResponse.status).to.eq(200)
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/5',
    }).then((getUserResponse) => {
      expect(getUserResponse.status).to.eq(200)
      expect(getUserResponse.body.name).to.eq('doggies')
      expect(getUserResponse.body.id).to.eq(5)
      })
    })
  })

  it("Verify that allows updating Pet’s image", () => {
    cy.request({
      method: 'put',
      url: 'https://petstore.swagger.io/v2/pet',
      body: {
        "id": 5,
        "category": {
          "id": 55,
          "name": "dog"
        },
        "name": "doggies",
        "photoUrls": ['https://demowebshop.tricentis.com/content/images/thumbs/0000172_build-your-own-cheap-computer_125.jpeg', 'https://demowebshop.tricentis.com/content/images/thumbs/0000131_health-book_125.jpeg'],
        "tags": [{
          "id": 555,
          "name": "pes"
          }],
        "status": "available"
      }
    }).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200)
        cy.request({
          method: 'GET',
          url: 'https://petstore.swagger.io/v2/pet/5',
        }).then((getUserResponse) => {
        expect(getUserResponse.status).to.eq(200);
        expect(getUserResponse.body.name).to.eq('doggies')
        expect(getUserResponse.body.id).to.eq(5);
        expect(getUserResponse.body.photoUrls).to.deep.equal([
        'https://demowebshop.tricentis.com/content/images/thumbs/0000172_build-your-own-cheap-computer_125.jpeg',
        'https://demowebshop.tricentis.com/content/images/thumbs/0000131_health-book_125.jpeg'
        ])
      })
    })
  })
    
  it("•	Verify that allows updating Pet’s name and status", () => {
    cy.request({
      method: 'put',
      url: 'https://petstore.swagger.io/v2/pet',
      body: {
          "id": 5,
          "category": {
            "id": 55,
            "name": "dog"
          },
          "name": "pesPatron",
          "photoUrls": ['https://demowebshop.tricentis.com/content/images/thumbs/0000172_build-your-own-cheap-computer_125.jpeg', 'https://demowebshop.tricentis.com/content/images/thumbs/0000131_health-book_125.jpeg'],
          "tags": [{
            "id": 555,
            "name": "pes"
          }],
          "status": "disabled"
        }
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200)
    
      cy.request({
        method: 'GET',
        url: 'https://petstore.swagger.io/v2/pet/5',
      }).then((getUserResponse) => {
        expect(getUserResponse.status).to.eq(200);
        expect(getUserResponse.body.name).to.eq('pesPatron')
        expect(getUserResponse.body.id).to.eq(5)
        expect(getUserResponse.body.status).to.deep.equal('disabled')
      })
    })
  })
      
  it("Verify that allows deleting Pet", () => {
    cy.request({
      method: 'DELETE',
      url: 'https://petstore.swagger.io/v2/pet/5',
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200)
    })
  })   
})