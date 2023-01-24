import React from 'react'

export default function Dev() {
  return (
    <>
      <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          command: { value: string };
        };
        fetch(`/device?command=${target.command.value}`)
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
      }}>
        <input type="text" name="command"/>
        <button type="submit">Send</button>
      </form>
    </>
  )
}
