import ChevronDown from "../../icons/ChevronDown";
import ChevronUp from "../../icons/ChevronUp";
import { useEffect, useRef, useState } from "react";
import S from "./styledComponent";
import useCustomContext from "../../../hooks/useCustomContext";
import { LanguageContext } from "../../provider/LanguageProvider";

interface DropdownProps<T extends string> {
  options: readonly T[];
  handleChange: (option: T) => void;
}

function Dropdown<T extends string>({ options, handleChange }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultOption = options[0];
  const [selectedOption, setSelectedOption] = useState<T>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { messages } = useCustomContext(LanguageContext);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    setIsOpen(false);
    handleChange(option);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <S.DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      <S.DropdownLabel>
        {messages[selectedOption]}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </S.DropdownLabel>
      {isOpen && (
        <S.DropdownList>
          {options.map((option: T) => (
            <S.DropdownOption key={`dropdown-${option}`} onClick={() => handleSelect(option)}>
              {messages[option]}
            </S.DropdownOption>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default Dropdown;
