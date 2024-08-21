// app/PersonalData/page.jsx
"use client";
import PropertyDetails from '../Components/PropertyDetails';
import WithNavigation from '../Components/WithNavigation';

export default function PersonalDataPage() {
    return (
        <WithNavigation>
            <PropertyDetails />
        </WithNavigation>
    );
}
