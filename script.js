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

// ====================== 因子定义 ======================
const factors = {
  "躯体化": { indices: [0,3,11,26,39,46,50,56,68,76], explanation: "主要反映身体化反应症状，如头痛、胸痛、肌肉酸痛等。" },
  "强迫症状": { indices: [1,2,8,27,36,44,53,62,65,74], explanation: "反映强迫性思维和行为，如反复思考、检查或洗手。" },
  "人际关系敏感": { indices: [5,20,33,35,37,41,60,64,69,78], explanation: "反映人际关系中的不自在和自卑感。" },
  "抑郁": { indices: [4,13,14,28,29,30,38,52,63,71,79,85,88], explanation: "反映抑郁心境、兴趣减退、自责、无望等。" },
  "焦虑": { indices: [10,22,31,34,42,55,67,73,80,86], explanation: "反映焦虑紧张、不安、心慌等症状。" },
  "敌对": { indices: [6,21,23,40,58,70,81,84,89], explanation: "反映敌意、易怒、攻击性。" },
  "恐怖": { indices: [12,24,45,47,49,59,61,72,77,82], explanation: "反映对特定场景或人群的恐惧体验。" },
  "偏执": { indices: [7,16,17,32,43,51,57,66,75,83], explanation: "反映猜疑、多疑、被害感等偏执症状。" },
  "精神病性": { indices: [9,18,25,44,48,54,62,73,79,87], explanation: "反映幻听、思维紊乱等精神病性症状。" },
  "其他（睡眠/饮食等）": { indices: [19,25,39,48,55,60,64,71,79], explanation: "反映睡眠障碍、饮食异常等情况。" }
};

// ====================== 状态 ======================
let currentQuestion = 0;
let answers = new Array(90).fill(0);

// ====================== DOM ======================
const welcomeSection = document.getElementById('welcome-section');
const testSection = document.getElementById('test-section');
const resultSection = document.getElementById('result-section');
const questionElement = document.getElementById('question');
const questionNumber = document.getElementById('question-number');
const optionsContainer = document.getElementById('options');
const progressBar = document.getElementById('test-progress');
const progressText = document.getElementById('progress-text');
const factorTableBody = document.querySelector('#factor-table tbody');
const factorExplanations = document.getElementById('factor-explanations');
const resultInterpretation = document.getElementById('result-interpretation');
const startBtn = document.getElementById('start-test');
const gate = document.getElementById('gate');

// ====================== 启动 ======================
document.addEventListener('DOMContentLoaded', () => {
  startBtn.disabled = false;
  startBtn.addEventListener('click', startTest);
  document.getElementById('restart-test').addEventListener('click', restartTest);
});

// ====================== 测试逻辑 ======================
function startTest(){
  welcomeSection.classList.remove('active');
  testSection.classList.add('active');
  showQuestion(0);
}

function showQuestion(index){
  currentQuestion=index;
  questionNumber.textContent=`问题 ${index+1}/90`;
  questionElement.textContent=questions[index];
  const progress=((index+1)/90)*100;
  progressBar.style.width=`${progress}%`;
  progressText.textContent=`已完成: ${Math.round(progress)}%`;

  optionsContainer.innerHTML='';
  [1,2,3,4,5].forEach(v=>{
    const label=document.createElement('label');
    label.className='option-label';
    if(answers[index]===v) label.classList.add('selected');
    label.innerHTML=`<div class="option-value">${v}分</div><div class="option-text">${['从无','轻度','中度','偏重','严重'][v-1]}</div>`;
    label.addEventListener('click',()=>{
      document.querySelectorAll('.option-label').forEach(el=>el.classList.remove('selected'));
      label.classList.add('selected');
      answers[index]=v;
      setTimeout(()=>{ index<89?showQuestion(index+1):showResults(); },300);
    });
    optionsContainer.appendChild(label);
  });
}

function showResults(){
  testSection.classList.remove('active');
  resultSection.classList.add('active');

  const totalScore=answers.reduce((a,b)=>a+b,0);
  const symptomIndex=(totalScore/90).toFixed(2);
  document.getElementById('total-score').textContent=totalScore;
  document.getElementById('symptom-index').textContent=symptomIndex;

  factorTableBody.innerHTML='';
  factorExplanations.innerHTML='';
  for(const factor in factors){
    const idxs=factors[factor].indices;
    let sum=0; idxs.forEach(i=>sum+=answers[i]);
    const avg=(sum/idxs.length).toFixed(2);
    let badgeClass='badge-normal', level='正常';
    if(avg<1.5){ badgeClass='badge-normal'; level='正常'; }
    else if(avg<2.5){ badgeClass='badge-mild'; level='轻度'; }
    else if(avg<3.5){ badgeClass='badge-moderate'; level='中度'; }
    else { badgeClass='badge-severe'; level='重度'; }
    factorTableBody.innerHTML+=`
      <tr>
        <td>${factor}</td><td>${sum}</td><td>${avg}</td>
        <td><span class="badge ${badgeClass}">${level}</span></td>
      </tr>`;
    factorExplanations.innerHTML+=`
      <div class="factor-explain">
        <h4><span class="badge ${badgeClass}">${level}</span> ${factor}</h4>
        <p>${factors[factor].explanation}</p>
      </div>`;
  }

  resultInterpretation.innerHTML=`
    <h3>结果解释</h3>
    <p>请用从容的心态来看待本次测试。无论分数如何。请一定记得,我们始终都在你身边。</p>
    <p>SCL-90心理健康自评量表通盖了情绪状态、思维模式、人际关系、生活习惯等多个维度。它就像一面温柔的镜子,能帮你更清晰地看见自己当下的心理状态。需要知道的是,量表得分仅仅是近期心理感受的投射。若某些因子得分较高,或许只是说明你最近在这些方面暂时感受到了压力或困扰。但这绝不等于你存在严重的问题。很多时候,短期的心理波动本就是生活的常态--可能是学习的节奏，工作的挑战或是人际交往中的小插曲带来的暂时影响。</p>
    <p>如果你发现自己在多个维度上长期感到不适。不妨多给自己一些关注:试着调整自己的作息规律,找到适合自己的放松方式,或是和信任的人好好倾诉聊。倘若情绪已经悄悄影响到了日常生活,且靠自己难以调节,也请不要犹豫。及时寻求专业的心理咨询或帮助,这并不是软弱，而是对自己的负责。要知道心理健康和身体健康同样重要。而你,本就值得被好好关心与坚定支持。</p>
  `;
}

function restartTest(){
  currentQuestion=0;
  answers=new Array(90).fill(0);
  resultSection.classList.remove('active');
  welcomeSection.classList.add('active');
}
