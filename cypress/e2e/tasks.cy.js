describe('tests for tasks: ', () => {


  it('movies are show in a grid ', () => {
    cy.visit('http://localhost:3000')
    cy.get('#movies').should('have.attr', 'class')
    .and('contain', 'movies-grid')

  })

    it('able to show a movie trailer in a modal ', () => {
      cy.visit('http://localhost:3000')

    // cy.contains('[id="movie-card-0"]')
    cy.get('[id="movie-card-0"]').contains('View Trailer').click()
    cy.get('[data-testid="youtube-player"]').should('be.visible')

  })

  it('infinite scroll shows next page of movies: ', () => {
    cy.visit('http://localhost:3000')

    cy.get('[id="movie-card-19"]').should('be.visible')
    // cy.get('[id="movie-card-20"]').should('not.be.visible')
    cy.get('[id="movie-card-20"]').should('not.exist');
    cy.get('[id="movie-card-19"]').scrollIntoView()
    cy.get('[id="movie-card-20"]', { timeout: 10000 }).should('be.visible');



})
})