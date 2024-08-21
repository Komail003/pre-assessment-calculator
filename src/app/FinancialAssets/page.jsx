// app/PersonalData/page.jsx
"use client";
import FinancialAssets from "../Components/FinancialAssets";
import WithNavigation from "../Components/WithNavigation";

export default function PersonalDataPage() {
  return (
    <WithNavigation>
      <FinancialAssets />
    </WithNavigation>
  );
}
