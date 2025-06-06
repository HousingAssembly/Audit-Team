import React from 'react';

const Field = ({ label }) => (
  <div className="py-2 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 text-zinc-700 text-start px-4 bg-white font-bold text-xl">
    {label}
  </div>
);

const Section = ({ title, children, className, extra }) => (
  <div className="flex flex-col p-4 mx-auto">
    <div className={`flex items-center justify-between font-bold text-4xl py-6 text-zinc-700 px-4 ${className}`}>
      <span>{title}</span>
      {extra && <div className="flex items-center text-sm gap-2 font-normal text-zinc-700">N/A <input type="checkbox" {...extra} /></div>}
    </div>
    <div className="grid grid-cols-2 gap-0">{children}</div>
  </div>
);

const InfoField = ({label}) => (
  <div className="py-2 px-4 col-span-1 outline outline-[3px] outline-offset-[-1.5px] outline-zinc-700 border border-zinc-700 bg-white text-xl">
    {label}
  </div>
);

const ShowAudit = ({audit}) => ( 
  <div className="max-h-[60vh] overflow-y-auto text-sm text-zinc-700 whitespace-pre-wrap w-full">
    <Section title="AUDIT DETAILS">
      <Field label="Registration Number" />
      <InfoField label={audit.registration_number} />
      <Field label="Application Date" />
      <InfoField label={audit.application_date} />
      <Field label="Client Copy Date" />
      <InfoField label={audit.client_copy_date} />
    </Section>

    <Section title="APPLICANT">
      <Field label="Surname" />
      <InfoField label={audit.applicant.surname} />
      <Field label="First Name" />
      <InfoField label={audit.applicant.first_name} />
      <Field label="ID Number" />
      <InfoField label={audit.applicant.id_number} />
      <Field label="Date of Birth" />
      <InfoField label={audit.applicant.date_of_birth} />
    </Section>

    <Section title="SPOUSE OR PARTNER">
      <Field label="Surname" />
      <InfoField label={audit.spouse_or_partner.surname} />
      <Field label="First Name" />
      <InfoField label={audit.spouse_or_partner.first_name} />
      <Field label="ID Number" />
      <InfoField label={audit.spouse_or_partner.id_number} />
      <Field label="Date of Birth" />
      <InfoField label={audit.spouse_or_partner.date_of_birth} />
    </Section>

    <Section title="MARITAL STATUS">
      <Field label="Date married (YYYY/MM/DD)" />
      <InfoField label={audit.marital_status.date_married} />
      <Field label="Date divorced/split (YYYY/MM/DD)" />
      <InfoField label={audit.marital_status.date_divorced} />
    </Section>

    <Section title="RESIDENTIAL DETAILS">
      <Field label="Street" />
      <InfoField label={audit.address.street} />
      <Field label="Suburb" />
      <InfoField label={audit.address.suburb} />
      <Field label="Postal Code" />
      <InfoField label={audit.address.postal_code} />
    </Section>

    <Section title="CONTACT">
      <Field label="Cellphone 1" />
      <InfoField label={audit.contact.cellphone_1} />
      <Field label="Cellphone 2" />
      <InfoField label={audit.contact.cellphone_2} />
      <Field label="Landline" />
      <InfoField label={audit.contact.landline} />
    </Section>     
  </div>
);

export default function AuditModal({ audit, onClose }) {
  if (!audit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">
        <h2 className="text-2xl font-bold text-zinc-700 mb-4">
          Audit: {audit.registration_number}
        </h2>
        <ShowAudit audit={audit} />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}
