'use client';

import React, { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { Skeleton } from '@/components/ui/skeleton';

type MermaidDiagramProps = {
  code: string;
};

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const id = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        if (code) {
          const { svg: renderedSvg } = await mermaid.render(id, code);
          if (isMounted) {
            setSvg(renderedSvg);
            setError(null);
          }
        }
      } catch (e: any) {
        if (isMounted) {
          setError('Failed to render diagram. The generated code may be invalid.');
          console.error(e);
        }
      }
    };
    renderDiagram();
    return () => {
      isMounted = false;
    };
  }, [code, id]);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  
  if (!svg) {
    return <Skeleton className="w-full h-64" />;
  }

  return <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
}
