import './Button.css'

interface Props {
    title: string
}

export default function Button({title}: Props) {
  return (
    <div>
        <button className="coolButton" type="button" value="Submit">{title}</button>
        </div>
  )
}


