import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog.jsx'

test('renders title and author but not URL or likes by default', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: { username: 'cristina' }
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('React patterns Michael Chan')
    expect(element).toBeDefined()

    expect(screen.queryByText('https://reactpatterns.com/')).toBeNull()
    expect(screen.queryByText('likes 7')).toBeNull()
})
  

test('click view button shows URL and likes', async () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: { username: 'cristina' }
    }
  
    const mockHandler = vi.fn()
    const user = userEvent.setup()
  
    render(<Blog blog={blog} />)
  
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText('https://reactpatterns.com/')).toBeDefined()
    expect(screen.queryByText('likes 7')).toBeDefined()
})


test('click like button twice calls event handler twice', async () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: { username: 'cristina' }
    }
    
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} updateBlog={mockHandler} />)

    const viewButton = screen.getByText('view')
    user.click(viewButton)

    const likeButton = screen.getByText('likes')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
  
