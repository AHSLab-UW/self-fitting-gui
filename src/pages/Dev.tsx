import React from 'react'
import { sendCommand } from '../Command';

export default function Dev() {
  return (
    <>
      <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          command: { value: string };
        };
        sendCommand(target.command.value);
      }}>
        <input type="text" name="command"/>
        <button type="submit">Send</button>
      </form>
    </>
  )
}
