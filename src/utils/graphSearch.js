// graphSearch.js

import {gql} from 'apollo-boost'

export const GET_BOOK_BY_TITLE = gql`
  query($title: String!) {
  bookByTitle(title: $title) {
    id
    title
    IBSN
    author
    tag
    description
    price
    rating
    in_stock
    quantity
    image
  }
}

`;
