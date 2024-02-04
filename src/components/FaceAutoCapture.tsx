import type {
  FaceCallback,
  FaceComponentData,
} from "@innovatrics/dot-face-auto-capture";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/index.module.css";
import buttonStyles from "../styles/button.module.css";
import FaceCamera from "./FaceCamera";
import FaceUi from "./FaceUi";

interface Props {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  setPhotoUrl: Dispatch<SetStateAction<string>>;
  setPhotoBase64: Dispatch<SetStateAction<string>>;
  isButtonDisabled: boolean;
  setIsButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

function FaceAutoCapture({
  onPhotoTaken,
  onError,
  isButtonDisabled,
  setIsButtonDisabled,
  setPhotoUrl,
  setPhotoBase64,
}: Props) {
  const handlePhotoTaken: FaceCallback = async (imageData, content) => {
    setIsButtonDisabled(false);
    onPhotoTaken(imageData, content);
  };

  return (
    <div className="iface-camera-container">
      {isButtonDisabled && (
        <FaceCamera
          cameraFacing="user"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
      )}
      <FaceUi showCameraButtons />
    </div>
  );
}

export default FaceAutoCapture;
