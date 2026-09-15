import type { CSSProperties, ReactNode } from 'react'
import { useDraggable } from '../hooks/useDraggable'
import './FloatingObject.css'

interface FloatingObjectProps {
  children: ReactNode
  style?: CSSProperties
  rotation?: number
  delay?: number
  label?: string
}

export default function FloatingObject({
  children,
  style,
  rotation = 0,
  delay = 0,
  label,
}: FloatingObjectProps) {
  const { ref, isMobile, dragging, highlighted, handlers } = useDraggable()

  return (
    <div
      ref={ref}
      className={[
        'floater',
        dragging ? 'floater--dragging' : '',
        isMobile ? 'floater--mobile' : '',
        highlighted ? 'floater--highlighted' : '',
      ].filter(Boolean).join(' ')}
      style={style}
      {...handlers}
      role="group"
      aria-label={label}
    >
      <div
        className="floater__inner"
        style={{
          '--rot': `${rotation}deg`,
          '--delay': `${delay}s`,
        } as CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
