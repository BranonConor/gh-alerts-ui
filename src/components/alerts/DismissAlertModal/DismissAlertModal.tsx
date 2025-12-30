"use client";
import { useState } from "react";
import {
    Dialog,
    FormControl,
    Radio,
    RadioGroup,
    Textarea,
    ActionList,
} from "@primer/react";
import styles from "./DismissAlert.module.css";

export interface DismissalReason {
    value: string;
    label: string;
    caption?: string;
}

export interface DismissAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDismiss: (reason: string, comment: string) => void;
    dismissalReasons?: DismissalReason[];
}

const DEFAULT_DISMISSAL_REASONS: DismissalReason[] = [
    {
        value: "false-positive",
        label: "Won't fix",
        caption: "This alert is inaccurate or incorrect",
    },
    {
        value: "wont-fix",
        label: "Risk is tolerable",
        caption: "The risk of this alert is tolerable to the organization",
    },
    {
        value: "used-in-tests",
        label: "Inaccurate",
        caption: "The alert is not correct and needs to be reviewed",
    },
];

export function DismissAlertModal({
    isOpen,
    onClose,
    onDismiss,
    dismissalReasons = DEFAULT_DISMISSAL_REASONS,
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
                    {dismissalReasons.map((reason) => (
                        <FormControl key={reason.value}>
                            <Radio value={reason.value} />
                            <FormControl.Label>{reason.label}</FormControl.Label>
                            {reason.caption && (
                                <FormControl.Caption>
                                    {reason.caption}
                                </FormControl.Caption>
                            )}
                        </FormControl>
                    ))}
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
