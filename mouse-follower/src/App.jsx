import { useEffect, useState } from 'react';
import './App.css';

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('effect', { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    return () => {
      console.log('cleanup');
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    };
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#89f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25, // Ajusta la posición x
        top: -25,  // Ajusta la posición y
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App;
