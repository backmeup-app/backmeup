import { FC } from "react";
import { GridItem, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import { TBackup } from "../../../store";
import { parseDate, useDownloadBackup } from "../../../utilities";

export const Backup: FC<TBackup & { resource_name: string }> = ({
  resource_name,
  uuid,
  created_at,
  url,
}) => {
  const downloadBackup = useDownloadBackup();
  const hash = "#" + uuid.slice(0, 13);
  const backupName = hash + "//" + resource_name;

  return (
    <GridItem colSpan={{ base: 12, md: 6 }} boxShadow="sm" bg="white" p={4}>
      <VStack spacing={4} align="flex-start" w="100%">
        <Flex justify="space-between" align="center" w="100%">
          <Text fontWeight={500}>{hash}</Text>
          <Text
            fontSize="14px"
            borderBottom="1px dashed"
            borderBottomColor="charlestonGreen"
            cursor="pointer"
            onClick={() => {
              downloadBackup(backupName, url);
            }}
          >
            Download
          </Text>
        </Flex>
        <Flex justify="space-between" align="center" w="100%">
          <Text fontSize="15.5px">{parseDate(created_at)}</Text>
          <Text fontSize="15px">Delete</Text>
        </Flex>
      </VStack>
    </GridItem>
  );
};
