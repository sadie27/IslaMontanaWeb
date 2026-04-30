interface ErrorHeaderProps {
  type: '404' | '500'
  isMobile: boolean
}

export default function ErrorHeader({ type, isMobile }: ErrorHeaderProps) {
  const is404 = type === '404'

  return (
    <>
      {/* Error badge */}
      <div className="error-page__badge fade-up fade-up-1">
        <span className="error-page__badge-pill">
          <span className="error-page__badge-dot" />
          ERROR {type}
        </span>
      </div>

      {/* Headline */}
      <h1
        className="error-page__headline fade-up fade-up-2"
        style={{ fontSize: isMobile ? 'clamp(44px, 12vw, 68px)' : 'clamp(64px, 6vw, 96px)' }}
      >
        {is404
          ? <><span>Esta ruta</span><br /><span style={{ color: '#abd430' }}>no existe.</span></>
          : <><span>Algo salió</span><br /><span style={{ color: '#abd430' }}>mal.</span></>
        }
      </h1>

      {/* Subtitle */}
      <p
        className="error-page__subtitle fade-up fade-up-3"
        style={{
          fontSize: isMobile ? 15 : 18,
          marginBottom: isMobile ? 36 : 48,
        }}
      >
        {is404
          ? 'La página que buscas no existe o ha sido movida. Pero Ecuador sigue ahí, esperándote.'
          : 'Algo falló en nuestro servidor. Estamos trabajando para resolverlo. Intenta de nuevo en unos minutos.'}
      </p>
    </>
  )
}
