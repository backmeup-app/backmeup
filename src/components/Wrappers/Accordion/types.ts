import { AccordionProps } from "@chakra-ui/accordion";

export type TAccordion = AccordionProps & {
  items: TAccordionItem[];
};

export type TAccordionItem = {
  heading: JSX.Element;
  content: JSX.Element;
};
