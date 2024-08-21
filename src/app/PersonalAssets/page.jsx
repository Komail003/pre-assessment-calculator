// app/PersonalData/page.jsx
"use client";
import OtherIncome from '../Components/OtherIncome';
import PersonalAssets from '../Components/PersonalAssets';
import WithNavigation from '../Components/WithNavigation';

export default function PersonalDataPage() {
    return (
        <WithNavigation>
            <PersonalAssets />
        </WithNavigation>
    );
}
