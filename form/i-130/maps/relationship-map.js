const relationshipIds = [
   "relationship_spouse",
   "relationship_parent",
   "relationship_brother",
   "relationship_child"
];

const petitionRelationshipIds = [
   "petition_child",
   "petition_stepchild",
   "petition_child_not_married",
   "petition_child_adopted"
];

const relatedAdoptionIds = [
   "related_adoption_yes",
   "related_adoption_no"
];

const lawfulAdoptionIds = [
   "lawful_adoption_yes",
   "lawful_adoption_no"
];

function isChecked(id) {
   return !!document.getElementById(id)?.checked;
}

function setGroupState(ids, isValid) {
   ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      el.classList.toggle("is-valid", isValid);
      el.classList.toggle("is-invalid", !isValid);
   });
}

function validateRadioGroup(ids) {
   const isValid = ids.some(isChecked);
   setGroupState(ids, isValid);
   return isValid;
}

function isPetitionRelationshipRequired() {
   return isChecked("relationship_parent") || isChecked("relationship_child");
}

function isBrotherRelationshipSelected() {
   return isChecked("relationship_brother");
}

const fields = [
   {
      id: "relationship_spouse",
      required: true,
      validate: () => validateRadioGroup(relationshipIds),
      message: "Select the family relationship for this petition."
   },
   {
      id: "relationship_parent",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "relationship_brother",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "relationship_child",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petition_child",
      required: true,
      condition: isPetitionRelationshipRequired,
      validate: () => validateRadioGroup(petitionRelationshipIds),
      message: "Select the child or parent relationship description."
   },
   {
      id: "petition_stepchild",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petition_child_not_married",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "petition_child_adopted",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "related_adoption_yes",
      required: true,
      condition: isBrotherRelationshipSelected,
      validate: () => validateRadioGroup(relatedAdoptionIds),
      message: "Select whether you are related to your brother/sister by adoption."
   },
   {
      id: "related_adoption_no",
      required: false,
      validate: () => true,
      message: ""
   },
   {
      id: "lawful_adoption_yes",
      required: true,
      validate: () => validateRadioGroup(lawfulAdoptionIds),
      message: "Select whether you gained lawful permanent resident status or citizenship through adoption."
   },
   {
      id: "lawful_adoption_no",
      required: false,
      validate: () => true,
      message: ""
   }
];
