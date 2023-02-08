import Grid from '../components/Grid';
import '../styles/DragDrop.css';
import VideoPage from './VideoPage';

type Props = {}

export default function DragDrop({}: Props) {
  return (
    <div>
      <Grid />
      <VideoPage />
    </div>

  )
}