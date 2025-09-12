// 示例题目（真实SCL-90是90道）
const questions = [
  "我觉得紧张或容易受惊吓",
  "我觉得难以入睡或容易醒来",
  "我常感到心里不安或焦虑",
  "我常觉得注意力难以集中",
  "我常感到身体有不适但又找不到原因"
];

const container = document.getElementById("questions");

// 渲染问题
questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <label>${index + 1}. ${q}</label><br>
    <label><input type="radio" name="q${index}" value="1" required> 1</label>
    <label><input type="radio" name="q${index}" value="2"> 2</label>
    <label><input type="radio" name="q${index}" value="3"> 3</label>
    <label><input type="radio" name="q${index}" value="4"> 4</label>
    <label><input type="radio" name="q${index}" value="5"> 5</label>
  `;
  container.appendChild(div);
});

document.getElementById("scl90-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let sum = 0;
  questions.forEach((_, index) => {
    const val = document.querySelector(`input[name="q${index}"]:checked`).value;
    sum += parseInt(val);
  });
  const avg = (sum / questions.length).toFixed(2);

  document.getElementById("score").textContent = `平均分：${avg}`;
  document.getElementById("advice").textContent = avg > 3
    ? "建议：注意放松，必要时寻求专业帮助"
    : "状态良好，继续保持~";

  document.getElementById("result").classList.remove("hidden");
  window.scrollTo(0, document.body.scrollHeight);
});
