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

describe('Movie tests:',()=>{

  it('movies starred and saved to watch later', async () => {
    renderWithProviders(<App />)
    await new Promise((r) => setTimeout(r, 5000));

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const starMovieLink = screen.getAllByTestId('starred-link')[0]
    await waitFor(() => {
        expect(starMovieLink).toBeInTheDocument()
    })
    await userEvent.click(starMovieLink)
    await waitFor(() => {
      expect(screen.getByTestId('star-fill')).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
    })

    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)
    await waitFor(() => {
      expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
},30_000)


it('movies close movie details when clicked on', async () => {

  renderWithProviders(<App />)
  await new Promise((r) => setTimeout(r, 5000));
  
  const movieCard = screen.getAllByTestId('movie-card')[0]
  await userEvent.click(movieCard)
  const closeMovieDetailsButton = screen.getAllByTestId('close-card-details-button')[0]

  await waitFor(() => {
    expect(closeMovieDetailsButton).toBeInTheDocument()
})
await userEvent.click(closeMovieDetailsButton)


},30_000)


it('open movie trailer modal', async () => {

  renderWithProviders(<App />)
  await new Promise((r) => setTimeout(r, 5000));
  
  const watchTrailerButton = screen.getAllByTestId('watch-trailer-button')[0]
  await userEvent.click(watchTrailerButton)
  await new Promise((r) => setTimeout(r, 10000));

  const YoutubePlayer = screen.getAllByTestId('youtube-player')[0]
  await waitFor(() => {
    expect(YoutubePlayer).toBeInTheDocument()
})


},30_000)

})
