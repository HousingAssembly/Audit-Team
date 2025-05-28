const Field = ({ label }) => (
  <div className="py-2 outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start px-4 font-bold">
    {label}
  </div>
);

const InputField = () => (
  <div className="outline outline-[3px] outline-offset-[-1.50px] outline-zinc-700 text-zinc-700 text-start font-bold">
  <input className="w-full h-full px-2" />
  </div>
);

const Section = ({ title, children }) => (
  <div className="flex flex-col py-4">
    <div className="font-bold text-xl mb-4">{title}</div>
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

      <Section title="AUDIT DETAILS">
        <Field label="Status" />
        <InputField label="Input" />
        <Field label="Registration number allocated on the database" />
        <InputField label="Input" />
        <Field label="Existing application date (YYYY/MM/DD)" />
        <InputField label="Input" />
      </Section>

      <Section title="APPLICANT’S PERSONAL DETAILS">
        <Field label="Surname" />
        <InputField label="Input" />
        <Field label="Last Name" />
        <InputField label="Input" />
        <Field label="Identity(ID) Number" />
        <InputField label="Input" />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField label="Input" />
      </Section>

      <Section title="SPOUSE OR PARTNER’S PERSONAL DETAILS">
        <Field label="Surname" />
        <InputField label="Input" />
        <Field label="Last Name" />
        <InputField label="Input" />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField label="Input" />
        <Field label="Date of Birth (YYYY/MM/DD)" />
        <InputField label="Input" />
      </Section>

      <Section title="RESIDENTIAL DETAILS">
        <Field label="Room/Flat Number or Structure Number" />
        <InputField label="Input" />
        <Field label="Street Number" />
        <InputField label="Input" />
        <Field label="Street Name" />
        <InputField label="Input" />
        <Field label="Suburb" />
        <InputField label="Input" />
        <Field label="1st Cellphone Number" />
        <InputField label="Input" />
        <Field label="2nd Cellphone Number" />
        <InputField label="Input" />
        <Field label="Landline Telephone Number" />
        <InputField label="Input" />
      </Section>

      <Section title="MARITAL STATUS">
        <Field label="Married in a community of property" />
        <InputField label="Input" />
        <Field label="Married by antenuptial contract (out of community of property)" />
        <InputField label="Input" />
        <Field label="Customary marriage or Muslim marriage" />
        <InputField label="Input" />
        <Field label="Common law partner" />
        <InputField label="Input" />
        <Field label="Widowed" />
        <InputField label="Input" />
        <Field label="Date married (YYYY/MM/DD)" />
        <InputField label="Input" />
        <Field label="Divorced with dependants" />
        <InputField label="Input" />
        <Field label="Separated or partner deserted with dependants" />
        <InputField label="Input" />
        <Field label="Single without dependants" />
        <InputField label="Input" />
        <Field label="Engaged to be married" />
        <InputField label="Input" />
        <Field label="Date divorced/split (YYYY/MM/DD)" />
        <InputField label="Input" />
      </Section>

      <Section title="SPECIAL CIRCUMSTANCES">
        <Field label="Disability/Chronic Illness" />
        <InputField label="Input" />
        <Field label="Old Age (60+)/War Veterans" />
        <InputField label="Input" />
        <Field label="Women/Child Headed Households" />
        <InputField label="Input" />
      </Section>
    </div>
  );
};

export default UploadAudit;
