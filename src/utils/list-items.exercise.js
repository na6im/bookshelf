// 🐨 get useQuery and useMutation from 'react-query'
// 🐨 get the listItemsClient from './list-items-client'

// 🐨 create a readListItems function that accepts no arguments and simply
// returns a call to listItemsClient.read().then(d => d.listItems)
// this will be your queryFn for the useListItems hook

// 🐨 create a useListItems custom hook that calls useQuery with the
// queryKey set to 'list-items' and the queryFn set to the readListItems function
// you just wrote.
// It should return the data if it exists or [] if not.

// 🐨 create a useListItem custom hook that accepts a bookId
// and calls useListItems to get all the listItems. If there are listItems
// returned, it searches through them to find a list item with that given bookId,
// otherwise it returns null.
// 💰 listItems.find(li => li.bookId === bookId) ?? null

// 🐨 create a useUpdateListItem hook that returns a call to useMutation
// and passes a mutation function that calls listItemsClient.update:
// 💰 updates => listItemsClient.update(updates.id, updates)

// 🐨 create a useRemoveListItem hook that returns a call to useMutation
// and passes a mutation function that calls listItemsClient.remove:
// 💰 ({id}) => listItemsClient.remove(id)

// 🐨 create a useCreateListItem hook that returns a call to useMutation
// and passes a mutation function that calls listItemsClient.create:
// 💰 ({bookId}) => listItemsClient.create({bookId})

// 🐨 export all the hooks
