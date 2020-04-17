import {useQuery, useMutation} from 'react-query'
import * as listItemsClient from './list-items-client'

function readListItems() {
  return listItemsClient.read().then(d => d.listItems)
}

function useListItems() {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: readListItems,
  })
  return listItems ?? []
}

function useListItem(bookId) {
  const listItems = useListItems()
  return listItems.find(li => li.bookId === bookId) ?? null
}

function useUpdateListItem() {
  return useMutation(updates => listItemsClient.update(updates.id, updates))
}

function useRemoveListItem() {
  return useMutation(({id}) => listItemsClient.remove(id))
}

function useCreateListItem() {
  return useMutation(({bookId}) => listItemsClient.create({bookId}))
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
