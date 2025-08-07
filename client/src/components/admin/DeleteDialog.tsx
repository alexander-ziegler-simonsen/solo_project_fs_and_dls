import { Button, CloseButton, Dialog, Portal, Spacer } from "@chakra-ui/react";


function DeleteDialog(titleValue: string, message: string, displayData: any, onDelete: Function) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>delete</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{titleValue}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>{message}</p>
                            <Spacer p={1} />
                            {displayData}
                            <Spacer p={2} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                onClick={() => onDelete}
                                backgroundColor={"red.700"}>delete</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default DeleteDialog