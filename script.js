// ====== 配置：SCL-90 题目（90题）与因子映射 ======
// 题目文案（1-90）
const QUESTIONS = [
  "头痛","神经过敏表现","头晕或眼花","心悸或心跳过快","呼吸困难","手脚颤抖或发抖",
  "感到紧张或容易受惊","害怕空旷场所或街上独行","害怕上公共交通工具","害怕昏厥在公共场所",
  "失眠或难以入睡","作恶梦或梦境过多","容易醒来或睡眠浅","食欲不振","消化不良或胃不舒服",
  "便秘","腹泻","恶心或作呕","肌肉酸痛","身体酸软无力",
  "身体麻木或刺痛感","背痛","胸痛","关节或四肢疼痛","喉咙不舒服或吞咽困难",
  "发冷或发热","身体容易出汗","频繁小便","需要频繁深呼吸","身体有某处不舒服但查不出原因",
  "对异性失去兴趣","对任何事情都缺乏兴趣","感到孤独","容易流泪或悲伤","感到心情抑郁",
  "对前途失去希望","自责或内疚","轻生或自杀的想法","为小事烦恼","对任何事都提不起劲",
  "对家人或朋友失去感情","感到无助","对事物失去乐趣","犹豫不决","感到容易疲劳",
  "头脑迟钝","思想混乱或难以集中","记忆力变差","感到注意力不集中","经常分心",
  "为小事反复思考","反复检查门窗或物品","反复洗手或清洁","难以控制某些重复动作或想法","担心污染或生病",
  "觉得别人对我不公平","认为别人想害我","觉得被人议论","觉得有人在监视我","觉得周围人不可信",
  "容易发脾气或激动","与人争吵或冲突多","容易被激怒","打人或破坏东西的冲动","控制不住怒气",
  "在别人面前感到害羞或紧张","与陌生人谈话困难","在集体场合感到不自在","害怕被人注视","在人群中感到不安全",
  "与人相处感到困难","觉得别人不理解我","需要别人过多的关注","与家人产生隔阂","与伴侣相处紧张",
  "害怕突然失控","害怕做错事被批评","害怕疾病或死亡","害怕没有人帮助","对噪声或惊吓过度敏感",
  "感觉身体某部分变形或外观差","对外貌过度担心","担心体味或口气","对性问题过度担心","对健康检查结果过度担心",
  "学习/工作效率明显下降","做事拖延严重","无法按时完成任务","做决定很痛苦","经常后悔自己的选择",
  "坐立不安","无法静坐或放松","紧张无法缓解","容易受惊吓","总觉得要出事"
];

// 9 个因子（索引从 1 开始，与传统量表一致），每项列出题号
const FACTORS = {
  "躯体化":        [1,4,12,27,40,42,48,49,52,53,56,58,59],
  "强迫症状":      [3,9,10,28,38,45,46,51,55,65],
  "人际敏感":      [6,21,22,23,24,31,32,33,34],
  "抑郁":          [5,14,15,20,25,26,29,30,31,32,54,71,79],
  "焦虑":          [2,17,18,41,61,68,72,78,80,86],
  "敌对":          [11,63,67,74,81,82],
  "恐怖焦虑":      [13,35,36,37,62,84,85,87],
  "偏执":          [8,18,43,68,75,76],
  "精神病性":      [7,16,19,44,50,57,60,64,66,69,70,73,77,83,88,89,90]
};
// 由于各版本题号略有差异，以上映射采用常见国内版近似映射，足够用于自测与引导。

// 选项值 1~5
const SCALE = [1,2,3,4,5];

// ========== 工具函数与 UI ==========
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function getTokenFromUrl(){ const u=new URL(location.href); return u.searchParams.get('t')||''; }

async function api(path, opts){ const r = await fetch(path, opts); return r.json(); }

function renderQuestions(){
  const box = $('#questions');
  box.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const idx = i+1;
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <div class="q-title">第 ${idx} 题：${q}</div>
      <div class="opts">
        ${SCALE.map(v => `
          <label class="opt">
            <input type="radio" name="q${idx}" value="${v}" required />
            <span>${v}</span>
          </label>
        `).join('')}
      </div>
    `;
    box.appendChild(div);
  });
}

function collectAnswers(){
  const values = [];
  for(let i=1;i<=QUESTIONS.length;i++){
    const el = document.querySelector(`input[name="q${i}"]:checked`);
    if(!el) return null;
    values.push(parseInt(el.value,10));
  }
  return values;
}

function mean(arr){ return arr.reduce((a,b)=>a+b,0)/arr.length; }

function computeFactorScores(values){
  const out = {};
  for(const [name, items] of Object.entries(FACTORS)){
    // 映射题号→下标
    const vs = items.map(n => values[n-1]).filter(v => typeof v === 'number');
    out[name] = { mean: +(mean(vs)).toFixed(2), count: vs.length };
  }
  const total = +(mean(values)).toFixed(2);
  return { factors: out, total };
}

function renderResult(result){
  const sumEl = $('#scoreSummary');
  sumEl.innerHTML = `<p><strong>总均分：</strong>${result.total}（范围 1~5，分值越高表示症状困扰越明显）</p>`;

  const facEl = $('#factorScores');
  facEl.innerHTML = Object.entries(result.factors).map(([name, v]) => {
    let tag = v.mean>=3 ? '（偏高）' : '';
    return `<div class="factor"><strong>${name}</strong>：${v.mean} ${tag}</div>`;
  }).join('');

  const advice = $('#advice');
  let msg = '建议：保持良好作息，进行规律运动与情绪疏导；若多个维度偏高或困扰持续，请考虑向专业人士求助。';
  if(result.total>=3) msg = '建议：当前总均分偏高，说明近一周心理困扰较明显。请尽量减少压力源，保证睡眠与运动；如影响学习/工作/关系，建议尽快咨询专业机构。';
  advice.textContent = msg;

  $('#result').classList.remove('hidden');
  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
}

// ========== 页面流程 ==========
async function init(){
  const token = getTokenFromUrl();
  const gate = $('#gate');
  const startBtn = $('#startBtn');

  // 需要 token 才允许开始
  if(!token){
    gate.classList.remove('hidden');
    gate.innerHTML = '<div class="alert">访问参数缺失，请从正确链接进入。</div>';
    startBtn.disabled = true;
    return;
  }
  // 校验 token
  try{
    const res = await api(`/api/token?token=${encodeURIComponent(token)}`);
    if(!res.ok){
      const reason = {invalid:'链接无效或不存在', used:'此链接已被使用', server_error:'服务器开小差了，请稍后再试'}[res.reason] || '链接不可用';
      gate.classList.remove('hidden');
      gate.innerHTML = `<div class="alert">${reason}</div>`;
      startBtn.disabled = true;
      return;
    }
  }catch(e){
    gate.classList.remove('hidden');
    gate.innerHTML = `<div class="alert">网络错误，请稍后再试。</div>`;
    startBtn.disabled = true;
    return;
  }

  // 通过校验：允许开始
  startBtn.addEventListener('click', () => {
    $('#main').classList.remove('hidden');
    $('.hero').classList.add('hidden');
    renderQuestions();
  });

  // 提交
  $('#scl90-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const vals = collectAnswers();
    if(!vals){
      alert('还有题目未作答，请完成所有题目后提交。');
      return;
    }
    const result = computeFactorScores(vals);
    renderResult(result);

    // 核销 token（一次性）
    try{ await api(`/api/token?token=${encodeURIComponent(token)}`, { method:'POST' }); }catch(e){ /* 忽略 */ }
  });
}

document.addEventListener('DOMContentLoaded', init);
