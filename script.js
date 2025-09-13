// ====== 90题 ======
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

const FACTORS = {
  "躯体化": [1,4,12,27,40,42,48,49,52,53,56,58,59],
  "强迫症状": [3,9,10,28,38,45,46,51,55,65],
  "人际敏感": [6,21,22,23,24,31,32,33,34],
  "抑郁": [5,14,15,20,25,26,29,30,31,32,54,71,79],
  "焦虑": [2,17,18,41,61,68,72,78,80,86],
  "敌对": [11,63,67,74,81,82],
  "恐怖焦虑": [13,35,36,37,62,84,85,87],
  "偏执": [8,18,43,68,75,76],
  "精神病性": [7,16,19,44,50,57,60,64,66,69,70,73,77,83,88,89,90]
};

let cur = 0;
const answers = new Array(QUESTIONS.length).fill(null);
const total = QUESTIONS.length;

function el(id){return document.getElementById(id);}

function getTokenFromUrl(){const u=new URL(location.href);return u.searchParams.get('t')||'';}
async function api(path,opts){const r=await fetch(path,opts);return r.json();}

function renderQ(){
  const q = QUESTIONS[cur];
  const box = el('questionBox');
  box.innerHTML = `<div class="q-title">第 ${cur+1} / ${total} 题：${q}</div>`;
  const opts = document.createElement('div');
  opts.className = 'options';
  for(let v=1; v<=5; v++){
    const div=document.createElement('div');
    div.className='option'+(answers[cur]===v?' selected':'');
    div.textContent=v;
    div.onclick=()=>{answers[cur]=v;renderQ();};
    opts.appendChild(div);
  }
  box.appendChild(opts);
  el('progress-bar').style.width=((cur+1)/total*100)+'%';
  el('prevBtn').disabled=cur===0;
  el('nextBtn').textContent=cur===total-1?'提交':'下一题';
}

function compute(vals){
  function mean(arr){return arr.reduce((a,b)=>a+b,0)/arr.length;}
  const factors={};
  for(const [name,items] of Object.entries(FACTORS)){
    const vs=items.map(i=>vals[i-1]).filter(v=>v!=null);
    factors[name]=+(mean(vs)).toFixed(2);
  }
  const totalMean=+(mean(vals)).toFixed(2);
  return {factors,total:totalMean};
}

function renderResult(r){
  el('quiz').classList.add('hidden');
  el('result').classList.remove('hidden');
  el('scoreSummary').innerHTML=`<p><strong>总均分：</strong>${r.total}</p>`;
  el('factorScores').innerHTML=Object.entries(r.factors).map(([k,v])=>`<div class="factor"><strong>${k}：</strong>${v}</div>`).join('');
  el('advice').textContent=r.total>=3?"建议：总均分偏高，心理困扰明显，应关注休息与专业支持。":"整体状态较平稳，请继续保持健康习惯。";
}

async function init(){
  const token=getTokenFromUrl();
  const gate=el('gate');const startBtn=el('startBtn');
  if(!token){gate.classList.remove('hidden');gate.textContent='缺少访问参数';startBtn.disabled=true;return;}
  const res=await api(`/api/token?token=${encodeURIComponent(token)}`);
  if(!res.ok){gate.classList.remove('hidden');gate.textContent=res.reason==='used'?'链接已被使用':'链接无效';startBtn.disabled=true;return;}
  startBtn.onclick=()=>{el('intro').classList.add('hidden');el('quiz').classList.remove('hidden');renderQ();};
  el('prevBtn').onclick=()=>{if(cur>0){cur--;renderQ();}};
  el('nextBtn').onclick=async()=>{
    if(cur<total-1){cur++;renderQ();}else{
      if(answers.includes(null)){alert('有题未答完');return;}
      const r=compute(answers);renderResult(r);
      await api(`/api/token?token=${encodeURIComponent(token)}`,{method:'POST'});
    }
  };
}

document.addEventListener('DOMContentLoaded',init);
