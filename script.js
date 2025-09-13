// ====================== 90道题 ======================
const questions = [
  "头痛","神经过敏，心中不踏实","头脑中有不必要的想法或字句盘旋","头昏或昏倒","对异性的兴趣减退",
  "对旁人责备求全","感到别人能控制您的思想","责怪别人制造麻烦","忘记性大","担心自己的衣饰整齐及仪态的端正",
  "容易烦恼和激动","胸痛","害怕空旷的场所或街道","感到自己的精力下降，活动减慢","想结束自己的生命",
  "听到旁人听不到的声音","发抖","感到大多数人都不可信任","胃口不好","容易哭泣",
  "同异性相处时感到害羞不自在","感到受骗，中了圈套或有人想抓住您","无缘无故地突然感到害怕","自己不能控制地大发脾气","怕单独出门",
  "经常责怪自己","腰痛","感到难以完成任务","感到孤独","感到苦闷",
  "过分担忧","对事物不感兴趣","感到害怕","您的感情容易受到伤害","旁人能知道您的私下想法",
  "感到别人不理解您、不同情您","感到人们对您不友好，不喜欢您","做事必须做得很慢以保证做得正确","心跳得很厉害","恶心或胃部不舒服",
  "感到比不上他人","肌肉酸痛","感到有人在监视您、谈论您","难以入睡","做事必须反复检查",
  "难以作出决定","怕乘电车、公共汽车、地铁或火车","呼吸有困难","一阵阵发冷或发热","因为感到害怕而避开某些东西、场合或活动",
  "脑子变空了","身体发麻或刺痛","喉咙有梗塞感","感到前途没有希望","不能集中注意",
  "感到身体的某一部分软弱无力","感到紧张或容易紧张","感到手或脚发重","想到死亡的事","吃得太多",
  "当别人看着您或谈论您时感到不自在","有一些不属于您自己的想法","有想打人或伤害他人的冲动","醒得太早","必须反复洗手、点数目或触摸某些东西",
  "睡得不稳不深","有想摔坏或破坏东西的冲动","有一些别人没有的想法或念头","感到对别人神经过敏","在商店或电影院等人多的地方感到不自在",
  "感到做任何事情都很困难","一阵阵恐惧或惊恐","感到在公共场合吃东西很不舒服","经常与人争论","单独一人时神经很紧张",
  "别人对您的成绩没有作出恰当的评价","即使和别人在一起也感到孤单","感到坐立不安心神不定","感到自己没有什么价值","感到熟悉的东西变成陌生或不像是真的",
  "大叫或摔东西","害怕会在公共场合昏倒","感到别人想占您的便宜","为一些有关性的想法而很苦恼","认为应该因为自己的过错而受到惩罚",
  "感到要很快把事情做完","感到自己的身体有严重问题","从未感到和其他人很亲近","感到自己有罪","感到自己的脑子有毛病"
];

// ====================== 因子分类 ======================
const factors = {
  "躯体化": { indices: [0,3,11,26,39,46,50,56,68,76], explanation: "主要反映身体化不适症状，如头痛、胸痛、胃肠道不适等。" },
  "强迫症状": { indices: [1,2,8,27,36,44,53,62,65,74], explanation: "反映强迫观念和行为，如反复检查、无法控制的想法等。" },
  "人际关系敏感": { indices: [5,20,33,35,37,41,60,64,69,78], explanation: "反映在与他人交往时的不适感和自卑感。" },
  "抑郁": { indices: [4,13,14,28,29,30,38,52,63,71,79,85,88], explanation: "反映兴趣减退、情绪低落、自责和悲观等症状。" },
  "焦虑": { indices: [10,22,31,34,42,55,67,73,80,86], explanation: "反映紧张、坐立不安、担忧和恐惧等症状。" },
  "敌对": { indices: [6,21,23,40,58,70,81,84,89], explanation: "反映敌对情绪和行为，如争论、发火、摔东西等。" },
  "恐怖": { indices: [12,24,45,47,49,59,61,72,77,82], explanation: "反映特定恐惧，如对空旷场所、人群、乘车等的恐惧。" },
  "偏执": { indices: [7,16,17,32,43,51,57,66,75,83], explanation: "反映偏执观念，如怀疑、被害感、不信任他人等。" },
  "精神病性": { indices: [9,18,25,44,48,54,62,73,79,87], explanation: "反映精神病性症状，如幻听、思维异常、孤僻等。" },
  "其他（睡眠/饮食等）": { indices: [19,25,39,48,55,60,64,71,79], explanation: "反映睡眠及饮食相关问题，如失眠、多梦、食欲不振等。" }
};

