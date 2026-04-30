export default function SplitLayout({ editor, preview }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0D0A07]">
      <div className="w-full lg:w-[45%] h-screen lg:h-screen sticky top-0 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#2E2418] bg-[#0D0A07]">
        {editor}
      </div>
      <div className="w-full lg:w-[55%] min-h-screen overflow-y-auto bg-[#0F0C09]">
        {preview}
      </div>
    </div>
  );
}
