# I-485 conditional validation audit

Audited the question wording, controls, maps, restoration, and serializers in this repository (not another Fillvisa version).

| Section | Applicability and result |
| --- | --- |
| 1 | Other DOBs, A-Numbers, arrival details, mailing/prior addresses, SSN and disclosure consent: retain existing validation conditions and extend cleanup to every control in each dependent block. Optional passport, I-94, other names and foreign-address fields remain optional/editable. |
| 2 | Item 4 requires a family, employment, special immigrant or Diversity Visa selection. Both radio entries share that condition. Principal-applicant details require derivative status. Employment-relative details require employment category AND the relative answer. Asylum/refugee dates, Diversity rank and Other text follow their selections. |
| 3 | Exemption choices are alternatives, not dependent questions; no new condition. |
| 4 | Immigrant-visa decision/location fields require Yes to the overseas-application question. The additional employment information explicitly says to leave it blank when inapplicable; removed its contradictory nonempty validator. |
| 5 | Parent names at birth are already optional with consistency validation; no new prerequisite control. |
| 6 | Married and separated applicants have a current spouse. Prior-spouse fields apply when marriage count exceeds the current marriage (if any). Other explanation also requires Other. Keep the explicitly offered armed-forces N/A choice. Fix nonexistent radio IDs and required flags so applicable fields are actually checked. |
| 7 | First and second child blocks require counts of at least one and two respectively, including all optional fields and radios. |
| 8 | No dependent questions found. |
| 9A | Organization details require membership. Item 20 requires 19 Yes; 21 requires 19 Yes AND 20 No. Wording permits explanations for unsure No answers, so explanation controls allow either answer while respecting outer prerequisites. |
| 9B | 29 requires 28 Yes; 35.b requires 35.a Yes; 40 requires 39 Yes. Both answers and explanations follow those prerequisites. |
| 9C | Independent questions retained; explanation controls follow the corresponding Yes answer. |
| 9D | Existing exemption, education and benefits rules retained. All dependent controls now clear; nested controls require every outer prerequisite. Optional benefit-row activation remains a validation rule, not a reason to disable an empty editable row. |
| 9E | Independent questions retained; existing explanation condition retained. |
| 9F | 75 requires 74 Yes; unlawful-presence explanation follows 74. |
| 9G | 84 requires 83 Yes. |
| 10 | No dependent questions found. |
| 11–12 | Entire interpreter/preparer section can be blank. Entering details or a signature activates existing required fields. Optional controls remain editable. |

`maps/conditional-fields.js` is loaded after each affected page's handlers. It combines applicability with existing map conditions, synchronizes in capture phase before target listeners, and normalizes every serializer call. After restoration it persists cleanup and invalidates completion only when saved data changes. Submission saves first and then uses the existing validation to mark successful completion.

## Regression suite

Run `node tests/i485-conditional.cjs` with Node 20+, `playwright` and `pdf-lib` resolvable (for example via `NODE_PATH`), and Chrome installed. The suite uses a temporary localhost server and an isolated browser context; it does not touch a user's browser profile or saved application.

Coverage includes restored stale data, every reported follow-up, both radio choices, multi-level dependencies, capture-before-autosave ordering, separated/divorced spouses, child counts, optional preparer/interpreter sections, required blank fields, and persisted completion flags. It also calls the actual PDF generator and reads the output AcroForm to verify Items 20 and 21 remain unchecked when Item 19 is No. Third-party animation-widget errors are excluded from application-error assertions.
