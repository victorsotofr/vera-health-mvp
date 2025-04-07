const GuidelineViewer = () => {
    return (
      <div className="w-full h-[800px] mt-6 border rounded overflow-hidden">
        <iframe
          src="/2023-e-m-descriptors-guidelines.pdf"
          width="100%"
          height="100%"
          title="AMA/ACEP Guidelines"
        />
      </div>
    );
  };
  
  export default GuidelineViewer;
  