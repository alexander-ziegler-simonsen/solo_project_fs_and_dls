import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ReactNode, useState } from "react";

type DeleteDialogProps<T> = {
    titleValue: string; 
    bodyData: T;
    OnDeleteFunc: Function;
}

function DeleteDialog<T extends ReactNode>({ titleValue, bodyData, OnDeleteFunc }: DeleteDialogProps<T>) {

    //console.log("EditDialog have been called");

    const [open, setOpen] = useState(false);

    let newLogic = () => {
        //console.log("newLogic was called");
        setOpen(false);
        OnDeleteFunc();
    }

    return (
        <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
            <Dialog.Trigger asChild>
                <Button bg={"danger"}>
                    <FontAwesomeIcon icon={faRemove} />
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg={"bg"}>
                        <Dialog.Header>
                            <Dialog.Title>{titleValue}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {bodyData}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button bg={"bg"} variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={() => newLogic()} bg={"danger"}>delete</Button>
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