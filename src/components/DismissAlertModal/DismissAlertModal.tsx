"use client";
import { useState } from "react";
import {
    Dialog,
    Button,
    FormControl,
    Radio,
    RadioGroup,
    Textarea,
    Box,
    ActionList,
} from "@primer/react";
import styles from "./DismissAlert.module.css";

interface DismissAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDismiss: (reason: string, comment: string) => void;
}

export function DismissAlertModal({
    isOpen,
    onClose,
    onDismiss,
}: DismissAlertModalProps) {
    const [selectedReason, setSelectedReason] = useState("");
    const [comment, setComment] = useState("");

    const handleDismiss = () => {
        if (selectedReason) {
            onDismiss(selectedReason, comment);
            // Reset form
            setSelectedReason("");
            setComment("");
            if (typeof onClose === 'function') {
                onClose();
            }
        }
    };

    const handleCancel = () => {
        // Reset form
        setSelectedReason("");
        setComment("");
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog
            onClose={handleCancel}
            title="Dismiss alert"
            footerButtons={
                [
                    { buttonType: 'default', content: 'Cancel', onClick: handleCancel },
                    { buttonType: 'primary', content: 'Dismiss', onClick: handleDismiss, disabled: !selectedReason },
                ]
            }
        >
            <div className={styles.DialogContent}>
                <RadioGroup
                    name="dismiss-reason"
                    onChange={(value) => setSelectedReason(value as string)}
                    required
                    className={styles.RadioGroup}
                >
                    <RadioGroup.Label className={styles.RadioGroupLabel}>
                        Select a reason to dismiss this alert.
                    </RadioGroup.Label>
                    <FormControl>
                        <Radio value="false-positive" />
                        <FormControl.Label>Won't fix</FormControl.Label>
                        <FormControl.Caption>
                            This alert is inaccurate or incorrect
                        </FormControl.Caption>
                    </FormControl>
                    <FormControl>
                        <Radio value="wont-fix" />
                        <FormControl.Label>Risk is tolerable</FormControl.Label>
                        <FormControl.Caption>
                            The risk of this alert is tolerable to the organization
                        </FormControl.Caption>
                    </FormControl>
                    <FormControl>
                        <Radio value="used-in-tests" />
                        <FormControl.Label>Inaccurate</FormControl.Label>
                        <FormControl.Caption>
                            The alert is not correct and needs to be reviewed
                        </FormControl.Caption>
                    </FormControl>
                </RadioGroup>

                <ActionList.Divider />


                <FormControl className={styles.CommentBox}>
                    <FormControl.Label className={styles.CommentLabel}>Dismissal comment</FormControl.Label>
                    <Textarea
                        placeholder="Add a comment about this dismissal"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        className={styles.TextArea}
                    />
                </FormControl>

            </div>
        </Dialog>
    );
}
