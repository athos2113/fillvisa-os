const fields = [

  {
    id: "affidavit_exemption",
    required: true,
    validate: () =>
      exemption_ssa.checked ||
      exemption_unmarried.checked ||
      exemption_widow.checked ||
      exemption_vawa.checked ||
      exemption_none_request_yes.checked ||
      exemption_none_request_no.checked,
    message:
      "Please select one reason for requesting or not requesting an exemption from the Affidavit of Support requirement."
  }

];
