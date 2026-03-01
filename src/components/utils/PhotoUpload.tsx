import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

type PhotoUploadProps = {
  onSuccess: (url: string) => void;
};

export default function PhotoUpload(props: PhotoUploadProps) {
  return (
    <div className="upload-container self-center">
      <FileUploaderRegular
        useCloudImageEditor={false}
        sourceList="local"
        cdnCname={import.meta.env.VITE_UPLOADCARE_CDN_CNAME}
        pubkey={import.meta.env.VITE_UPLOADCARE_PUBKEY}
        classNameUploader="uc-light"
        imgOnly={true}
        accept=".png,.jpg,.jpeg"
        multiple={false}
        onFileUploadSuccess={(e) => {
          if (e.cdnUrl) {
            props.onSuccess(e.cdnUrl);
          }
        }}
      />
    </div>
  );
}