// ====================== 状态 ======================
let currentQuestion = 0;
let answers = new Array(90).fill(0);
let startTime = null;

// ====================== DOM ======================
const welcomeSection = document.getElementById('welcome-section');
const testSection = document.getElementById('test-section');
const resultSection = document.getElementById('result-section');
const questionElement = document.getElementById('question');
const questionNumber = document.getElementById('question-number');
const optionsContainer = document.getElementById('options');
const progressBar = document.getElementById('test-progress');
const progressText = document.getElementById('progress-text');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-test');
const gate = document.getElementById('gate');

// ====================== 一次性链接校验 ======================
function getTokenFromUrl(){
  try { return new URL(location.href).searchParams.get('t') || ''; }
  catch(e){ return ''; }
}
async function api(path,opts){
  try { const r = await fetch(path,opts); return await r.json(); }
  catch(e){ return {ok:false,reason:'server_error'}; }
}
async function initGate(){
  const token = getTokenFromUrl();
  if(!token){
    gate.classList.remove('hidden');
    gate.textContent = '缺少访问参数';
    startBtn.disabled = true;
    return;
  }
  const res = await api(`/api/token?token=${encodeURIComponent(token)}`);
  if(!res.ok){
    gate.classList.remove('hidden');
    gate.textContent = res.reason==='used'?'链接已被使用':'链接无效';
    startBtn.disabled = true;
    return;
  }
  startBtn.disabled = false;
}

// ====================== 初始化 ======================
document.addEventListener('DOMContentLoaded', () => {
  initGate();
  startBtn.addEventListener('click', startTest);
  document.getElementById('restart-test').addEventListener('click', restartTest);
});

// ====================== 开始测试 ======================
function startTest() {
  startTime = new Date();
  welcomeSection.classList.remove('active');
  testSection.classList.add('active');
  showQuestion(0);
  updateTimer();
}

// ====================== 显示题目 ======================
function showQuestion(index){
  currentQuestion = index;
  questionNumber.textContent = `问题 ${index+1}/90`;
  questionElement.textContent = questions[index];

  const progress = ((index+1)/90)*100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `已完成: ${Math.round(progress)}%`;

  updateTimer();

  optionsContainer.innerHTML = '';
  const optionValues = [
    {value:1,text:"从无"},{value:2,text:"轻度"},
    {value:3,text:"中度"},{value:4,text:"偏重"},{value:5,text:"严重"}
  ];

  optionValues.forEach(option=>{
    const label = document.createElement('label');
    label.className = 'option-label';
    if(answers[index]===option.value) label.classList.add('selected');
    label.innerHTML = `
      <div class="option-value">${option.value}分</div>
      <div class="option-text">${option.text}</div>
    `;
    label.addEventListener('click',()=>{
      document.querySelectorAll('.option-label').forEach(el=>el.classList.remove('selected'));
      label.classList.add('selected');
      answers[index]=option.value;
      setTimeout(()=>{
        if(index<89){ showQuestion(index+1); }
        else{ showResults(); }
      },400);
    });
    optionsContainer.appendChild(label);
  });
}

// ====================== 计时器 ======================
function updateTimer(){
  if(!startTime) return;
  const elapsed = (new Date()-startTime)/1000/60;
  const remaining = Math.max(5,Math.round(20-elapsed));
  timerElement.textContent = `预计剩余时间: ${remaining}分钟`;
}

