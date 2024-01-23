import React from "react";

function Pdf_Reader({ file_name }) {
  return (
    <div className="container">
      <iframe
        // src="https://drive.google.com/file/d/1tG-1bxHYzWtCNlwO1F6p9o6vTX9mNfW8/preview"
        src={`https://hrm.dtselife.com/uploads/cvs/${file_name}.pdf`}
        width="100%"
        height="600px"
        allow="autoplay"
      ></iframe>
    </div>
  );
}

export default Pdf_Reader;
