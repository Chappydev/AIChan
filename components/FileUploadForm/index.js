import { UploadFileRounded } from "@mui/icons-material";
import React from "react";
import s from './FileUploadForm.module.scss';

function extractSources(files) {
  let subtitleFiles = [];
  let videoFile = undefined;

  for (let i = 0; i < files.length; ++i) {
    const f = files[i];
    const extensionStartIndex = f.name.lastIndexOf('.');

    if (extensionStartIndex === -1) {
      throw new Error('Unable to determine extension of ' + f.name);
    }

    const extension = f.name.substring(extensionStartIndex + 1, f.name.length);
    switch (extension) {
      case 'ass':
      case 'srt':
      case 'vtt':
        subtitleFiles.push(f);
        break;
      case 'mkv':
      case 'mp4':
      case 'avi':
        if (videoFile) {
          throw new Error('Cannot open two video files simultaneously');
        }
        videoFile = f;
        break;
      default:
        throw new Error('Unsupported extension ' + extension);
    }
  }

  return { subtitleFiles: subtitleFiles, videoFile: videoFile };
}

const FileUploadForm = ({ handleSources }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const sources = extractSources(files);
      handleSources(sources);
    }
  };

  return (
    <form>
      <label className={s.customFileUpload}>
        <input type="file" accept=".ass, .srt, .vtt, .mkv, .mp4, .avi" multiple hidden onChange={handleFileChange} />
        <UploadFileRounded fontSize="large" />
      </label>
    </form>
  );
};

export default FileUploadForm;
