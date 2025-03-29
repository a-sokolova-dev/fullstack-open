import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Author Name',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser'
    }
  }

  const user = {
    id: '123',
    username: 'testuser'
  }

  it('renders title and author, but not url or likes by default', () => {
    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        user={user}
      />
    )

    expect(screen.getByText(/Test Blog Title Author Name/i)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(/likes 5/i)).toBeNull()
  })

  it('shows url and likes when "view" button is clicked', async () => {
    const userSim = userEvent.setup()
    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        user={user}
      />
    )

    const viewButton = screen.getByText('view')
    await userSim.click(viewButton)

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(/likes 5/i)).toBeDefined()
  })

  it('calls handleLike twice when like button is clicked twice', async () => {
    const mockHandleLike = vi.fn()
    const userSim = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        handleDelete={() => {}}
        user={user}
      />
    )

    const viewButton = screen.getByText('view')
    await userSim.click(viewButton)

    const likeButton = screen.getByText('like')
    await userSim.click(likeButton)
    await userSim.click(likeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
  })
})
