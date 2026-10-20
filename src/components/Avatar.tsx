interface Props {
  src?: string;
  initials: string;
  color?: string;
}

/** Round avatar: the image if there is one, otherwise initials on a colored background. */
export default function Avatar({ src, initials, color = 'oklch(0.7 0.1 40)' }: Props) {
  return (
    <div className="avatar" style={{ background: color }}>
      {src ? // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" /> : initials}
    </div>
  );
}
