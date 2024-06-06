// Lordicon.js
import React, { useEffect, useRef } from 'react';

const Lordicon = ({ src, trigger, style }) => {
  const ref = useRef();

  useEffect(() => {
    if (window.LordiconElement) {
      window.LordiconElement.prototype.connectedCallback.call(ref.current);
    }
  }, []);

  return <lord-icon ref={ref} src={src} trigger={trigger} style={style}></lord-icon>;
};

export default Lordicon;
