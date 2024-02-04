import styles from "../styles/index.module.css";

interface Props {
  photoUrl?: string;
}

function PhotoResult({ photoUrl = "" }: Props) {
  return (
    <div className="iface-camera-container">
      <img alt="Web component result" src={photoUrl} />
    </div>
  );
}

export default PhotoResult;
