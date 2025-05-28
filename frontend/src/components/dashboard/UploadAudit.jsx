const Field = ({ label }) => (
  <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold text-xl">
    {label}
  </div>
);

const InputField = () => (
  <div className="outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start font-bold">
  <input className="w-full h-full px-2" />
  </div>
);

const Section = ({ title, children, className }) => (
  <div className="flex flex-col py-4">
    <div className={`font-bold text-4xl py-6 text-zinc-700 px-4 ${className}`}>{title}</div>
    <div className="grid grid-cols-2">{children}</div>
  </div>
);

const UploadAudit = () => {
  return (
    <div className="px-6 py-8">
      <div className="text-4xl text-zinc-700 font-bold py-2">Upload Audit</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Add new audit records to the system by filling out the digital form or uploading a scanned paper document. Ensure that audit information is accurate before uploading.
      </div>

      <Section title="AUDIT DETAILS" className="text-center text-6xl mb-6">
        <Field label="Status" />
        <InputField />
        <Field label="Registration number allocated on the database" />
        <InputField />
        <Field label="Existing application date (YYYY/MM/DD)" />
        <InputField />
      </Section>

      <Section title="APPLICANT’S PERSONAL DETAILS">
        <Field label="Surname" />
        <InputField />
        <Field label="Last Name" />
        <InputField />
        <Field label="Identity(ID) Number" />
        <InputField />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField />
      </Section>

      <Section title="SPOUSE OR PARTNER’S PERSONAL DETAILS">
        <Field label="Surname" />
        <InputField />
        <Field label="Last Name" />
        <InputField />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField />
      </Section>

      <Section title="RESIDENTIAL DETAILS">
        <Field label="Room/Flat Number or Structure Number" />
        <InputField />
        <Field label="Street Number" />
        <InputField />
        <Field label="Street Name" />
        <InputField />
        <Field label="Suburb" />
        <InputField />
        <Field label="1st Cellphone Number" />
        <InputField />
        <Field label="2nd Cellphone Number" />
        <InputField />
        <Field label="Landline Telephone Number" />
        <InputField />
      </Section>

      <Section title="MARITAL STATUS">
        <Field label="Married in a community of property" />
        <InputField />
        <Field label="Married by antenuptial contract (out of community of property)" />
        <InputField />
        <Field label="Customary marriage or Muslim marriage" />
        <InputField />
        <Field label="Common law partner" />
        <InputField />
        <Field label="Widowed" />
        <InputField />
        <Field label="Date married (YYYY/MM/DD)" />
        <InputField />
        <Field label="Divorced with dependants" />
        <InputField />
        <Field label="Separated or partner deserted with dependants" />
        <InputField />
        <Field label="Single without dependants" />
        <InputField />
        <Field label="Engaged to be married" />
        <InputField />
        <Field label="Date divorced/split (YYYY/MM/DD)" />
        <InputField />
      </Section>

      <Section title="SPECIAL CIRCUMSTANCES">
        <Field label="Disability/Chronic Illness" />
        <InputField />
        <Field label="Old Age (60+)/War Veterans" />
        <InputField />
        <Field label="Women/Child Headed Households" />
        <InputField />
      </Section>

      <div className="flex flex-row justify-between py-3 mt-6">
        <button className="px-6 py-3 text-xl text-zinc-700 font-bold rounded-lg border border-solid border-2 border-black/50 ">Clear</button>
        <button className="px-10 py-3 text-xl text-white font-bold rounded-lg bg-red-800">Submit Audit</button>
      </div>
    </div>
  );
};

export default UploadAudit;
