// app/PersonalData/page.jsx
"use client";
import IncomeDetails from '../Components/IncomeDetails';
import PersonalData from '../Components/PersonalData';
import WithNavigation from '../Components/WithNavigation';

export default function PersonalDataPage() {
    return (
        <WithNavigation>
            <IncomeDetails />
        </WithNavigation>
    );
}
