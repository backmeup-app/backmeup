import { FC } from "react";
import { Accordion as ChakraAccordion, AccordionItem } from "@chakra-ui/react";
import { TAccordion } from "./types";

export const Accordion: FC<TAccordion> = ({ items, ...props }) => {
  const displayItems = () =>
    items.map(({ heading, content }, index) => (
      <AccordionItem mb={0} key={index} py={0} w="100%">
        {heading}
        {content}
      </AccordionItem>
    ));

  return (
    <ChakraAccordion allowToggle {...props}>
      {displayItems()}
    </ChakraAccordion>
  );
};
