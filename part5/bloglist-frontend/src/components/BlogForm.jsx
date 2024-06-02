import { useState } from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setURL('')
    }
    

    return (  
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                type="text"
                value={title}
                name="title"
                className='title-input'
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                type="author"
                value={author}
                name="author"
                className='author-input'
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                type="url"
                value={url}
                name="url"
                className='url-input'
                onChange={({ target }) => setURL(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}
 
export default BlogForm;