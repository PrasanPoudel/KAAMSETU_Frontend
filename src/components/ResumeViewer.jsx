const ResumeViewer = ({ resume }) => {
  if (!resume) return null;

  const fileUrl = resume;
  const isPDF = fileUrl.endsWith(".pdf");
  const isImage = [".jpg", ".jpeg", ".png", ".gif"].some(ext => fileUrl.endsWith(ext));

  return (
    <div>
      {isPDF ? (
        <iframe src={fileUrl} className="h-[400px] object-contain w-full" title="Resume PDF" />
      ) : isImage ? (
        <img src={fileUrl} alt="Resume Image" className="h-[400px] w-full object-contain" />
      ) : (
        <p>Unsupported file format or resume not provided. You can upload now.</p>
      )}
    </div>
  );
};

export default ResumeViewer;
