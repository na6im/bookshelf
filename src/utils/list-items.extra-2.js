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

const defaultMutationOptions = {
  useErrorBoundary: false,
  throwOnError: true,
}

function useUpdateListItem(options) {
  return useMutation(updates => listItemsClient.update(updates.id, updates), {
    ...defaultMutationOptions,
    ...options,
  })
}

function useRemoveListItem(options) {
  return useMutation(({id}) => listItemsClient.remove(id), {
    ...defaultMutationOptions,
    ...options,
  })
}

function useCreateListItem(options) {
  return useMutation(({bookId}) => listItemsClient.create({bookId}), {
    ...defaultMutationOptions,
    ...options,
  })
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
