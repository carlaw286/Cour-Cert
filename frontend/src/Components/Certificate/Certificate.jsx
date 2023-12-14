import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Certificate1.css";

export function Certificate({ userID, id, name, course, date, instructor }) {
  const certificateRef = useRef(null);
  console.log("course ID: " + id);
  console.log("USER ID: " + userID);
  
  
  const handleDownload = async () => {
    const certificateElement = certificateRef.current;

    if (certificateElement) {
      // Temporarily hide the download button
      const downloadButton =
        certificateElement.querySelector(".download-button");
      if (downloadButton) {
        downloadButton.style.display = "none";
      }

      // Capture the content of the certificate
      const desiredSizePercentage = 100;
      const scaleFactor = desiredSizePercentage / 100;
      const canvas = await html2canvas(certificateElement, {
        scale: scaleFactor,
      });

      // Restore the download button visibility
      if (downloadButton) {
        downloadButton.style.display = "block";
      }

      // Create a PDF document
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 297, 210);

      // Download the PDF
      pdf.save("certificate.pdf");
    }
  };

  return (
    <div ref={certificateRef}>
      <div className="App">
        <p className="byline"></p>
        <div className="content">
          <p>This certificate is presented to</p>
          <h1>{name}</h1>
          <p>
            for successfully demonstrating exceptional knowledge and proficiency
            by passing<p></p> the course: {course}. Issued on {date} ,<p></p>{" "}
            this accomplishment signifies [his/her] commitment to excellence,
            dedication<p></p> to continuous learning, and mastery of the course
            content.{" "}
          </p>
          <h2>{instructor}</h2>
          <button className="download-button" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

Certificate.defaultProps = {
  name: "Ma. Leahlyn Fernandez",
  course: "Data Structures and Algorithms",
  date: "November 24, 2023",
  instructor: "Engr. James Yohan Curises",
};
