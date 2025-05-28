export default function UploadAudit() {
  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Upload Audit</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Add new audit records to the system by filling out the digital form or uploading a scanned paper document. Ensure that audit information is accurate before uploading.
      </div>
      <div className="flex flex-col items-center py-12">
        <div className="font-bold text-xl mb-4">AUDIT DETAILS</div>
        <div className="grid grid-cols-2">
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Status</div>
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Registration number allocated on the database</div>
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Existing application date (YYYY/MM/DD)</div>
          <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
        </div>
        <div className="flex flex-col py-4">
          <div>APPLICANT’S PERSONAL DETAILS</div>
          <div className="grid grid-cols-2">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Surname</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Last Name</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Identity(ID) Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Date of Birth (YYYY/MM/DD)</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>SPOUSE OR PARTNER’S PERSONAL DETAILS</div>
          <div className="grid grid-cols-2">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Surname</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Last Name</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Date of Birth (YYYY/MM/DD)</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Date of Birth (YYYY/MM/DD)</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>RESIDENTIAL DETAILS</div>
          <div className="grid grid-cols-2">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Room/Flat Number or Structure Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Street Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Street Name</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Suburb</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">1st Cellphone Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">2nd Cellphone Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Landline Telephone Number</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
        </div>
        <div className="flex flex-col space-y-9 py-4">
          <div>MARITAL STATUS</div>
          <div className="grid grid-cols-2 ">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Married in a community of property</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Married by antenuptial contract (out of community of property) </div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Customary marriage or Muslim marriage</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Common law partner</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Widowed</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Date married (YYYY/MM/DD)</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Divorced with dependants</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Separated or partner deserted with dependants</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Single without dependants</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Engaged to be married</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Date divorced/splt (YYYY/MM/DD)</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
        </div>
        <div className="flex flex-col py-4">
          <div>SPECIAL CIRCUMSTANCES</div>
          <div className="grid grid-cols-2">
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Disability/Chronic Illness</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Old Age (60+)/War Veterans</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Women/Child Headed Households</div>
            <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">Input</div>
          </div>
        </div>
      </div>
    </div>
  );
}