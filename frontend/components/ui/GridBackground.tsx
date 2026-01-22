export default function GridBackground() {
    return (
        <>
            {/* Background Layer */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(to bottom, #F5F4F0 0%, #F7F6F2 25%, #FAF9F6 50%, #FCFBF9 75%, #FFFFFF 100%)'
                }}
            />
            {/* Animated Grid Layer */}
            <div 
                className="absolute inset-0 z-[1]"
                style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    animation: 'gridMove 30s linear infinite',
                }}
            />
        </>
    );
}