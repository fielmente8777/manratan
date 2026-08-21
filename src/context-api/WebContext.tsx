"use client";
import { createContext, useContext, useState } from "react";

interface WebContextProps {
  imgCurrentIndex: number;
  imageArray: string[];
  isOpenPillarPopup: boolean;
  isOpenPopUpForm: boolean;
  isOpenPopUpForm2: boolean;
  isOpenImagePopup: boolean;
  isOpenNavBar: boolean;
  pillarPopupData: { title: string; description: string };
  setIsOpenPopUpForm: (value: boolean) => void;

  setPillarPopupData: (value: { title: string; description: string }) => void;
  setIsOpenPillarPopup: (value: boolean) => void;
  setImgCurrentIndex: (value: number) => void;
  setImageArray: (value: string[]) => void;
  setIsOpenImagePopup: (value: boolean) => void;
  setIsOpenPopUpForm2: (value: boolean) => void;
  setIsOpenNavBar: React.Dispatch<React.SetStateAction<boolean>>;


  handleImagePopup: (index: number, imageArray: string[]) => void;
}

export const WebContext = createContext<WebContextProps>({
  imgCurrentIndex: 0,
  isOpenPopUpForm: false,
  isOpenPillarPopup: false,
  imageArray: [],
  isOpenImagePopup: false,
  pillarPopupData: { title: "", description: "" },
  isOpenPopUpForm2: false,
  setIsOpenPopUpForm2: () => {},
  setImgCurrentIndex: () => {},
  setIsOpenPopUpForm: () => {},
  setPillarPopupData: () => {},
  setIsOpenPillarPopup: () => {},
  setImageArray: () => {},
  setIsOpenImagePopup: () => {},
  handleImagePopup: () => {},
  isOpenNavBar: false,
  setIsOpenNavBar: () => {},
});

interface WebProviderProps {
  children: React.ReactNode;
}
export const WebProvider: React.FC<WebProviderProps> = ({ children }) => {
  const [pillarPopupData, setPillarPopupData] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [isOpenPillarPopup, setIsOpenPillarPopup] = useState(false);
  const [isOpenPopUpForm, setIsOpenPopUpForm] = useState(false);

  const [imgCurrentIndex, setImgCurrentIndex] = useState(0);
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [isOpenImagePopup, setIsOpenImagePopup] = useState(false);
  const [isOpenPopUpForm2, setIsOpenPopUpForm2] = useState(false);

  const [isOpenNavBar, setIsOpenNavBar] = useState(false);

  // image popup handler
  const handleImagePopup = (index: number, imageArray: string[]) => {
    setImgCurrentIndex(index);
    setIsOpenImagePopup(true);
    setImageArray(imageArray);
  };

  const value = {
    isOpenPopUpForm2,
    setIsOpenPopUpForm2,
    imageArray,
    setImageArray,
    imgCurrentIndex,
    isOpenImagePopup,
    setIsOpenImagePopup,
    setImgCurrentIndex,
    pillarPopupData,
    setPillarPopupData,
    isOpenPillarPopup,
    setIsOpenPillarPopup,
    isOpenPopUpForm,
    setIsOpenPopUpForm,
    handleImagePopup,
    isOpenNavBar,
    setIsOpenNavBar,
  };
  return <WebContext.Provider value={value}>{children}</WebContext.Provider>;
};

export const useWebContext = () => {
  const context = useContext(WebContext);
  if (!context) {
    throw new Error("useWebContext must be used within a WebProvider");
  }
  return context;
};
