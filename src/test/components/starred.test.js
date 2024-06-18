import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils'
import App from '../../App'


beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

it('click on star for a film', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const starredLink = screen.getAllByTestId('starred-link')[0]
    await waitFor(() => {
        expect(starredLink).toBeInTheDocument()
    })
    await userEvent.click(starredLink)

})

it('unclick star a on starred film', async () => {
  renderWithProviders(<App />)

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const starredLink = screen.getAllByTestId('starred-link')[0]
  await waitFor(() => {
      expect(starredLink).toBeInTheDocument()
  })
  await userEvent.click(starredLink)

  const unstarredLink = screen.getAllByTestId('unstar-link')[0]
  await waitFor(() => {
    expect(unstarredLink).toBeInTheDocument()
})
await userEvent.click(unstarredLink)

})