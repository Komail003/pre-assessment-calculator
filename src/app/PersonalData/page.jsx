// app/PersonalData/page.jsx
"use client";
import PersonalData from '../Components/PersonalData';
import WithNavigation from '../Components/WithNavigation';

export default function PersonalDataPage() {
  return (
    <WithNavigation>
      <PersonalData />
    </WithNavigation>
  );
}
