// 90题（示例，需替换为完整题目）
const QUESTIONS = [
  "头痛","神经过敏，心中不踏实","头脑中有不必要的想法或字句盘旋","头昏或昏倒"
  // ... 请在此放入完整的 90 道题目
];

let cur = 0;
const answers = new Array(QUESTIONS.length).fill(null);

function el(id){return document.getElementById(id);}

function renderQ(){
  const q = QUESTIONS[cur];
  el('question-number').textContent = `问题 ${cur+1}/${QUESTIONS.length}`;
  el('question').textContent = q;
  const opts = el('options');
  opts.innerHTML = '';
  const optionValues = [
    {value:1, text:"从无"},
    {value:2, text:"轻度"},
    {value:3, text:"中度"},
    {value:4, text:"偏重"},
    {value:5, text:"严重"}
  ];
  optionValues.forEach(option=>{
    const label=document.createElement('label');
    label.className='option-label'+(answers[cur]===option.value?' selected':'');
    label.innerHTML=`<div class="option-value">${option.value}分</div><div class="option-text">${option.text}</div>`;
    label.addEventListener('click',()=>{
      answers[cur]=option.value;
      renderQ();
      setTimeout(()=>{
        if(cur<QUESTIONS.length-1){cur++;renderQ();}else{renderResult();}
      },600);
    });
    opts.appendChild(label);
  });
  el('progress-bar').style.width=((cur+1)/QUESTIONS.length*100)+'%';
  el('progress-text').textContent=`已完成: ${Math.round((cur+1)/QUESTIONS.length*100)}%`;
}

function renderResult(){
  el('quiz').classList.remove('active');
  el('result').classList.add('active');
  const total=answers.reduce((a,b)=>a+b,0);
  el('total-score').textContent=total;
  el('symptom-index').textContent=(total/QUESTIONS.length).toFixed(2);
  const positive=answers.filter(v=>v>1).length;
  el('positive-items').textContent=positive;
  el('negative-items').textContent=QUESTIONS.length-positive;
  el('positive-average').textContent=((total-(QUESTIONS.length-positive))/positive).toFixed(2);
}

document.getElementById('startBtn').addEventListener('click',()=>{
  document.getElementById('welcome-section').classList.remove('active');
  document.getElementById('quiz').classList.add('active');
  renderQ();
});

document.getElementById('restartBtn').addEventListener('click',()=>{
  location.reload();
});
