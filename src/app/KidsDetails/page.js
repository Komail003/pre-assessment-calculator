// app/PersonalData/page.jsx
"use client";
import PersonalData from '../Components/PersonalData';
import KidsDetails from '../Components/KidsDetails';
import WithNavigation from '../Components/WithNavigation';

export default function KidsDetailsPage() {
    return (
        <WithNavigation>
            <KidsDetails />
        </WithNavigation>
    );
}
