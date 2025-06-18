  import React, { useState } from "react";

  const Field = ({ label }) => (
    <div className="py-2 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 text-zinc-700 text-start px-4 bg-white font-bold text-xl">
      {label}
    </div>
  );

  const CheckboxField = ({ checked, onChange, disabled }) => (
    <div className="col-span-1 flex justify-center outline outline-[2px] outline-offset-[-2px] outline-zinc-700 items-center border border-zinc-700 bg-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4"
      />
    </div>
  );

  const InputField = ({ value, onChange, disabled, isRequired, enforceDateFormat = false, placeholder }) => {
    const isValidDate = (val) => /^\d{4}\/\d{2}\/\d{2}$/.test(val);
    const showWarning = enforceDateFormat && value && !isValidDate(value);
    const [isFieldEmpty, setIsFieldEmpty] = useState(false);

    const handleDateInput = (e) => {
      let val = e.target.value.replace(/\D/g, "").slice(0, 8);
      let formatted = val;
      if (val.length > 4) formatted = val.slice(0, 4) + "/" + val.slice(4);
      if (val.length > 6) formatted = formatted.slice(0, 7) + "/" + val.slice(6);
      onChange({ target: { value: formatted } });
    };

    const checkEmpty = (e) => {
      return e.target.value.trim() === "";
    };

    const handleBlur = (e) => {
      if (isRequired) {
        const isEmpty = checkEmpty(e);
        setIsFieldEmpty(isEmpty); 
      }
    };

    const handleChange = (e) => {
      onChange(e);
      if (isRequired) {
        const isEmpty = checkEmpty(e);
        setIsFieldEmpty(isEmpty);
      }
    };


    return (
      <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white p-[6px]">
        <input
          className={`w-full px-3 py-2 outline-none ${showWarning ? 'border-2 border-red-500' : ''}`}
          value={value}
          onChange={enforceDateFormat ? handleDateInput : handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder || (enforceDateFormat ? "0000/00/00" : undefined)}
          style={{height: "36px"}}
        />
        {showWarning && (
          <div className="text-xs text-red-600 px-2 pt-1">
            Format must be YYYY/MM/DD
          </div>
        )}
        {isFieldEmpty && isRequired && (
          <div className="text-xs text-red-600 px-2 pt-1">
            This field is required
          </div>
        )}
      </div>
    );
  };




  const Section = ({ title, children, className, extra }) => (
    <div className="flex flex-col py-4">
      <div className={`flex items-center justify-between font-bold text-3xl py-4 text-zinc-700 px-4 bg-white ${className}`}>
        <span>{title}</span>
        {extra && (        
          <div className="flex items-center gap-2">
            <span className="text-zinc-700 font-bold text-base">N/A</span>
            <CheckboxField checked={extra.checked} onChange={extra.onChange} />
          </div>
        )}
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
        gender: {
          male: false,
          female: false,
          other: false,
          description: "", 
        }, 
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
      skip_marital_status: false,
      skip_spouse: false
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

      if (path.startsWith("applicant.gender.") && path !== "applicant.gender.description") {
        const keyToEnable = path.split(".")[2];
        const updatedGender = {
          male: false,
          female: false,
          other: false,
          description: keyToEnable === "other" ? copy.applicant.gender.description : "",
        };
        updatedGender[keyToEnable] = true;
        copy.applicant.gender = updatedGender;
      }
      return copy;
    });
  };

    const handleSubmitAudit = async () => {
      const token = localStorage.getItem("token");
      const payload = structuredClone(formData);

      const selectedGender = Object.entries(formData.applicant.gender)
        .find(([key, val]) => key !== "description" && val === true)?.[0] || "Unspecified";
      payload.applicant.gender = selectedGender;

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
            gender: {
              male: false,
              female: false,
              other: false,
              description: "", 
        }, 
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
          skip_marital_status: false,
          skip_spouse: false
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


      <div className="text-4xl text-zinc-700 font-bold py-2">Upload Audit</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Add new audit records to the system by completing the digital form.
      </div>

      <div className="flex justify-center w-full">
        <div className="pb-[40px] pt-[60px] mt-8 bg-white rounded-2xl border border-zinc-400 w-[90%] mb-6">

          <div className="text-center text-5xl font-bold text-zinc-700 mb-[-16px] uppercase">
            Audit Details
          </div>

          <div className="px-20">
            <Section>
              <Field label="Registration Number" />
              <InputField
                value={formData.registration_number} 
                onChange={(e) => updateField("registration_number", e.target.value)} 
                placeholder="000000"
                isRequired={true}
              />

              <Field label="Application Date (YYYY/MM/DD)" />
              <InputField 
                value={formData.application_date} 
                onChange={(e) => updateField("application_date", e.target.value)} enforceDateFormat
                isRequired={true}
              />
              
              <Field label="Client Copy Date (YYYY/MM/DD)" />
              <InputField 
                value={formData.client_copy_date} 
                onChange={(e) => updateField("client_copy_date", e.target.value)} enforceDateFormat
                isRequired={true}
              />
            </Section>

            <Section title="APPLICANT'S PERSONAL DETAILS">
              <Field label="Surname" />
              <InputField 
                value={formData.applicant.surname} 
                onChange={(e) => updateField("applicant.surname", e.target.value)} 
                placeholder="Doe"
                isRequired={true}
              />

              <Field label="First Name" />
              <InputField 
                value={formData.applicant.first_name} 
                onChange={(e) => updateField("applicant.first_name", e.target.value)} 
                placeholder="John"
                isRequired={true}
              />

              <Field label="Identity (ID) Number" />
              <InputField 
                value={formData.applicant.id_number} 
                onChange={(e) => updateField("applicant.id_number", e.target.value)} 
                placeholder="0000000000000"
                isRequired={true}
              />

              <Field label="Date of Birth (YYYY/MM/DD)" />
              <InputField value={formData.applicant.date_of_birth} onChange={(e) => updateField("applicant.date_of_birth", e.target.value)} enforceDateFormat isRequired={true}/>
              
            <Field label="Gender" />
            <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
              <div className="flex items-center gap-2">
                <CheckboxField
                  checked={formData.applicant.gender.male}
                  onChange={() => toggleCheckbox("applicant.gender.male")}
                />
                <span className="text-zinc-700 font-bold">Male</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckboxField
                  checked={formData.applicant.gender.female}
                  onChange={() => toggleCheckbox("applicant.gender.female")}
                />
                <span className="text-zinc-700 font-bold">Female</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckboxField
                  checked={formData.applicant.gender.other}
                  onChange={() => toggleCheckbox("applicant.gender.other")}
                />
                <span className="text-zinc-700 font-bold">Other</span>
              </div>
            </div>


              {formData.applicant.gender.other && (
              <>
                <Field label="Specify if Other" />
                <InputField
                  value={formData.applicant.gender.description}
                  onChange={(e) =>
                    updateField("applicant.gender.description", e.target.value)
                  }
                  placeholder="Non-binary, Intersex, etc."
                  isRequired={true}
                />
              </>
            )}

              </Section>

            <Section
              title="SPOUSE OR PARTNER'S PERSONAL DETAILS"
              extra={{
                checked: formData.skip_spouse,
                onChange: () =>
                  setFormData((prev) => ({
                    ...prev,
                    skip_spouse: !prev.skip_spouse,
                    spouse_or_partner: !prev.skip_spouse
                      ? {
                          surname: "",
                          first_name: "",
                          id_number: "",
                          date_of_birth: "",
                        }
                      : prev.spouse_or_partner,
                  })),
              }}
            >
              {!formData.skip_spouse && (
                <>
                  <Field label="Surname" />
                  <InputField
                    value={formData.spouse_or_partner.surname}
                    onChange={(e) =>
                      updateField("spouse_or_partner.surname", e.target.value)
                    }
                    placeholder="Doe"
                  />
                  <Field label="First Name" />
                  <InputField
                    value={formData.spouse_or_partner.first_name}
                    onChange={(e) =>
                      updateField("spouse_or_partner.first_name", e.target.value)
                    }
                    placeholder="Jane"
                  />
                  <Field label="Identity (ID) Number" />
                  <InputField
                    value={formData.spouse_or_partner.id_number}
                    onChange={(e) =>
                      updateField("spouse_or_partner.id_number", e.target.value)
                    }
                    placeholder="0000000000000"
                  />
                  <Field label="Date of Birth (YYYY/MM/DD)" />
                  <InputField
                    value={formData.spouse_or_partner.date_of_birth}
                    onChange={(e) =>
                      updateField("spouse_or_partner.date_of_birth", e.target.value)
                    }
                    enforceDateFormat
                  />
                </>
              )}
            </Section>

            <Section title="RESIDENTIAL DETAILS">
              <Field label="Street Number and Street Name" />
                <InputField 
                  value={formData.address.street} 
                  onChange={(e) => updateField("address.street", e.target.value)} 
                  placeholder="123 Main Street"
                  isRequired={true}
                />
              <Field label="Suburb" />
                <InputField 
                  value={formData.address.suburb} 
                  onChange={(e) => updateField("address.suburb", e.target.value)} 
                  placeholder="Eastridge"
                  isRequired={true}
                />
              <Field label="Postal Code" />
                <InputField 
                  value={formData.address.postal_code} 
                  onChange={(e) => updateField("address.postal_code", e.target.value)} 
                  placeholder="0000"
                  isRequired={true}
                />
            </Section>

            <Section title="CONTACT DETAILS">
              <Field label="Cellphone 1" />
                <InputField 
                  value={formData.contact.cellphone_1} 
                  onChange={(e) => updateField("contact.cellphone_1", e.target.value)} 
                  placeholder="0000000000"
                  isRequired={true}
                />
              <Field label="Cellphone 2" />
                <InputField 
                  value={formData.contact.cellphone_2} 
                  onChange={(e) => updateField("contact.cellphone_2", e.target.value)} 
                  placeholder="0000000000"
                />
              <Field label="Landline" />
                <InputField 
                  value={formData.contact.landline} 
                  onChange={(e) => updateField("contact.landline", e.target.value)} 
                  placeholder="0000000000"
                />
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
              }}
            >
              {!formData.skip_marital_status && (
                <>
                  {[
                    { key: "married_in_community", label: "Married in a community of property" },
                    { key: "married_out_of_community", label: "Married by antenuptial contract (out of community of property)" },
                    { key: "customary_marriage", label: "Customary marriage or Muslim marriage" },
                    { key: "common_law_partner", label: "Common law partner" },
                    { key: "widowed", label: "Widowed" },
                    { key: "divorced_with_dependants", label: "Divorced with dependants" },
                    { key: "separated_with_dependants", label: "Separated or partner deserted with dependants" },
                    { key: "single_without_dependants", label: "Single without dependants" },
                    { key: "engaged_to_be_married", label: "Engaged to be married" },
                  ].map(({ key, label }) => (
                    <React.Fragment key={key}>
                      <Field label={label} />
                      <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
                        <div className="flex items-center gap-2">
                          <CheckboxField
                            checked={formData.marital_status[key]}
                            onChange={() => toggleCheckbox(`marital_status.${key}`)}
                            disabled={formData.skip_marital_status}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <Field label="Date Married (YYYY/MM/DD)" />
                  <InputField
                    value={formData.marital_status.date_married}
                    onChange={(e) =>
                      updateField("marital_status.date_married", e.target.value)
                    }
                    enforceDateFormat
                    disabled={formData.skip_marital_status}
                  />

                  <Field label="Date Divorced/Split (YYYY/MM/DD)" />
                  <InputField
                    value={formData.marital_status.date_divorced}
                    onChange={(e) =>
                      updateField("marital_status.date_divorced", e.target.value)
                    }
                    enforceDateFormat
                    disabled={formData.skip_marital_status}
                  />
                </>
              )}
            </Section>

            <Section title="SPECIAL CIRCUMSTANCES">
              <Field label="Disability/Chronic Illness" />
                <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
                  <div className="flex items-center gap-2">
                    <CheckboxField checked={formData.special_circumstances.disability} onChange={() => toggleCheckbox("special_circumstances.disability")} /> 
                  </div>
                </div>
              <Field label="Old Age (60+)" />
                <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
                  <div className="flex items-center gap-2">
                    <CheckboxField checked={formData.special_circumstances.senior_citizen} onChange={() => toggleCheckbox("special_circumstances.senior_citizen")} />
                  </div>
                </div>
              <Field label="War Veteran" />
                <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
                  <div className="flex items-center gap-2">
                    <CheckboxField checked={formData.special_circumstances.war_veteran} onChange={() => toggleCheckbox("special_circumstances.war_veteran")} />
                  </div> 
                </div>
              <Field label="Woman/Child-Headed Household" />
                <div className="col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white flex justify-center gap-8 py-2">
                  <div className="flex items-center gap-2">
                    <CheckboxField checked={formData.special_circumstances.pregnant} onChange={() => toggleCheckbox("special_circumstances.pregnant")} />
                  </div>
                </div>
            </Section>

              <div className="flex flex-row justify-between py-3 mt-6">
                <button onClick={() => window.location.reload()} className="px-6 py-3 text-xl text-zinc-700 font-bold rounded-lg border border-2 border-zinc-500 hover:bg-zinc-200 transition">Clear</button>
                <button onClick={handleSubmitAudit} className="px-10 py-3 text-xl text-white font-bold rounded-lg bg-red-800 hover:bg-red-900 transition">Submit Audit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };

  export default UploadAudit;