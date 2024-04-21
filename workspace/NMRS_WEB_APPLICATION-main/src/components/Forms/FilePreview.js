export default function FilePreview({ src, alt }) {
  console.log(src.split(";"));
  return (
    <>
      {src.split(";")[0] === "data:application/pdf" ? (
        <embed style={{ height: "100%", width: "100%" }} src={src} alt={alt} />
      ) : (
        <img style={{ width: "100%", height: "100%" }} src={src} alt={alt} />
      )}
    </>
  );
}
