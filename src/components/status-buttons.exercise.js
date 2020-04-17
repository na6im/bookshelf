/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
} from 'react-icons/fa'
import {FaTimesCircle} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// this is where we make most of the mutations for list items
// 🐨 get useListItem, useUpdateListItem, useRemoveListItem, and useCreateListItem
// from 'utils/list-items'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/use-async'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({book}) {
  // 🐨 assign listItem to a call to useListItem passing the book.id
  const listItem = null

  // 🐨 call useUpdateListItem and call the mutate function "update"
  // 💰 const [update] = useUpdateListItem()
  // 🐨 call useRemoveListItem and call the mutate function "remove"
  // 🐨 call useCreateListItem and call the mutate function "create"

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            // 🐨 add an onClick handler to update the list item's finishDate to null
            // which will mark the list item as unread
            // by calling update with ({id: listItem.id, finishDate: null})
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            // 🐨 add an onClick handler to update the list item's finishDate to "right now"
            // which will mark the list item as unread
            // by calling update with ({id: listItem.id, finishDate: Date.now()})
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          // 🐨 add an onClick handler to remove the list item by
          // calling remove with ({id: listItem.id})
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          // 🐨 add an onClick handler to create a list item by
          // calling create with ({bookId: book.id})
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
