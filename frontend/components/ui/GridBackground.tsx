export default function GridBackground() {
    return (
        <>
            {/* Background Layer */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(to bottom, #E3F2FD 0%, #E8F4FD 25%, #F0F8FF 50%, #F8FBFF 75%, #FFFFFF 100%)'
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