import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('add new blog', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector(".title-input")
    const authorInput = container.querySelector(".author-input")
    const urlInput = container.querySelector(".url-input")
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'testing a form title')
    await user.type(authorInput, 'testing a form author')
    await user.type(urlInput, 'http://testing-a-form-url.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'testing a form title',
        author: 'testing a form author',
        url: 'http://testing-a-form-url.com',
    })
})