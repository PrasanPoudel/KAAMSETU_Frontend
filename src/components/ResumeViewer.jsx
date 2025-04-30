const ResumeViewer = ({ resume }) => {
  // Log the type and value of the received prop
  console.log("ResumeViewer received:", typeof resume, resume);

  // Check if resume exists and is a string before processing
  if (!resume || typeof resume !== "string") {
    console.log("Resume is not a string or is falsy. Type:", typeof resume);
    // Handle cases where resume is null, undefined, or an object (like a newly selected File)
    // You might want a specific message if it's an object vs simply not provided
    if (typeof resume === "object" && resume !== null) {
      // Check if it looks like a File object (has name and size properties)
      if (resume.name && resume.size !== undefined) {
        console.log("Resume appears to be a File object:", resume.name);
        return <p>New resume selected: {resume.name}. Save profile to view.</p>;
      } else {
        console.log("Resume is an object, but not a File:", resume);
        return <p>Resume data is in an unexpected format.</p>;
      }
    }
    console.log("Resume is falsy or not an object/string:", resume);
    return <p>Resume not available or not yet uploaded.</p>;
  }

  // Now we know resume is a string, so we can assign it and use string methods
  console.log("Resume is a string, proceeding:", resume);
  const fileUrl = resume;
  const isPDF = fileUrl.endsWith(".pdf");
  // Robust check for common image extensions (case-insensitive)
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);

  return (
    <div className="border border-gray-300 rounded p-2 min-h-[100px] flex items-center justify-center">
      {" "}
      {/* Added some basic styling */}
      {isPDF ? (
        <iframe
          src={fileUrl}
          className="h-[400px] w-full" // Removed object-contain for iframe, let it fill
          title="Resume PDF"
        />
      ) : isImage ? (
        <img
          src={fileUrl}
          alt="Resume Image"
          className="h-auto max-h-[400px] w-auto max-w-full object-contain" // Adjusted image sizing
        />
      ) : (
        <p>Unsupported file format: {fileUrl.split(".").pop()}</p> // Show the extension if unsupported
      )}
    </div>
  );
};

export default ResumeViewer;
