import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  it('calls createBlog with correct data when form is submitted', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'React Testing')
    await user.type(authorInput, 'Kent C. Dodds')
    await user.type(urlInput, 'https://testing.dev')
    await user.click(sendButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'React Testing',
      author: 'Kent C. Dodds',
      url: 'https://testing.dev'
    })
  })
})

