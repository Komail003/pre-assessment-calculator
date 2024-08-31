// recoilState.js
import { atom } from 'recoil';

export const selectedGoalsState = atom({
  key: 'selectedGoalsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const childrenDetailsState = atom({
  key: 'childrenDetailsState',
  default: {
    anyKids: 'No', // default value
    children: [],
  },
});
  export const personalAssetsState = atom({
    key: "personalAssetsState", // unique ID (with respect to other atoms/selectors)
    default: {
      husbandCars: "",
      partnerCars: "",
      husbandHousehold: "",
      husbandBoat: "",
      husbandCaravan: "",
      creditCards: "",
      partnerCredit: "",
      personelLoan: "",
      partnerPersonelLoan: "",
    }, // default value (aka initial state)
  });

  export const personalDataState = atom({
    key: 'personalDataState',
    default: {
      relationShipStatus: 'single',
      partnerRelationShipStatus: 'couple',
      firstName: '',
      partnerFirstName: '',
      surName: '',
      partnerSurName: '',
      preferredName: '',
      partnerPreferredName: '',
      DOB: '',
      partnerDOB: '',
      email: '',
      partnerEmail: '',
      phoneNumber: '',
      partnerPhoneNumber: '',
      occupation: '',
      partnerOccupation: ''
    },
  });

  export const incomeDetailsState = atom({
    key: 'incomeDetailsState', // unique ID (with respect to other atoms/selectors)
    default: {
      employmentIncome: '',
      partnerEmploymentIncome: '',
      businessIncome: '',
      partnerBusinessIncome: '',
      centrelinkPayments: '',
      partnerCentrelinkPayments: '',
      superPensionPayments: '',
      partnerSuperPensionPayments: '',
    }, // default value (aka initial value)
  });
  export const propertyDetailsState = atom({
    key: "propertyDetailsState",
    default: {
      propertyValue: "",
      loanBalance: "",
      rentReceived: "",
      rentFrequency: "",
    },
  });
  export const financialAssetsState = atom({
    key: "financialAssetsState",
    default: {
      bankAccounts: { you: "", partner: "" },
      super: { you: "", partner: "" },
      shares: { you: "", partner: "" },
      managedFunds: { you: "", partner: "" },
      pension: { you: "", partner: "" },
    },
  });
  export const otherPropertyDetailsState = atom({
    key: "otherPropertyDetailsState",
    default: {
      otherProperties: "No",
      properties: [], // Array to hold multiple property details
    },
  });