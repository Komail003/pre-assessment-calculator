// app/PersonalData/page.jsx
"use client";
import { RecoilRoot } from 'recoil';
import PersonalData from './Components/PersonalData';
import WithNavigation from './Components/WithNavigation';

export default function Home() {
  return (
    <RecoilRoot>
      <WithNavigation>
        <PersonalData />
      </WithNavigation>
    </RecoilRoot>
  );
}