export default function VideoBackground({ src, className = '', poster }) {
  return (
    <video
      className={`video-cover ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
    />
  )
}
