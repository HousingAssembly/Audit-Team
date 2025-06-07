import React, { useState } from "react";

const Field = ({ label }) => (
  <div className="py-2 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 text-zinc-700 text-start px-4 bg-white font-bold text-xl">
    {label}
  </div>
);

const CheckboxField = ({ checked, onChange, disabled }) => (
  <div className="col-span-1 flex justify-center outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 items-center border border-zinc-700 bg-white">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-6 h-6"
    />
  </div>
);

const InputField = ({ value, onChange, disabled }) => (
  <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white">
    <input
      className="w-full px-2 py-2 outline-none"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const Section = ({ title, children, className, extra }) => (
  <div className="flex flex-col py-4">
    <div className={`flex items-center justify-between font-bold text-4xl py-6 text-zinc-700 px-4 bg-palette-dashboard ${className}`}>
      <span>{title}</span>
      {extra && <div className="flex items-center text-sm gap-2 font-normal text-zinc-700">N/A <input type="checkbox" {...extra} /></div>}
    </div>
    <div className="grid grid-cols-2 gap-0">{children}</div>
  </div>
);

const UploadAudit = () => {
  const [formData, setFormData] = useState({
    registration_number: "",
    application_date: "",
    client_copy_date: "",
    applicant: {
      surname: "",
      first_name: "",
      id_number: "",
      date_of_birth: "",
    },
    spouse_or_partner: {
      surname: "",
      first_name: "",
      id_number: "",
      date_of_birth: "",
    },
    address: {
      street: "",
      suburb: "",
      postal_code: "",
    },
    contact: {
      cellphone_1: "",
      cellphone_2: "",
      landline: "",
    },
    marital_status: {
      married_in_community: false,
      married_out_of_community: false,
      customary_marriage: false,
      common_law_partner: false,
      widowed: false,
      date_married: "",
      divorced_with_dependants: false,
      separated_with_dependants: false,
      single_without_dependants: false,
      engaged_to_be_married: false,
      date_divorced: "",
    },
    special_circumstances: {
      disability: false,
      senior_citizen: false,
      war_veteran: false,
      pregnant: false,
    },
    skip_marital_status: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (path, value) => {
    setFormData((prev) => {
      const copy = structuredClone(prev);
      const keys = path.split(".");
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys.at(-1)] = value;
      return copy;
    });
  };

const toggleCheckbox = (path) => {
  setFormData((prev) => {
    const copy = structuredClone(prev);
    // Only apply singleselect for marital_status 
    if (path.startsWith("marital_status.") && !["date_married", "date_divorced"].includes(path.split(".")[1])) {
      const keyToEnable = path.split(".")[1];
      const updatedStatus = Object.fromEntries(
        Object.entries(copy.marital_status).map(([key, val]) => {
          if (key === "date_married" || key === "date_divorced") return [key, val]; 
          return [key, key === keyToEnable]; 
        })
      );
      copy.marital_status = { ...updatedStatus };
    } else {
      const keys = path.split(".");
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys.at(-1)] = !current[keys.at(-1)];
    }

    return copy;
  });
};

  const handleSubmitAudit = async () => {
    const token = localStorage.getItem("token");
    const payload = structuredClone(formData);

    if (formData.skip_marital_status) {
      payload.marital_status = {
        status: "N/A",
        date_married: "",
        date_divorced: ""
      };
    } else {
      const selectedStatus = Object.entries(formData.marital_status)
        .find(([key, val]) => key !== "date_married" && key !== "date_divorced" && val === true)?.[0] || "Unspecified";

      payload.marital_status = {
      ...formData.marital_status,
      status: selectedStatus.replace(/_/g, " "),
    };
  }
  payload.special_circumstances = formData.special_circumstances;

    try {
      const res = await fetch("http://localhost:5001/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setFormData({
        registration_number: "",
        application_date: "",
        client_copy_date: "",
        applicant: {
          surname: "",
          first_name: "",
          id_number: "",
          date_of_birth: "",
        },
        spouse_or_partner: {
          surname: "",
          first_name: "",
          id_number: "",
          date_of_birth: "",
        },
        address: {
          street: "",
          suburb: "",
          postal_code: "",
        },
        contact: {
          cellphone_1: "",
          cellphone_2: "",
          landline: "",
        },
        marital_status: {
          married_in_community: false,
          married_out_of_community: false,
          customary_marriage: false,
          common_law_partner: false,
          widowed: false,
          date_married: "",
          divorced_with_dependants: false,
          separated_with_dependants: false,
          single_without_dependants: false,
          engaged_to_be_married: false,
          date_divorced: "",
        },
        special_circumstances: {
          disability: false,
          senior_citizen: false,
          war_veteran: false,
          pregnant: false,
        },
        skip_marital_status: false
      });
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network or server error.");
    }
  };

return (
  <>
    {showSuccess && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-4 max-w-sm w-full">
          <h2 className="text-3xl font-bold text-green-700">Audit Submitted!</h2>
          <p className="text-zinc-700">Your audit has been saved successfully.</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    )}
    
    <div className="px-7 py-7">
      <div className="text-4xl text-zinc-700 font-bold py-2">Upload Files</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Add new audit records to the system by completing the digital form and uploading the required Power of Attorney document.
      </div>

      <div className="flex flex-col items-center mt-[50px] mb-[-40px]">
        <label htmlFor="uploadInput">
          <div className="w-[760px] h-[310px] mt-4 border-2 border-dashed border-zinc-500/60 rounded-xl bg-white p-10 text-center cursor-pointer hover:border-zinc-500 transition">

                <div className="relative flex justify-center mt-[50px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full bg-red-800 opacity-20 z-0"></div>
            <img
              src="/red-upload.png"
              alt="Upload File"
              className="relative z-10 w-9 h-9 object-contain"
            />
          </div>
            <div className="text-zinc-700 text-2xl font-bold font-['Sumana'] mt-[40px]">Drag and drop files here, or click to browse</div>
            <div className="text-zinc-500 text-lg font-bold mt-2">Supports PDF, PNG, JPEG files only</div>
          </div>
        </label>
        <input
          id="uploadInput"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => console.log("Selected file:", e.target.files[0])}
        />

        <div className="w-full max-w-3xl mt-6">
          <div className="flex flex-col gap-1">
            <label className="text-zinc-700 text-xl font-bold">File Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="px-4 py-3 rounded-md border border-zinc-300 text-lg focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => {
                document.getElementById("uploadInput").value = "";
              }}
              className="w-32 py-3 text-lg font-bold text-zinc-700 border border-zinc-500 bg-white rounded-lg hover:bg-zinc-100 transition"
            >
              Clear
            </button>
            <button
              className="w-48 py-3 text-lg font-bold text-white bg-red-800 rounded-lg hover:bg-red-900 transition"
            >
              Upload File
            </button>
          </div>
        </div>
      </div>

      <div className="bg-palette-dashboard shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] w-full h-32 -mx-7 w-[calc(100%+3.5rem)]"></div>

      <div className="text-center text-6xl font-bold text-zinc-700 mt-[90px] mb-[-10px] uppercase">
        Audit Details
      </div>

      <Section title="">
        <Field label="Registration Number" />
        <InputField value={formData.registration_number} onChange={(e) => updateField("registration_number", e.target.value)} />
        <Field label="Application Date" />
        <InputField value={formData.application_date} onChange={(e) => updateField("application_date", e.target.value)} />
        <Field label="Client Copy Date" />
        <InputField value={formData.client_copy_date} onChange={(e) => updateField("client_copy_date", e.target.value)} />
      </Section>

      <Section title="APPLICANT">
        <Field label="Surname" />
        <InputField value={formData.applicant.surname} onChange={(e) => updateField("applicant.surname", e.target.value)} />
        <Field label="First Name" />
        <InputField value={formData.applicant.first_name} onChange={(e) => updateField("applicant.first_name", e.target.value)} />
        <Field label="ID Number" />
        <InputField value={formData.applicant.id_number} onChange={(e) => updateField("applicant.id_number", e.target.value)} />
        <Field label="Date of Birth" />
        <InputField value={formData.applicant.date_of_birth} onChange={(e) => updateField("applicant.date_of_birth", e.target.value)} />
        <Field label="Gender" />
        <InputField value={formData.applicant.gender} onChange={(e) => updateField("gender", e.target.value)} />
      </Section>

      <Section title="SPOUSE OR PARTNER">
        <Field label="Surname" />
        <InputField value={formData.spouse_or_partner.surname} onChange={(e) => updateField("spouse_or_partner.surname", e.target.value)} />
        <Field label="First Name" />
        <InputField value={formData.spouse_or_partner.first_name} onChange={(e) => updateField("spouse_or_partner.first_name", e.target.value)} />
        <Field label="ID Number" />
        <InputField value={formData.spouse_or_partner.id_number} onChange={(e) => updateField("spouse_or_partner.id_number", e.target.value)} />
        <Field label="Date of Birth" />
        <InputField value={formData.spouse_or_partner.date_of_birth} onChange={(e) => updateField("spouse_or_partner.date_of_birth", e.target.value)} />
      </Section>

      <Section
        title="MARITAL STATUS"
        extra={{
          checked: formData.skip_marital_status,
          onChange: () =>
            setFormData((prev) => ({
              ...prev,
              skip_marital_status: !prev.skip_marital_status,
              marital_status: !prev.skip_marital_status
                ? {
                    married_in_community: false,
                    married_out_of_community: false,
                    customary_marriage: false,
                    common_law_partner: false,
                    widowed: false,
                    date_married: "",
                    divorced_with_dependants: false,
                    separated_with_dependants: false,
                    single_without_dependants: false,
                    engaged_to_be_married: false,
                    date_divorced: "",
                  }
                : prev.marital_status,
            })),
        }}>
        {!formData.skip_marital_status && (
          <>
            <Field label="Married in a community of property" />
            <CheckboxField
              checked={formData.marital_status.married_in_community}
              onChange={() =>
                toggleCheckbox("marital_status.married_in_community")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Married by antenuptial contract (out of community of property)" />
            <CheckboxField
              checked={formData.marital_status.married_out_of_community}
              onChange={() =>
                toggleCheckbox("marital_status.married_out_of_community")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Customary marriage or Muslim marriage" />
            <CheckboxField
              checked={formData.marital_status.customary_marriage}
              onChange={() => toggleCheckbox("marital_status.customary_marriage")}
              disabled={formData.skip_marital_status}
            />

            <Field label="Common law partner" />
            <CheckboxField
              checked={formData.marital_status.common_law_partner}
              onChange={() =>
                toggleCheckbox("marital_status.common_law_partner")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Widowed" />
            <CheckboxField
              checked={formData.marital_status.widowed}
              onChange={() => toggleCheckbox("marital_status.widowed")}
              disabled={formData.skip_marital_status}
            />

            <Field label="Date married (YYYY/MM/DD)" />
            <InputField
              value={formData.marital_status.date_married}
              onChange={(e) =>
                updateField("marital_status.date_married", e.target.value)
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Divorced with dependants" />
            <CheckboxField
              checked={formData.marital_status.divorced_with_dependants}
              onChange={() =>
                toggleCheckbox("marital_status.divorced_with_dependants")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Separated or partner deserted with dependants" />
            <CheckboxField
              checked={formData.marital_status.separated_with_dependants}
              onChange={() =>
                toggleCheckbox("marital_status.separated_with_dependants")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Single without dependants" />
            <CheckboxField
              checked={formData.marital_status.single_without_dependants}
              onChange={() =>
                toggleCheckbox("marital_status.single_without_dependants")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Engaged to be married" />
            <CheckboxField
              checked={formData.marital_status.engaged_to_be_married}
              onChange={() =>
                toggleCheckbox("marital_status.engaged_to_be_married")
              }
              disabled={formData.skip_marital_status}
            />

            <Field label="Date divorced/split (YYYY/MM/DD)" />
            <InputField
              value={formData.marital_status.date_divorced}
              onChange={(e) =>
                updateField("marital_status.date_divorced", e.target.value)
              }
              disabled={formData.skip_marital_status}
            />
          </>
        )}
      </Section>

      <Section title="RESIDENTIAL DETAILS">
        <Field label="Street" />
        <InputField value={formData.address.street} onChange={(e) => updateField("address.street", e.target.value)} />
        <Field label="Suburb" />
        <InputField value={formData.address.suburb} onChange={(e) => updateField("address.suburb", e.target.value)} />
        <Field label="Postal Code" />
        <InputField value={formData.address.postal_code} onChange={(e) => updateField("address.postal_code", e.target.value)} />
      </Section>

      <Section title="CONTACT">
        <Field label="Cellphone 1" />
        <InputField value={formData.contact.cellphone_1} onChange={(e) => updateField("contact.cellphone_1", e.target.value)} />
        <Field label="Cellphone 2" />
        <InputField value={formData.contact.cellphone_2} onChange={(e) => updateField("contact.cellphone_2", e.target.value)} />
        <Field label="Landline" />
        <InputField value={formData.contact.landline} onChange={(e) => updateField("contact.landline", e.target.value)} />
      </Section>

      <Section title="SPECIAL CIRCUMSTANCES">
        <Field label="Disability/Chronic Illness" />
        <CheckboxField checked={formData.special_circumstances.disability} onChange={() => toggleCheckbox("special_circumstances.disability")} />
        <Field label="Old Age (60+)" />
        <CheckboxField checked={formData.special_circumstances.senior_citizen} onChange={() => toggleCheckbox("special_circumstances.senior_citizen")} />
        <Field label="War Veteran" />
        <CheckboxField checked={formData.special_circumstances.war_veteran} onChange={() => toggleCheckbox("special_circumstances.war_veteran")} />
        <Field label="Pregnant / Woman or Child-Headed Household" />
        <CheckboxField checked={formData.special_circumstances.pregnant} onChange={() => toggleCheckbox("special_circumstances.pregnant")} />
      </Section>


      <div className="flex flex-row justify-between py-3 mt-6">
        <button onClick={() => window.location.reload()} className="px-6 py-3 text-xl text-zinc-700 font-bold rounded-lg border border-solid border-2 border-black/50">Clear</button>
        <button onClick={handleSubmitAudit} className="px-10 py-3 text-xl text-white font-bold rounded-lg bg-red-800">Submit Audit</button>
      </div>
    </div>
  </>
  );
};

export default UploadAudit;