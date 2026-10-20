/** Drop anything that could run script from HTML before it is rendered or edited. Browser only. */
export function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style, iframe, object, embed, link, meta').forEach((n) => n.remove());
  doc.body.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const bad = attr.name.startsWith('on') || (attr.name === 'href' && /^\s*javascript:/i.test(attr.value));
      if (bad) el.removeAttribute(attr.name);
    }
  });
  return doc.body.innerHTML;
}
