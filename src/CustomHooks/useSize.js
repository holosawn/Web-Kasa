import React, { useEffect, useState } from 'react'

const useSize = () => {
    const [size, setSize] = useState({x:window.innerWidth, y: window.innerHeight})

    useEffect(() => {
        function handleResize() {
          setSize({x:window.innerWidth, y:window.innerHeight})
        }
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return [size, setSize]
}

export default useSize