// ====================== 结果展示 ======================
function showResults(){
  testSection.classList.remove('active');
  resultSection.classList.add('active');

  // 总分 & 均分
  const totalScore = answers.reduce((a,b)=>a+b,0);
  const symptomIndex = (totalScore/90).toFixed(2);
  document.getElementById('total-score').textContent = totalScore;
  document.getElementById('symptom-index').textContent = symptomIndex;

  // 因子表格 & 解释
  const tbody = document.querySelector('#factor-table tbody');
  tbody.innerHTML = '';
  const factorExplanations = document.getElementById('factor-explanations');
  factorExplanations.innerHTML = '';

  for(const factor in factors){
    const idxs=factors[factor].indices;
    let sum=0; idxs.forEach(i=>sum+=answers[i]);
    const avg = (sum/idxs.length).toFixed(2);

    let badgeClass='badge-normal', level='正常';
    if(avg<1.5){ badgeClass='badge-normal'; level='正常'; }
    else if(avg<2.5){ badgeClass='badge-mild'; level='轻度'; }
    else if(avg<3.5){ badgeClass='badge-moderate'; level='中度'; }
    else { badgeClass='badge-severe'; level='重度'; }

    tbody.innerHTML += `
      <tr>
        <td>${factor}</td>
        <td>${sum}</td>
        <td>${avg}</td>
        <td><span class="badge ${badgeClass}">${level}</span></td>
      </tr>
    `;

    factorExplanations.innerHTML += `
      <div class="factor-explain">
        <h4><span class="badge ${badgeClass}">${level}</span> ${factor}</h4>
        <p>${factors[factor].explanation}</p>
      </div>
    `;
  }

  // 结果解释
  const resultInterpretation = document.getElementById('result-interpretation');
  resultInterpretation.innerHTML = `
    <h3>结果解释</h3>
    <p>请用从容的心态来看待本次测试。无论分数如何。请一定记得,我们始终都在你身边。
SCL-90心理健康自评量表通盖了情绪状态、思维模式、人际关系、生活习惯等多个维度。它就像一面温柔的镜子,能帮你更清晰地看见自己当下的心理状态。需要知道的是,量表得分仅仅是近期心理感受的投射。若某些因子得分较高,或许只是说明你最近在这些方面智时感受到了压力或困扰。但这绝不等于你存在严重的问题。很多时候。短期的心理波动本就是生活的常态--可能是学习的节奏，工作的挑战或是人际交往中的小插曲带来的暂时影响。</p>
    <p>如果你发现自己在多个维度上长期感到不适。不妨多给自己一些关注:试着调整自己的作息规律,找到适合自己的放松方式,或是和信任的人好好倾诉聊。倘若情绪已经悄悄影响到了日常生活,且靠自己难以调节,也请不要犹豫。及时寻求专业的心理咨询或帮助,这并不是软弱，而是对自己的负责。要知道心理健康和身体健康同样重要。而你,本就值得被好好关心与坚定支持。</p>
    <p>一般认为：<br>
      - 总分≥160分，提示心理健康可能存在问题；<br>
      - 任一因子均分≥2分，提示该因子相关症状存在；<br>
      - 阳性项目数≥43，提示心理健康可能存在问题。</p>
    <p>量表的临界值参考：<br>
      <span class="badge badge-normal">正常</span> 平均分1.0-2.0：正常或轻微症状<br>
      <span class="badge badge-mild">轻度</span> 平均分2.1-3.0：轻度心理症状<br>
      <span class="badge badge-moderate">中度</span> 平均分3.1-4.0：中度心理症状<br>
      <span class="badge badge-severe">重度</span> 平均分4.1-5.0：重度心理症状</p>
    <p>说明：本测试仅供参考，不能替代临床诊断。如症状明显影响到学习、工作和生活，请尽早寻求专业医生帮助。</p>
  `;

  // token 核销
  const token=getTokenFromUrl();
  if(token){ api(`/api/token?token=${encodeURIComponent(token)}`,{method:'POST'}); }
}

// ====================== 重新测试 ======================
function restartTest(){
  currentQuestion=0;
  answers=new Array(90).fill(0);
  resultSection.classList.remove('active');
  welcomeSection.classList.add('active');
  initGate();
}
