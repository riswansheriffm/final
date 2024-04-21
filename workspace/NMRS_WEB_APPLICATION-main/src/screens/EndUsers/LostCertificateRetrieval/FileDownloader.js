import { useEffect, useState } from "react";

const FileDownloader = ({
  fileObj,
  children,
  onMouseEnter,
  className,
  onMouseLeave,
}) => {
  const [file, setFile] = useState(fileObj || null);

  const handleDownload = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

export default FileDownloader;
