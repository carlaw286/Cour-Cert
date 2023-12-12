import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Certificate1.css';

export function Certificate({ name, course, date, instructor }) {
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    const certificateElement = certificateRef.current;

    if (certificateElement) {
      // Capture the content of the certificate
      const desiredSizePercentage = 90; // Adjust this value as needed
      const scaleFactor = desiredSizePercentage / 100;

      const canvas = await html2canvas(certificateElement, { scale: scaleFactor });

      // Create a PDF document
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

      // Download the PDF
      pdf.save('certificate.pdf');
    }
  };

  return (
    <div className="App" ref={certificateRef}>
      <p className="byline"></p>
      <div className="content">
        <p>This certificate is presented to</p>
        <h1>{name}</h1>
        <p>for successfully demonstrating exceptional knowledge and proficiency by passing<p>
          </p> the course: {course}. Issued on {date} ,<p>
            </p> this accomplishment signifies [his/her] commitment to excellence, dedication<p>
              </p> to continuous learning, and mastery of the course content. </p>
        <h2>{instructor}</h2>
        <button className="download-button" onClick={handleDownload}>
        Download
      </button>
      </div>
    </div>
  );
}

Certificate.defaultProps = {
  name: 'Ma. Leahlyn Fernandez',
  course: 'Data Structures and Algorithms',
  date: 'November 24, 2023',
  instructor: 'Engr. James Yohan Curises'
}



