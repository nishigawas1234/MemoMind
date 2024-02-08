import React from 'react'

export default function Button(props) {
    console.log(props,"props")
  return (
    <button>{props.name}</button>
  )
}
