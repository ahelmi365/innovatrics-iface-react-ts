import type { CallbackImage } from "@innovatrics/dot-document-auto-capture";
import type { FaceCallback } from "@innovatrics/dot-face-auto-capture";
import {
  dispatchControlEvent,
  FaceCustomEvent,
  ControlEventInstruction,
} from "@innovatrics/dot-face-auto-capture/events";
import { useCallback, useState } from "react";
import FaceAutoCapture from "./components/FaceAutoCapture";
import PhotoResult from "./components/PhotoResult";
// css
import "./styles/index.css";

interface Props {
  btnBackground: string;
  btnColor: string;
}
function App({ btnBackground = "#00bfb2", btnColor = "white" }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoBase64, setPhotoBase64] = useState<string>("");
  console.log({ photBase64: photoBase64 });
  const convertBlobToBase64 = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64String = reader.result as String;
      setPhotoBase64(base64String.split(",")[1]);
    };
  };

  const handlePhotoTaken = <T,>(
    imageData: CallbackImage<T>,
    content?: Uint8Array,
  ) => {
    const imageUrl = URL.createObjectURL(imageData.image);
    setPhotoUrl(imageUrl);

    convertBlobToBase64(imageData.image);
  };

  const handleFaceCapturePhotoTaken: FaceCallback = (imageData, content) => {
    handlePhotoTaken(imageData, content);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleContinueDetection = () => {
    setPhotoUrl("");
    setPhotoBase64("");
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION,
    );

    setIsButtonDisabled(true);
  };

  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div>
          <button
            className="btn-capture-photo"
            onClick={handleContinueDetection}
            disabled={isButtonDisabled}
            style={{ background: btnBackground, color: btnColor }}
            type="button"
          >
            Capture New Photo
          </button>
        </div>
        <div className="col-6">
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            onError={handleError}
            setPhotoUrl={setPhotoUrl}
            setPhotoBase64={setPhotoBase64}
            isButtonDisabled={isButtonDisabled}
            setIsButtonDisabled={setIsButtonDisabled}
          />
        </div>
        <div className="col-6">
          {photoUrl && <PhotoResult photoUrl={photoUrl} />}
        </div>
      </div>
    </div>
  );
}

export default App;
