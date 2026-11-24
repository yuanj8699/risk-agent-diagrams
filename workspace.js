const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const logToggle = document.getElementById('log-toggle');

function setLogOpen(open) {
  document.body.toggleAttribute('data-log-open', open);
  logToggle.setAttribute('aria-expanded', String(open));
  logToggle.textContent = open ? '收起记录' : '工作记录';
}

function selectDiagram() {
  const page = location.hash === '#architecture' ? 'architecture' : 'letter';
  for (const tab of tabs) {
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    const selected = panel.id === page;
    panel.hidden = !selected;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) {
      const frame = panel.querySelector('iframe');
      if (frame.dataset.src && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
      document.title = tab.textContent + ' · 风险图谱';
    }
  }
  setLogOpen(false);
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', () => setLogOpen(false));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = tabs[1 - index];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    event.preventDefault();
    next.focus();
    next.click();
  });
}
logToggle.addEventListener('click', () => setLogOpen(!document.body.hasAttribute('data-log-open')));
window.addEventListener('hashchange', selectDiagram);
selectDiagram();
