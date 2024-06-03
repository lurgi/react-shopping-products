import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { MALL_MESSAGE_KO } from "../../constants/mallMessage/ko";

export const LanguageContext = createContext<{ messages: Record<string, string> } | null>(null);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language] = useState("ko");
  const [messages, setMessages] = useState(MALL_MESSAGE_KO);

  useEffect(() => {
    switch (language) {
      case "ko":
        setMessages(MALL_MESSAGE_KO);
        break;
      //이곳에 다른 언어를 추가합니다.
    }
  }, [language]);

  //   const switchLanguage = (lang) => {
  //     setLanguage(lang);
  //   };

  return <LanguageContext.Provider value={{ messages }}>{children}</LanguageContext.Provider>;
};
