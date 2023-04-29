import React from "react";

const FileUploadForm = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileUpload(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // TODO: Add 'accept' property to limit file types
  return (
    <form>
      <input type="file" onChange={handleFileChange} />
    </form>
  );
};

export default FileUploadForm;
