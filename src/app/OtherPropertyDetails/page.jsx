// app/PersonalData/page.jsx
"use client";
import OtherPropertyDetails from '../Components/OtherPropertyDetails';
import WithNavigation from '../Components/WithNavigation';

export default function PersonalDataPage() {
    return (
        <WithNavigation>
            <OtherPropertyDetails />
        </WithNavigation>
    );
}
