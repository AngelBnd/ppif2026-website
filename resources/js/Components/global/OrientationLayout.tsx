import type { ReactNode } from 'react';

type OrientationLayoutProps = {
    children: ReactNode;
};

export default function OrientationLayout({
    children,
}: OrientationLayoutProps) {
    return (
        <>
            {/* Normal website content */}
            <div className="landscape-content">{children}</div>

            {/* Portrait warning screen */}
            <div className="portrait-warning">
                <div className="portrait-warning-card">
                    <h1>Please rotate your screen</h1>
                    <p>This website is best viewed in landscape mode.</p>
                </div>
            </div>
        </>
    );
}
