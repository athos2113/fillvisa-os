const povertyGuidelineRegionLabels = {
   contiguous: "48 contiguous states and D.C.",
   alaska: "Alaska",
   hawaii: "Hawaii"
};

// 2025 I-864P-style thresholds based on 125% of HHS poverty guidelines.
// Keep these isolated so they can be updated when USCIS publishes a newer I-864P table.
const i864PovertyGuidelineThresholds = {
   contiguous: {
      firstEight: [19563, 26438, 33313, 40188, 47063, 53938, 60813, 67688],
      additionalPerson: 6875
   },
   alaska: {
      firstEight: [24438, 33038, 41638, 50238, 58838, 67438, 76038, 84638],
      additionalPerson: 8600
   },
   hawaii: {
      firstEight: [22488, 30400, 38313, 46225, 54138, 62050, 69963, 77875],
      additionalPerson: 7913
   }
};

function getI864PovertyGuidelineThreshold(householdSize, region = "contiguous") {
   const table = i864PovertyGuidelineThresholds[region] || i864PovertyGuidelineThresholds.contiguous;
   const size = parseInt(householdSize, 10);

   if (!Number.isFinite(size) || size <= 0) return 0;
   if (size <= 8) return table.firstEight[size - 1];

   return table.firstEight[7] + ((size - 8) * table.additionalPerson);
}

function isNonNegativeMoney(value) {
   const trimmed = value.trim();
   if (trimmed === "") return false;

   return /^\d+(\.\d{1,2})?$/.test(trimmed) && Number(trimmed) >= 0;
}

function getAssetMapNumberValue(id) {
   const value = document.getElementById(id)?.value.trim();
   if (value === "") return 0;
   return parseFloat(value) || 0;
}

function assetTotalsEqual(actual, expected) {
   return Math.abs(Number(actual) - expected) < 0.01;
}

function getExpectedOwnAssetTotal() {
   return getAssetMapNumberValue("asset_balance") +
      getAssetMapNumberValue("asset_net_cash") +
      getAssetMapNumberValue("asset_net_not_included");
}

function getExpectedPrincipalAssetTotal() {
   return getAssetMapNumberValue("asset_principal") +
      getAssetMapNumberValue("asset_principal_estate") +
      getAssetMapNumberValue("asset_principal_stock");
}

function getExpectedTotalAssetValue() {
   return getExpectedOwnAssetTotal() +
      getAssetMapNumberValue("asset_household_add") +
      getExpectedPrincipalAssetTotal();
}

const fields = [
   {
      id: "asset_balance",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative amount for cash, savings, and checking accounts."
   },
   {
      id: "asset_net_cash",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative net cash value for real-estate holdings."
   },
   {
      id: "asset_net_not_included",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative amount for other assets not already included."
   },
   {
      id: "asset_add",
      required: true,
      validate: value => assetTotalsEqual(value, getExpectedOwnAssetTotal()),
      message: "Item 4 must equal the total of Item Numbers 1 through 3."
   },
   {
      id: "asset_household_add",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative total for household members' assets."
   },
   {
      id: "asset_principal",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative amount for the principal immigrant's savings and checking accounts."
   },
   {
      id: "asset_principal_estate",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative net cash value for the principal immigrant's real estate holdings."
   },
   {
      id: "asset_principal_stock",
      required: true,
      validate: isNonNegativeMoney,
      message: "Enter a non-negative amount for the principal immigrant's other assets."
   },
   {
      id: "asset_principal_add",
      required: true,
      validate: value => assetTotalsEqual(value, getExpectedPrincipalAssetTotal()),
      message: "Item 9 must equal the total of Item Numbers 6 through 8."
   },
   {
      id: "asset_total_add",
      required: true,
      validate: value => assetTotalsEqual(value, getExpectedTotalAssetValue()),
      message: "Item 10 must equal the total of Item Numbers 4, 5, and 9."
   }
];
