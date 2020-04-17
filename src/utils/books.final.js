import {useQuery} from 'react-query'
import * as booksClient from './books-client'
import {loadingBook} from './book-placeholder'

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

function searchBooks(queryKey, {query}) {
  return booksClient.search({query}).then(data => data.books)
}

function useBookSearch(query) {
  const result = useQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: searchBooks,
  })
  return {...result, books: result.data ?? loadingBooks}
}

function getBook(queryKey, {bookId}) {
  return booksClient.read(bookId).then(data => data.book)
}

function useBook(bookId) {
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: getBook,
  })
  return data ?? loadingBook
}

export {useBook, useBookSearch}
