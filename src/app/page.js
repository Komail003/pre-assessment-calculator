// app/PersonalData/page.jsx
"use client";
import { RecoilRoot } from "recoil";
import PersonalData from "./Components/PersonalData";
import WithNavigation from "./Components/WithNavigation";
import Homapage from "./FrontPage/page";

export default function Home() {
  return (
    <RecoilRoot>
      <WithNavigation>
        <Homapage />
      </WithNavigation>
    </RecoilRoot>
  );
}
