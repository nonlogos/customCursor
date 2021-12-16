import { useEffect } from 'react';
import { GlobalStyles } from './styles';

import CustomCursor from './components/customCursor/CustomCursor.component';
import Nav from './components/nav/Nav.component';
import Card from './components/card/Card.component';
import { useCustomCursor } from './customHooks/useCustomCursor';

export default function App() {
  const {
    cursorPos,
    cursorEffect,
    isSticky,
    startEffect,
    endEffect,
  } = useCustomCursor();
  const cursorConfig = { cursorPos, cursorEffect, isSticky };
  return (
    <>
      <GlobalStyles />
      <h1>Custom Squishy Cursor with GSAP</h1>
      <Nav handleCursor={{ startEffect, endEffect }} isSticky={true} />
      <Card>
        <h2>This is a card</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sunt
          cum adipisci explicabo inventore tempora suscipit. Magni provident
          ducimus ex neque vitae. Exercitationem fugit laudantium odio ratione
          optio minus fuga.
        </p>
      </Card>
      <CustomCursor config={cursorConfig} isSquishy={true} />
    </>
  );
}
