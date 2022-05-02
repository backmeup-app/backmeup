import { FC } from "react";
import { Accordion as ChakraAccordion, AccordionItem } from "@chakra-ui/react";
import { TAccordion } from "./types";

export const Accordion: FC<TAccordion> = ({ items }) => {
  const displayItems = () =>
    items.map(({ heading, content }, index) => (
      <AccordionItem key={index} py={0}>
        {heading}
        {content}
      </AccordionItem>
    ));

  return (
    <ChakraAccordion mb={2} allowToggle>
      {displayItems()}
    </ChakraAccordion>
  );
};
