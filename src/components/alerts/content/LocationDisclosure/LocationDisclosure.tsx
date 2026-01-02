import { useState } from 'react';
import { IconButton } from '@primer/react';
import { ChevronDownIcon, ChevronRightIcon, CopyIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import styles from './LocationDisclosure.module.css';

export interface LocationDisclosureProps {
    locationName: string;
    codeLines: { lineNumber: number; content: string; isHighlighted?: boolean }[];
    commitAuthor?: string;
    commitHash?: string;
    commitTime?: string;
    avatarUrl?: string;
}

export function LocationDisclosure({ locationName, codeLines, commitAuthor, commitHash, commitTime, avatarUrl }: LocationDisclosureProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.LocationDisclosure}>
            <div
                className={styles.DisclosureButton}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                <span className={styles.ChevronIcon}>
                    {isOpen ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                </span>
                <span className={styles.LocationName}>{locationName}</span>
                <IconButton
                    aria-label="Copy location"
                    icon={CopyIcon}
                    size="small"
                    variant="invisible"
                    className={styles.CopyButton}
                />
                <IconButton
                    aria-label="More options"
                    icon={KebabHorizontalIcon}
                    size="small"
                    variant="invisible"
                    className={styles.MenuButton}
                />
            </div>
            {isOpen && (
                <div className={styles.CodeContent}>
                    <div className={styles.CodeLinesContainer}>
                        {codeLines.map((line) => (
                            <div
                                key={line.lineNumber}
                                className={`${styles.CodeLine} ${line.isHighlighted ? styles.Highlighted : ''}`}
                            >
                                <span className={styles.LineNumber}>{line.lineNumber}</span>
                                <span className={styles.LineContent}>{line.content}</span>
                            </div>
                        ))}
                    </div>
                    {(commitAuthor || commitHash) && (
                        <div className={styles.CommitFooterContainer}>
                            <div className={styles.CommitFooter}>
                                <div className={styles.CommitInfo}>
                                    <div className={styles.CommitAvatar}>
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="User avatar" className={styles.AvatarImage} />
                                        ) : (
                                            '·'
                                        )}
                                    </div>
                                    <span className={styles.CommitText}>Add new stuff</span>
                                    <span className={styles.CommitHash}>{commitHash}</span>
                                </div>
                                {commitTime && <span className={styles.CommitTime}>{commitTime}</span>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
