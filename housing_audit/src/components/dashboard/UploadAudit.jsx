export default function UploadAudit() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Upload Audit</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Add new audit records to the system by filling out the digital form or uploading a scanned paper document. Ensure that audit information is accurate before uploading.
      </div>
      <div className="flex flex-col items-center py-12">
        <div className="font-bold text-xl mb-4">AUDIT DETAILS</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-400 p-4 text-white text-center">Status</div>
          <div className="bg-red-400 p-4 text-white text-center">Input</div>
          <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
          <div className="bg-red-400 p-4 text-white text-center">Input</div>
          <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
          <div className="bg-red-400 p-4 text-white text-center">Input</div>
        </div>
        <div className="flex flex-col py-4">
          <div>APPLICANT’S PERSONAL DETAILS</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-4 text-white text-center">Status</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>SPOUSE OR PARTNER’S PERSONAL DETAILS</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-4 text-white text-center">Status</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>RESIDENTIAL DETAILS</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-4 text-white text-center">Status</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>MARITAL STATUS</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-4 text-white text-center">Status</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>SPECIAL CIRCUMSTANCES</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-4 text-white text-center">Status</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Registration number allocated on the database</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
            <div className="bg-red-400 p-4 text-white text-center">Existing application date (YYYY/MM/DD)</div>
            <div className="bg-red-400 p-4 text-white text-center">Input</div>
          </div>
        </div>
      </div>
    </div>
  );
}