import { StyledNav } from '../../styles';
import { useBlob } from '../../customHooks/blobAnimation';

const links = ['Home', 'About', 'Gallery', 'Contact'];

const Nav = ({ handleCursor, isSticky = false, hoverEffect }) => {
  const { startEffect, endEffect } = handleCursor;
  const blobEffect = useBlob();

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    const effect = hoverEffect || blobEffect;
    if (hoverEffect || isSticky) {
      const pos = { left, top, width, height };
      startEffect(pos, effect, isSticky);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (hoverEffect || isSticky) {
      endEffect();
    }
  };

  return (
    <StyledNav>
      <ul>
        {links.map((link) => {
          return (
            <li
              key={link}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">{link}</a>
            </li>
          );
        })}
      </ul>
    </StyledNav>
  );
};

export default Nav;
