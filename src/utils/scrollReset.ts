export function resetWindowScrollToTop() {
  const html = document.documentElement;
  const body = document.body;
  const previousHtmlScrollBehavior = html.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  body.scrollTop = 0;
  html.style.scrollBehavior = previousHtmlScrollBehavior;
  body.style.scrollBehavior = previousBodyScrollBehavior;
}
