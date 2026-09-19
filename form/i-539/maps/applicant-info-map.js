const fields = [
   {
      id: "applicant_telephone", pdfField: "applicant_telephone", type: "text", required: true,
      validate: value => value.trim() !== "", message: "Please provide your daytime telephone number."
   },
   {
      id: "applicant_mobile", pdfField: "applicant_mobile", type: "text", required: false,
      validate: () => true, message: ""
   },
   {
      id: "applicant_email", pdfField: "applicant_email", type: "email", required: false,
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Please enter a valid email address."
   },
   {
      id: "signatureApplicant", type: "signature", required: false,
      validate: () => true, message: ""
   }
];
