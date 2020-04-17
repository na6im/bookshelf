import {useQuery, queryCache} from 'react-query'
import * as booksClient from './books-client'
import {loadingBook} from './book-placeholder'

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

function searchBooks(queryKey, {query}) {
  return booksClient.search({query}).then(data => data.books)
}

const getBookSearchConfig = query => ({
  queryKey: ['bookSearch', {query}],
  queryFn: searchBooks,
})

function useBookSearch(query) {
  const result = useQuery(getBookSearchConfig(query))
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

async function refetchBookSearchQuery() {
  queryCache.removeQueries('bookSearch')
  await queryCache.prefetchQuery(getBookSearchConfig(''))
}

export {useBook, useBookSearch, refetchBookSearchQuery}
