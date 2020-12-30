import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'A',
        url: 'http://url.com/randomurl',
        likes: 0
    }
    const mockLikeHandler = jest.fn()
    const mockDelHandler = jest.fn()
    let component
    beforeEach(()=>{
        component = render(
            <Blog blog={blog} onClickLike={mockLikeHandler} onClickDel={mockDelHandler}/>
        )
    })
    test('renders title by default, but no url or number of likes ', () => {
        expect(component.container.querySelector('.blogItem>span.title')).toHaveTextContent(blog.title)
        expect(component.container.querySelector('.blogItem>.url')).toBeDefined()
        expect(component.container.querySelector('.blogItem>.likes')).toBeDefined()
        expect(component.container.querySelector('.blogItem>.author')).toBeDefined()
        expect(component.container.querySelector('.blogItem>.btnDelete')).toBeDefined()
    })

    test('renders all information when view button is clicked',()=>{
        const button = component.container.querySelector('.toggleButton.show')
        fireEvent.click(button)
        expect(component.container.querySelector('.blogItem>.url')).toHaveTextContent(blog.url)
        expect(component.container.querySelector('.blogItem>.likes')).toHaveTextContent(blog.likes)
        expect(component.container.querySelector('.blogItem>.author')).toHaveTextContent(blog.author)
        expect(component.container.querySelector('.blogItem>.btnDelete')).toBeVisible()
    })

    test('event handler passed as a prp twice if the like button clicked twice',()=>{
        const button = component.container.querySelector('.toggleButton.show')
        fireEvent.click(button)

        const like = component.container.querySelector('.likes>button')
        fireEvent.click(like)
        fireEvent.click(like)

        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})