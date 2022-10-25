import { FC } from "react";
import { GridItem, VStack, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { TBackup, useDeleteBackup } from "../../../store";
import { parseDate, useDownloadBackup } from "../../../utilities";
import { DeleteConfirmation } from "../..";

export const Backup: FC<TBackup & { resource_name: string }> = ({
  resource_name,
  uuid,
  created_at,
  url,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteBackup = useDeleteBackup();
  const downloadBackup = useDownloadBackup();
  const hash = "#" + uuid.slice(0, 13);
  const backupName = hash + "//" + resource_name;

  const handleDelete = async () => {
    await deleteBackup({ ...props, url, uuid, created_at }, onClose);
  };

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
          <Text fontSize="15px" cursor="pointer" onClick={onOpen}>
            Delete
          </Text>
        </Flex>
      </VStack>
      <DeleteConfirmation
        title="Delete backup"
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
        networkOperation="delete.backup"
      >
        <Text>Are you sure you want to delete {hash}?</Text>
      </DeleteConfirmation>
    </GridItem>
  );
};
