// SCL-90问题数据
        const questions = [
            "头痛",
            "神经过敏，心中不踏实",
            "头脑中有不必要的想法或字句盘旋",
            "头昏或昏倒",
            "对异性的兴趣减退",
            "对旁人责备求全",
            "感到别人能控制您的思想",
            "责怪别人制造麻烦",
            "忘记性大",
            "担心自己的衣饰整齐及仪态的端正",
            "容易烦恼和激动",
            "胸痛",
            "害怕空旷的场所或街道",
            "感到自己的精力下降，活动减慢",
            "想结束自己的生命",
            "听到旁人听不到的声音",
            "发抖",
            "感到大多数人都不可信任",
            "胃口不好",
            "容易哭泣",
            "同异性相处时感到害羞不自在",
            "感到受骗，中了圈套或有人想抓住您",
            "无缘无故地突然感到害怕",
            "自己不能控制地大发脾气",
            "怕单独出门",
            "经常责怪自己",
            "腰痛",
            "感到难以完成任务",
            "感到孤独",
            "感到苦闷",
            "过分担忧",
            "对事物不感兴趣",
            "感到害怕",
            "您的感情容易受到伤害",
            "旁人能知道您的私下想法",
            "感到别人不理解您、不同情您",
            "感到人们对您不友好，不喜欢您",
            "做事必须做得很慢以保证做得正确",
            "心跳得很厉害",
            "恶心或胃部不舒服",
            "感到比不上他人",
            "肌肉酸痛",
            "感到有人在监视您、谈论您",
            "难以入睡",
            "做事必须反复检查",
            "难以作出决定",
            "怕乘电车、公共汽车、地铁或火车",
            "呼吸有困难",
            "一阵阵发冷或发热",
            "因为感到害怕而避开某些东西、场合或活动",
            "脑子变空了",
            "身体发麻或刺痛",
            "喉咙有梗塞感",
            "感到前途没有希望",
            "不能集中注意",
            "感到身体的某一部分软弱无力",
            "感到紧张或容易紧张",
            "感到手或脚发重",
            "想到死亡的事",
            "吃得太多",
            "当别人看着您或谈论您时感到不自在",
            "有一些不属于您自己的想法",
            "有想打人或伤害他人的冲动",
            "醒得太早",
            "必须反复洗手、点数目或触摸某些东西",
            "睡得不稳不深",
            "有想摔坏或破坏东西的冲动",
            "有一些别人没有的想法或念头",
            "感到对别人神经过敏",
            "在商店或电影院等人多的地方感到不自在",
            "感到做任何事情都很困难",
            "一阵阵恐惧或惊恐",
            "感到在公共场合吃东西很不舒服",
            "经常与人争论",
            "单独一人时神经很紧张",
            "别人对您的成绩没有作出恰当的评价",
            "即使和别人在一起也感到孤单",
            "感到坐立不安心神不定",
            "感到自己没有什么价值",
            "感到熟悉的东西变成陌生或不像是真的",
            "大叫或摔东西",
            "害怕会在公共场合昏倒",
            "感到别人想占您的便宜",
            "为一些有关性的想法而很苦恼",
            "认为应该因为自己的过错而受到惩罚",
            "感到要很快把事情做完",
            "感到自己的身体有严重问题",
            "从未感到和其他人很亲近",
            "感到自己有罪",
            "感到自己的脑子有毛病"
        ];

        // 因子分类 (问题索引从0开始)
        const factors = {
            "躯体化": {
                indices: [0, 3, 11, 26, 39, 46, 50, 56, 68, 76],
                explanation: "反映主观的身体不适感，包括心血管、胃肠道、呼吸系统等不适，以及头痛、背痛、肌肉酸痛等躯体表现"
            },
            "强迫症状": {
                indices: [1, 2, 8, 15, 27, 36, 44, 53, 62, 74],
                explanation: "反映那些明知没有必要，但又无法摆脱的无意义的思想、冲动和行为"
            },
            "人际关系敏感": {
                indices: [5, 20, 33, 35, 37, 41, 60, 64, 69, 78],
                explanation: "反映与他人相处时的不自在感和自卑感，尤其是在与他人相比较时更突出"
            },
            "抑郁": {
                indices: [4, 13, 14, 28, 29, 30, 38, 52, 63, 71, 79, 85, 88],
                explanation: "反映与临床抑郁症相联系的广泛的概念，包括忧郁、兴趣减退、失望、悲观等"
            },
            "焦虑": {
                indices: [10, 22, 31, 33, 34, 42, 55, 65, 67, 80, 86],
                explanation: "反映通常与临床明显焦虑相联系的症状和体验，如紧张、神经过敏、无法静坐等"
            },
            "敌对": {
                indices: [6, 21, 23, 40, 58, 70, 81, 84, 89],
                explanation: "主要从思想、感情及行为三个方面来反映敌对的表现，包括厌烦、争论、摔物等"
            },
            "恐怖": {
                indices: [12, 24, 45, 47, 49, 59, 61, 72, 77, 82],
                explanation: "反映对孤独和公共场合的惧怕，包括出门旅行、空旷场地、人群、交通工具等"
            },
            "偏执": {
                indices: [7, 16, 17, 32, 34, 51, 57, 66, 75, 83],
                explanation: "反映偏执性思维的基本特征，如投射性思维、敌对、猜疑、关系观念等"
            },
            "精神病性": {
                indices: [9, 18, 43, 48, 54, 62, 73, 79, 84, 87],
                explanation: "反映各式各样的急性症状和行为，如幻听、思维播散、被控制感等"
            },
            "其他(睡眠、饮食等)": {
                indices: [19, 25, 39, 48, 55, 60, 64, 71, 79],
                explanation: "反映睡眠及饮食情况，如入睡困难、早醒、多梦、食欲不振、饮食过量等"
            }
        };

        // 测试状态
        let currentQuestion = 0;
        let answers = new Array(90).fill(0);
        let factorScores = {};
        let startTime = null;
        
        // DOM元素
        const welcomeSection = document.getElementById('welcome-section');
        const testSection = document.getElementById('test-section');
        const resultSection = document.getElementById('result-section');
        const questionElement = document.getElementById('question');
        const questionNumber = document.getElementById('question-number');
        const optionsContainer = document.getElementById('options');
        const progressBar = document.getElementById('test-progress');
        const progressText = document.getElementById('progress-text');
        const timerElement = document.getElementById('timer');
        const factorResults = document.getElementById('factor-results');
        const resultInterpretation = document.getElementById('result-interpretation');
        const adviceSection = document.getElementById('advice-section');
        
        // 初始化
        document.getElementById('start-test').addEventListener('click', startTest);
        document.getElementById('save-result').addEventListener('click', saveResult);
        document.getElementById('restart-test').addEventListener('click', restartTest);
        
        // 开始测试
        function startTest() {
            startTime = new Date();
            welcomeSection.classList.remove('active');
            testSection.classList.add('active');
            showQuestion(0);
            updateTimer();
        }
        
        // 显示问题
        function showQuestion(index) {
            const progress = ((index + 1) / 90) * 100;
            questionNumber.textContent = `问题 ${index + 1}/90`;
            questionElement.textContent = questions[index];
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `已完成: ${Math.round(progress)}%`;
            
            // 更新预计时间
            updateTimer();
            
            // 创建选项
            optionsContainer.innerHTML = '';
            const optionValues = [
                {value: 1, text: "从无"},
                {value: 2, text: "轻度"},
                {value: 3, text: "中度"},
                {value: 4, text: "偏重"},
                {value: 5, text: "严重"}
            ];
            
            optionValues.forEach(option => {
                const label = document.createElement('label');
                label.className = 'option-label';
                if (answers[index] === option.value) {
                    label.classList.add('selected');
                }
                
                label.innerHTML = `
                    <div class="option-value">${option.value}分</div>
                    <div class="option-text">${option.text}</div>
                `;
                
                label.addEventListener('click', () => {
                    // 移除其他选项的选中状态
                    document.querySelectorAll('.option-label').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    // 添加当前选项的选中状态
                    label.classList.add('selected');
                    
                    // 保存答案
                    answers[index] = option.value;
                    
                    // 1秒后自动跳转到下一题
                    setTimeout(() => {
                        if (index < 89) {
                            showQuestion(index + 1);
                        } else {
                            showResults();
                        }
                    }, 600);
                });
                
                optionsContainer.appendChild(label);
            });
        }
        
        // 更新预计时间
        function updateTimer() {
            if (!startTime) return;
            
            const elapsed = (new Date() - startTime) / 1000 / 60; // 分钟
            const remaining = Math.max(5, Math.round(20 - elapsed));
            timerElement.textContent = `预计剩余时间: ${remaining}分钟`;
        }
        
        // 显示结果
        function showResults() {
            testSection.classList.remove('active');
            resultSection.classList.add('active');
            
            calculateResults();
            displayResults();
        }
        
        // 计算结果
        function calculateResults() {
            // 计算总分和阳性项目数
            let totalScore = 0;
            let positiveItems = 0;
            
            answers.forEach(answer => {
                totalScore += answer;
                if (answer > 1) positiveItems++;
            });
            
            const negativeItems = 90 - positiveItems;
            const positiveAverage = positiveItems > 0 ? (totalScore - negativeItems) / positiveItems : 0;
            const symptomIndex = totalScore / 90;
            
            // 更新总体结果
            document.getElementById('total-score').textContent = totalScore;
            document.getElementById('symptom-index').textContent = symptomIndex.toFixed(2);
            document.getElementById('positive-items').textContent = positiveItems;
            document.getElementById('negative-items').textContent = negativeItems;
            document.getElementById('positive-average').textContent = positiveAverage.toFixed(2);
            
            // 计算各因子分
            factorScores = {};
            for (const factor in factors) {
                const indices = factors[factor].indices;
                let factorTotal = 0;
                
                indices.forEach(index => {
                    factorTotal += answers[index];
                });
                
                factorScores[factor] = {
                    average: (factorTotal / indices.length).toFixed(2),
                    total: factorTotal
                };
            }
        }
        
        // 显示结果
        function displayResults() {
            // 显示各因子分
            factorResults.innerHTML = '<h3>各因子分</h3>';
            
            for (const factor in factorScores) {
                const score = parseFloat(factorScores[factor].average);
                const total = factorScores[factor].total;
                let level = '';
                let levelClass = '';
                
                if (score < 1.5) {
                    level = '正常';
                    levelClass = 'level-normal';
                } else if (score < 2.5) {
                    level = '轻度';
                    levelClass = 'level-mild';
                } else if (score < 3.5) {
                    level = '中度';
                    levelClass = 'level-moderate';
                } else {
                    level = '重度';
                    levelClass = 'level-severe';
                }
                
                const percentage = Math.min(score / 5 * 100, 100);
                
                factorResults.innerHTML += `
                    <div class="factor-result">
                        <div class="factor-header">
                            <div class="factor-name">${factor}</div>
                            <div class="factor-score">${score} (总分: ${total}) <span class="level-indicator ${levelClass}">${level}</span></div>
                        </div>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${percentage}%"></div>
                        </div>
                        <div class="factor-explanation">${factors[factor].explanation}</div>
                    </div>
                `;
            }
            
            // 显示结果解释和建议
            let interpretation = '';
            const totalScore = parseFloat(document.getElementById('total-score').textContent);
            const symptomIndex = parseFloat(document.getElementById('symptom-index').textContent);
            
            if (totalScore < 160) {
                interpretation = '<p>您的总体心理健康状况良好，无明显心理症状。</p>';
                adviceSection.innerHTML = '<h3>建议</h3><p>继续保持健康的生活方式，适当进行体育锻炼，保持良好的社交关系，定期进行心理自我调适。</p>';
            } else if (totalScore < 200) {
                interpretation = '<p>您可能存在轻度的心理困扰，建议关注自己的情绪状态，适当调整生活方式。</p>';
                adviceSection.innerHTML = '<h3>建议</h3><p>尝试学习一些压力管理技巧，如深呼吸、冥想等；保持规律作息，增加体育锻炼；与亲友多沟通交流，分享自己的感受。</p>';
            } else if (totalScore < 250) {
                interpretation = '<p>您有明显的心理症状，建议寻求专业心理咨询师的帮助。</p>';
                adviceSection.innerHTML = '<h3>建议</h3><p>建议寻求专业心理咨询或治疗，学习更有效的应对策略；同时保持健康的生活方式，建立支持系统，避免孤立自己。</p>';
            } else {
                interpretation = '<p>您的心理症状较为严重，强烈建议尽快寻求专业心理医生的评估和帮助。</p>';
                adviceSection.innerHTML = '<h3>建议</h3><p>请尽快预约专业心理医生或精神科医生进行全面评估；在专业人士指导下制定治疗计划；同时告知亲友以获得支持。</p>';
            }
            
            // 添加各因子解释
            interpretation += '<h4>分级标准：</h4>';
            interpretation += '<ul>';
            interpretation += '<li>1.0-1.5分: 正常范围</li>';
            interpretation += '<li>1.5-2.5分: 轻度症状</li>';
            interpretation += '<li>2.5-3.5分: 中度症状</li>';
            interpretation += '<li>3.5-5.0分: 重度症状</li>';
            interpretation += '</ul>';
            
            interpretation += '<p>请注意：本测试结果仅供参考，不能作为临床诊断的依据。</p>';
            
            resultInterpretation.innerHTML = interpretation;
            
            // 动画显示分数条
            setTimeout(() => {
                const scoreFills = document.querySelectorAll('.score-fill');
                scoreFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }, 500);
        }
        
        // 保存结果
        function saveResult() {
            const result = {
                date: new Date().toLocaleString(),
                answers: answers,
                totalScore: document.getElementById('total-score').textContent,
                symptomIndex: document.getElementById('symptom-index').textContent,
                positiveItems: document.getElementById('positive-items').textContent,
                negativeItems: document.getElementById('negative-items').textContent,
                positiveAverage: document.getElementById('positive-average').textContent,
                factorScores: factorScores
            };
            
            // 获取已保存的结果
            let savedResults = JSON.parse(localStorage.getItem('scl90Results')) || [];
            savedResults.push(result);
            
            // 保存到本地存储
            localStorage.setItem('scl90Results', JSON.stringify(savedResults));
            
            alert('结果已保存！您可以在浏览器中查看历史记录。');
        }
        
        // 重新测试
        function restartTest() {
            currentQuestion = 0;
            answers = new Array(90).fill(0);
            resultSection.classList.remove('active');
            welcomeSection.classList.add('active');
        }