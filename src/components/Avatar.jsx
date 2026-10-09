import avatarSrc from '../assets/Parship.png';

export function Avatar() {
  return (
    <div className="avatar">
      <img src={avatarSrc} alt="" width={84} height={84} decoding="async" />
    </div>
  );
}
