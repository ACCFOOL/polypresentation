const examples = [
  ['Slide practice','05-practice','The presenter sees the current slide, cues for explaining its key ideas and a suggestion for what to say next.'],
  ['Rehearsal','04-rehearsal-press','The presenter delivers the Benefits slide while a virtual audience member listens.'],
  ['Audience Q&A','06-audience-qa','A virtual audience member asks what evidence supports a claim. The presenter can replay the question or record a spoken answer.'],
  ['Evaluation report','07-full-presentation-report','One complete sample report, from the overall evaluation and rubric scores to slide-level feedback, the action plan and report inputs. The scores illustrate this presentation, not a study outcome.'],
  ['Slide Revision Suggestions','08-slide-revision-suggestions','Slide-by-slide revision suggestions with reasons, editing instructions, and a downloadable editing prompt.']
];
const el = id => document.getElementById(id);
function select(i) {
  const [label,file,description] = examples[i];
  const isReport = file === '07-full-presentation-report';
  el('viewer').classList.toggle('report-view', isReport);
  el('viewer').setAttribute('aria-label', isReport ? 'Complete evaluation report' : label);
  el('viewer').scrollTop = 0;
  el('shot').src = el('large').href = 'assets/' + file + '.png';
  el('shot').alt = label + ': ' + description;
  el('label').textContent = 'Figure 3' + String.fromCharCode(97 + i) + '. ' + label + '.'; el('desc').textContent = description;
  el('panel').setAttribute('aria-labelledby','tab-' + i);
  Array.from(el('tabs').children).forEach((b,n) => {
    b.setAttribute('aria-selected',String(n === i)); b.tabIndex = n === i ? 0 : -1;
  });
}
examples.forEach(([label],i) => {
  const b = document.createElement('button'); b.id = 'tab-' + i; b.textContent = label;
  b.setAttribute('role','tab'); b.setAttribute('aria-controls','panel');
  b.onclick = () => select(i);
  b.onkeydown = e => {
    const n = examples.length;
    const j = {ArrowRight:(i+1)%n,ArrowDown:(i+1)%n,ArrowLeft:(i+n-1)%n,ArrowUp:(i+n-1)%n,Home:0,End:n-1}[e.key];
    if (j === undefined) return; e.preventDefault(); select(j); el('tab-'+j).focus();
  };
  el('tabs').append(b);
});
const requestedView = new URLSearchParams(location.search).get('view');
select(requestedView === 'report' ? 3 : requestedView === 'revision' ? 4 : 0);
