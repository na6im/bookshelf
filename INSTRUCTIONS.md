# Cache Management

## Background

Application state management is arguably one of the hardest problems in
application development. This is evidenced by the myriad of libraries available
to accomplish it. In my experience, the issue is made even more challenging by
overengineering, pre-mature abstraction, and lack of proper categorizing of
state.

State can be lumped into two buckets:

1. UI state: Modal is open, item is highlighted, etc.
2. Server cache: User data, tweets, contacts, etc.

A great deal of complexity comes when people attempt to lump these two distinct
types of state together. When this is done, UI state which should not be global
is made global because Server cache state is typically global so it naturally
causes us to just make everything global. It's further complected by the fact
that caching is one of the hardest problems in software development in general.

We can drastically simplify our UI state management if we split out the server
cache into something separate.

A fantastic solution for managing the server cache on the client is
[`react-query`](https://github.com/tannerlinsley/react-query). It is a set of
React hooks that allow you to query, cache, and mutate data on your server in a
way that's flexible to support many use cases and optimizations but opinionated
enough to provide a huge amount of value. And thanks to the power of hooks, we
can build our own hooks on top of those provided to keep our component code
really simple.

Here are a few examples of how you can use react-query that are relevant for our
exercise:

```javascript
function readTweet(queryKey, {tweetId}) {
  return tweetClient.read(tweetId).then(data => data.tweet)
}

function App({tweetId}) {
  const result = useQuery({
    queryKey: ['tweet', {tweetId}],
    queryFn: readTweet,
  })
  // result has several properties, here are a few relevant ones:
  //   status
  //   data
  //   error
  //   isLoading
  //   isError
  //   isSuccess

  const [removeTweet, state] = useMutation(() => tweetClient.remove(tweetId))
  // call removeTweet when you want to execute the mutation callback
  // state has several properties, here are a few relevant ones:
  //   status
  //   data
  //   error
  //   isLoading
  //   isError
  //   isSuccess
}
```

📜 here are the docs:

- `useQuery`:
  https://github.com/tannerlinsley/react-query/blob/61d0bf85a37b7369067433a68e310bc1a6c23558/README.md#usequery
- `useMutation`:
  https://github.com/tannerlinsley/react-query/blob/61d0bf85a37b7369067433a68e310bc1a6c23558/README.md#usemutation

That should be enough to get you going.

## Exercise

👨‍💼 Our users are anxious to get going on their reading lists. Several already
have some books picked out! We've got the backend and the UI all ready to go.
Your co-worker 🧝‍♀️ even created a `list-items-client.js` for you to interact with
the list items data. Now you need to wire up our UI with that client and we'll
be good to go.

This stuff touches a lot of files, but I'm confident that you can get this
working. Good luck!

### Files

- `src/utils/books.js`
- `src/utils/list-items.js`
- `src/utils/api-client.js`
- `src/components/status-buttons.js`
- `src/components/rating.js`
- `src/components/book-row.js`
- `src/screens/discover.js`
- `src/screens/book.js`
- `src/components/list-item-list.js`,

## Extra Credit

### 1. 💯 Wrap the <App /> in a <ReactQueryConfigProvider />

In the `./src/index.js` file, create a queryConfig object here and enable
`useErrorBoundary` and disable `refetchAllOnWindowFocus`

📜 Learn more about error boundaries:
https://reactjs.org/docs/error-boundaries.html

📜 Learn more about query config:
https://github.com/tannerlinsley/react-query/blob/61d0bf85a37b7369067433a68e310bc1a6c23558/README.md#reactqueryconfigprovider

```javascript
const queryConfig = {
  /* your global config */
}

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
    <App />
  </ReactQueryConfigProvider>,
  document.getElementById('root'),
)
```

**Files:**

- `src/index.js`

### 2. 💯 Handle mutation errors properly

Currently, if there's an error during a mutation, we don't show the user
anything. Instead, we should show the error message to the user. You'll need to
pass this to `useMutation` in the `./src/utils/list-items.js` module as the
second argument:

```javascript
const defaultMutationOptions = {
  useErrorBoundary: false,
  throwOnError: true,
}
```

But you may need to disable `throwOnError` in some cases, so have those custom
hooks accept some options and merge the `defaultMutationOptions` with the
options you receive.

For example, the `<NotesTextarea />` component in `./src/screens/book.js` will
need to pass `{throwOnError: false}` and instead it will use the `error` that
comes from `useMutation` to display the error inline. You can use this UI:

```javascript
{
  error ? (
    <span role="alert" css={{color: colors.danger, fontSize: '0.7em'}}>
      <span>There was an error:</span>{' '}
      <pre
        css={{
          display: 'inline-block',
          overflow: 'scroll',
          margin: '0',
          marginBottom: -5,
        }}
      >
        {error.message}
      </pre>
    </span>
  ) : null
}
```

**Files:**

- `src/utils/lit-items.js`
- `src/screens/book.js`

### 3. 💯 Add a loading spinner for the notes

If you made it this far, then you're a real champ. I'm going to let you figure
this one out on your own. Try to add an inline loading spinner to the notes in
`src/screens/book.js`.

**Files:**

- `src/screens/book.js`

### 4. 💯 Prefetch the book search query

Right now, open up the app and do this:

1. Go to the discover page.
2. Add the first book that comes back to your list (without typing in the
   search)
3. Click that book
4. Click the back button
5. Notice that the book you added is in the search results for a moment and then
   disappears.

The reason this happens is because react-query has cached our search for an
empty string and when the user returns to this page they're looking at cached
results. However, the server will respond with only books that are _not_ in the
user's reading list already. So while we're looking at the stale data,
react-query validates that stale data, finds that the data was wrong and we get
an update.

This isn't a great user experience. There are various things we can do to
side-step this. We could clear the react-query cache (something worth trying if
you want to give that a go, be my guest!). But instead, what we're going to do
is when the user leaves the discover page, we'll trigger a refetch of that query
so when they come back we have the search pre-cached and the response is
immediate.

To do this, you'll need a `refetchBookSearchQuery` function in the `books.js`
util and a effect cleanup that calls this utility in the `discover.js`
component.

📜 You'll want to use `react-query`'s `queryCache.prefetchQuery` and
`queryCache.removeQueries` functions:

- https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycacheremovequeries
- https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycacheprefetchquery

**Files:**

- `src/utils/books.js`
- `src/screens/discover.js`

### 5. 💯 Add books to the query cache

Right now, open up the app and do this:

1. Go to the discover page.
2. Click any book.
3. Notice that there's a loading state while we're loading the book's
   information

One thing you might notice about this is that we actually have all the data we
need already from the search results page! There's no reason to load the book
data. The problem is that the discover page is caching book search results and
the book page is trying to get books from the cache by a different query key.

You'll notice this same problem if you add a book to your reading list, then
refresh and click on that list item. You should have everything you need
already, but the query cache wasn't populated properly.

There are a few ways we could solve this, but the easiest is to just leave our
queries as they are and pre-populate the query cache with the books as we get
them. So when the search for books is successful, we can take the array of books
we get back and push them into the query cache with the same query key we use to
retrieve them out of the cache for the book page.

To do this, we can add a `.then` to our `searchBooks` function, or, probably
easier, we can add an `onSuccess` handler to our query config. We'll want to do
something similar for the list items (because the book data comes back with the
list item as well). Try to figure that out.

💰 You may find it helpful to create a `setQueryDataForBook` function in
`src/utils/books.js` and export that so you can use that function in
`src/utils/list-items.js`

📜 Here are some docs you might find helpful:

- `queryCache.setQueryData`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycachesetquerydata
- `config.onSuccess`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#usequery

**Files:**

- `src/utils/books.js`
- `src/utils/list-items.js`

### 6. 💯 Add optimistic updates and recovery

What percent of mutation requests (requests intended to make a change to data)
in your app are successful? 50%? 70%? 90%? 99%? I would argue that the vast
majority of requests users make in your apps are successful (if not, then you
have other problems to deal with... like annoyed users). With that in mind,
wouldn't it make sense to assume that the request is going to succeed and make
the UI appear as if it had? Successful until proven otherwise?

This pattern is called "Optimistic UI" and it's a great way to make users feel
like your app is lightning fast. Unfortunately it often comes with a lot of
challenges primarily due to race-conditions. Luckily for us, `react-query`
handles all of that and makes it really easy for us to change the cache directly
and then restore it in the event of an error.

Let's make our list items optimistically update when the user attempts to make
changes. You'll know you have it working when you mark a book as read and the
star rating shows up instantly. Or if you add a book to your reading list and
the notes textarea shows up instantly.

📜 To make the proper changes to the list item mutations, you'll need to know
about the following things:

- `onMutate`, `onError` and `onSettled`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#usemutation
  (use `onMutate` to make your optimistic update, use `onError` to restore the
  original value, and use `onSettled` to trigger a refetch of all the
  `list-items` to be sure you have the very latest data). NOTE: What you return
  from `onMutate` will be the third argument received by `onError`.
- `queryCache.refetchQueries`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycacherefetchqueries
- `queryCache.getQueryData`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycachegetquerydata
  (to get the data you'll restore in the event of an error)
- `queryCache.setQueryData`:
  https://github.com/tannerlinsley/react-query/blob/7cabf53e4c7feceb122e7eda20f99ac6357931a9/README.md#querycachesetquerydata
  (to set it to the optimistic version of the data and to restore the original
  data if there's an error)
-

**Files:**

- `src/utils/list-items.js`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Build%20React%20Apps%20%F0%9F%93%98&e=06%3A%20Cache%20Management&em=
