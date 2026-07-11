interface GitLogoProps {
  className?: string;
}

/**
 * Logo do Git: losangos em formato de grafo (estilo branching).
 * Usa currentColor pra herdar cor do contexto.
 */
export function GitLogo({ className }: GitLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Git"
    >
      {/* Commit principal (esquerda) */}
      <circle cx="20" cy="44" r="6" fill="currentColor" />
      {/* Linha do main */}
      <path d="M20 38 V20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {/* Commit do branch (direita) */}
      <circle cx="44" cy="20" r="6" fill="currentColor" />
      {/* Linha do branch */}
      <path d="M44 26 V44 H26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {/* Merge point */}
      <circle cx="20" cy="20" r="6" fill="currentColor" />
      {/* Head pointer */}
      <path d="M20 14 L20 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="6" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default GitLogo;
