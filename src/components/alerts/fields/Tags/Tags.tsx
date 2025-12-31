import { Label } from "@primer/react";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import styles from "./Tags.module.css";

export interface TagsProps {
    tags?: string[];
}

export function Tags({ tags = ["Tag 1", "Tag 2", "Tag 3"] }: TagsProps) {
    return (
        <AlertMetadataField showDivider={true}>
            <AlertMetadataFieldTitle title="Tags" />
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
