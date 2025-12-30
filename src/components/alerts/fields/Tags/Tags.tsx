import { useState } from "react";
import { Label, AnchoredOverlay } from "@primer/react";
import { GearIcon } from "@primer/octicons-react";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import styles from "./Tags.module.css";

export interface TagsProps {
    tags?: string[];
}

export function Tags({ tags = ["Tag 1", "Tag 2", "Tag 3"] }: TagsProps) {
    const [isTagsOpen, setIsTagsOpen] = useState(false);

    return (
        <AlertMetadataField showDivider={true}>
            <AnchoredOverlay
                open={isTagsOpen}
                onOpen={() => setIsTagsOpen(true)}
                onClose={() => setIsTagsOpen(false)}
                width="medium"
                renderAnchor={(props) => (
                    <AlertMetadataFieldTitle
                        {...props}
                        title="Tags"
                        isInteractive={true}
                        trailingVisual={<GearIcon />}
                        onClick={() => setIsTagsOpen(!isTagsOpen)}
                    />
                )}
            >
                <div className={styles.OverlayContent}>Tags overlay content</div>
            </AnchoredOverlay>
            <AlertMetadataFieldContent>
                <div className={styles.LabelWrapper}>
                    {tags.map((tag, index) => (
                        <Label key={index} variant="default">{tag}</Label>
                    ))}
                </div>
            </AlertMetadataFieldContent>
        </AlertMetadataField>
    );
}
