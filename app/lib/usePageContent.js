'use client';
import { useEffect, useState } from 'react';

const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);

const deepMerge = (target, source) => {
  if (source === undefined) return target;
  if (Array.isArray(source)) return source;
  if (isObject(source)) {
    const out = { ...(isObject(target) ? target : {}) };
    for (const key of Object.keys(source)) {
      out[key] = deepMerge(out[key], source[key]);
    }
    return out;
  }
  return source;
};

export default function usePageContent(slug, defaults = {}) {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    fetch(`/api/pages/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.page?.data) {
          setContent(deepMerge(defaults, d.page.data));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return content;
}
