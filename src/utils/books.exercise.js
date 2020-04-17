// 🐨 get useQuery from react-query
// 🐨 get the booksClient from './books-client'

// 💰 you'll use this as a fallback for while the book search is loading
// import {loadingBook} from './book-placeholder'
// const loadingBooks = Array.from({length: 10}, (v, index) => ({
//   id: `loading-book-${index}`,
//   ...loadingBook,
// }))

// 🐨 create a searchBooks function for the useBookSearch hook you'll write.
// 💰 here's the function signature: searchBooks(queryKey, {query})
// 🐨 return a call to booksClient.search({query}).then(data => data.books)

// 🐨 create a useBookSearch hook that accepts a query (the user's typed search)
// it should call useQuery with a queryKey of ['bookSearch', {query}] and the
// queryFn set to the searchBooks function you wrote above
// then return the result + a books property set to result.data or the loadingBooks
// 💰 {...result, books: result.data ?? loadingBooks}

// 🐨 create a getBook function for the useBook hook you'll write
// 💰 here's the function signature getBook(queryKey, {bookId})
// 🐨 return a call to booksClient.read(bookId).then(data => data.book)

// 🐨 create a useBook function that accepts a bookId
// it should call useQuery and the queryKey should be ['book', {bookId}] and
// the queryFn should be set to the getBook function you created above
// then return the result.data ?? loadingBook

// 🐨 export useBook and useBookSearch
