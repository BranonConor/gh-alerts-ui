import { ReactNode } from 'react';
import styles from './DescriptionBox.module.css';

interface DescriptionSection {
    leadingVisual?: ReactNode;
    title: string;
    caption?: ReactNode;
    trailingContent?: ReactNode;
    content: ReactNode;
}

export interface DescriptionBoxProps {
    sections: DescriptionSection[];
}

export function DescriptionBox({ sections }: DescriptionBoxProps) {
    return (
        <div className={styles.DescriptionBox}>
            {sections.map((section, index) => (
                <div key={index} className={styles.Section}>
                    <div className={styles.TitleSection}>
                        <div className={styles.TitleLeft}>
                            {section.leadingVisual && (
                                <div className={styles.LeadingVisual}>
                                    {section.leadingVisual}
                                </div>
                            )}
                            <h3 className={styles.Title}>{section.title}</h3>
                            {section.caption && (
                                <span className={styles.Caption}>{section.caption}</span>
                            )}
                        </div>
                        {section.trailingContent && (
                            <div className={styles.TrailingContent}>
                                {section.trailingContent}
                            </div>
                        )}
                    </div>
                    <div className={styles.ContentSection}>
                        {section.content}
                    </div>
                </div>
            ))}
        </div>
    );
}
