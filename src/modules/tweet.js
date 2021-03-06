import React from "react";


function Tweet(props) {
  return (
    <article key={props.key} index={props.index}>
      <img src={props.image} alt="profile"/>
      <div>
        <h2>{props.name}</h2>
        <h4>{props.created_at}</h4>
        <p>{props.text}</p>
      </div>
    </article>
  )
}


export default Tweet