(function () {
  "use strict";

  var TYPE_META = {
    "매화": {
      emoji: "❄️",
      id: "plum",
      traits: ["논리적이고 원칙적임", "질서와 규칙을 중시함", "단단한 추진력"],
      strengths: ["신뢰감", "목표 달성력", "일관성"],
      cautions: ["융통성 부족", "고집이 세질 수 있음"],
      match: ["난초", "국화"]
    },
    "난초": {
      emoji: "🌿",
      id: "orchid",
      traits: ["감성적이고 공감 능력이 높음", "관계를 소중히 함", "유연하고 적응력이 있음"],
      strengths: ["협업", "소통", "분위기 메이킹"],
      cautions: ["결정이 느릴 수 있음", "감정에 휩쓸리기 쉬움"],
      match: ["매화", "국화"]
    },
    "국화": {
      emoji: "🍂",
      id: "chrysanthemum",
      traits: ["사려가 깊고 신중함", "분석적임", "안정을 추구함"],
      strengths: ["판단력", "계획성", "조화"],
      cautions: ["우유부단할 수 있음", "과한 신중함"],
      match: ["난초", "대나무"]
    },
    "대나무": {
      emoji: "🎋",
      id: "bamboo",
      traits: ["추진력과 실행력이 뛰어남", "자신감이 있음", "도전 정신"],
      strengths: ["리더십", "실행력", "도전 정신"],
      cautions: ["성급함", "독단적일 수 있음"],
      match: ["난초", "국화"]
    }
  };

  /* 사진 기준: 1열 빨강=매화, 2열 노랑=난초, 3열 파랑=국화, 4열 초록=대나무 */
  var QUESTIONS = [
    { id: 1, options: [
      { word: "성실한", type: "매화", energy: "내향" },
      { word: "여유로운", type: "난초", energy: "내향" },
      { word: "배려하는", type: "국화", energy: "내향" },
      { word: "논리적인", type: "대나무", energy: "내향" }
    ]},
    { id: 2, options: [
      { word: "순서를 따르는", type: "매화", energy: "내향" },
      { word: "그때그때", type: "난초", energy: "외향" },
      { word: "마음을 읽는", type: "국화", energy: "내향" },
      { word: "전문적인", type: "대나무", energy: "내향" }
    ]},
    { id: 3, options: [
      { word: "질서를 지키는", type: "매화", energy: "내향" },
      { word: "유연한", type: "난초", energy: "외향" },
      { word: "칭찬하는", type: "국화", energy: "외향" },
      { word: "개혁적인", type: "대나무", energy: "외향" }
    ]},
    { id: 4, options: [
      { word: "모범적인", type: "매화", energy: "내향" },
      { word: "편의적인", type: "난초", energy: "외향" },
      { word: "가엾게 여기는", type: "국화", energy: "내향" },
      { word: "전략적인", type: "대나무", energy: "내향" }
    ]},
    { id: 5, options: [
      { word: "준비하는", type: "매화", energy: "내향" },
      { word: "간편한", type: "난초", energy: "외향" },
      { word: "위로하는", type: "국화", energy: "외향" },
      { word: "통찰하는", type: "대나무", energy: "내향" }
    ]},
    { id: 6, options: [
      { word: "빨리 잊어 버리는", type: "매화", energy: "외향" },
      { word: "동정적인", type: "난초", energy: "내향" },
      { word: "확고한", type: "국화", energy: "내향" },
      { word: "협력하는", type: "대나무", energy: "외향" }
    ]},
    { id: 7, options: [
      { word: "재미있는", type: "매화", energy: "외향" },
      { word: "지지해 주는", type: "난초", energy: "외향" },
      { word: "토론하는", type: "국화", energy: "외향" },
      { word: "자세가 바른", type: "대나무", energy: "내향" }
    ]},
    { id: 8, options: [
      { word: "걱정이 적은", type: "매화", energy: "외향" },
      { word: "자비로운", type: "난초", energy: "내향" },
      { word: "예측하는", type: "국화", energy: "내향" },
      { word: "마무리하는", type: "대나무", energy: "내향" }
    ]},
    { id: 9, options: [
      { word: "자발적인", type: "매화", energy: "외향" },
      { word: "공감하는", type: "난초", energy: "내향" },
      { word: "개발하는", type: "국화", energy: "외향" },
      { word: "끈기 있는", type: "대나무", energy: "내향" }
    ]},
    { id: 10, options: [
      { word: "단순한", type: "매화", energy: "외향" },
      { word: "격려하는", type: "난초", energy: "외향" },
      { word: "합리적인", type: "국화", energy: "내향" },
      { word: "부지런한", type: "대나무", energy: "내향" }
    ]},
    { id: 11, options: [
      { word: "감성적인", type: "매화", energy: "내향" },
      { word: "비평적인", type: "난초", energy: "내향" },
      { word: "꼼꼼한", type: "국화", energy: "내향" },
      { word: "임기응변적인", type: "대나무", energy: "외향" }
    ]},
    { id: 12, options: [
      { word: "의미 있는", type: "매화", energy: "내향" },
      { word: "객관적인", type: "난초", energy: "내향" },
      { word: "구조화된", type: "국화", energy: "내향" },
      { word: "간결한", type: "대나무", energy: "내향" }
    ]},
    { id: 13, options: [
      { word: "낭만적인", type: "매화", energy: "내향" },
      { word: "논쟁적인", type: "난초", energy: "외향" },
      { word: "권위를 존중하는", type: "국화", energy: "내향" },
      { word: "농담을 잘하는", type: "대나무", energy: "외향" }
    ]},
    { id: 14, options: [
      { word: "온화한", type: "매화", energy: "내향" },
      { word: "비유적인", type: "난초", energy: "내향" },
      { word: "근면한", type: "국화", energy: "내향" },
      { word: "태평스러운", type: "대나무", energy: "외향" }
    ]},
    { id: 15, options: [
      { word: "관계적인", type: "매화", energy: "외향" },
      { word: "결단하는", type: "난초", energy: "외향" },
      { word: "믿음직한", type: "국화", energy: "내향" },
      { word: "흥겨운", type: "대나무", energy: "외향" }
    ]},
    { id: 16, options: [
      { word: "기획하는", type: "매화", energy: "외향" },
      { word: "규범적인", type: "난초", energy: "내향" },
      { word: "느긋한", type: "국화", energy: "외향" },
      { word: "사려 깊은", type: "대나무", energy: "내향" }
    ]},
    { id: 17, options: [
      { word: "분석적인", type: "매화", energy: "내향" },
      { word: "세밀한", type: "난초", energy: "내향" },
      { word: "개방적인", type: "국화", energy: "외향" },
      { word: "온정적인", type: "대나무", energy: "내향" }
    ]},
    { id: 18, options: [
      { word: "독창적인", type: "매화", energy: "외향" },
      { word: "단정한", type: "난초", energy: "내향" },
      { word: "편리한", type: "국화", energy: "외향" },
      { word: "친밀한", type: "대나무", energy: "외향" }
    ]},
    { id: 19, options: [
      { word: "자신감 있는", type: "매화", energy: "외향" },
      { word: "한결같은", type: "난초", energy: "내향" },
      { word: "쉽게 생각하는", type: "국화", energy: "외향" },
      { word: "관계를 중시하는", type: "대나무", energy: "외향" }
    ]},
    { id: 20, options: [
      { word: "지적인", type: "매화", energy: "내향" },
      { word: "확실한", type: "난초", energy: "내향" },
      { word: "충동적인", type: "국화", energy: "외향" },
      { word: "양보하는", type: "대나무", energy: "내향" }
    ]}
  ];

  var state = { currentIndex: 0, answers: [] };

  var STORAGE_KEY = "fourgentle-test-state";

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentIndex: state.currentIndex,
        answers: state.answers
      }));
    } catch (e) {}
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || typeof data.currentIndex !== "number" || !Array.isArray(data.answers)) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function clearSavedState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function getAnswer(index) {
    if (!state.answers[index]) {
      state.answers[index] = { primary: null, secondary: null };
    }
    return state.answers[index];
  }

  function showScreen(id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
  }

  function startTest() {
    state.currentIndex = 0;
    state.answers = [];
    saveState();
    showScreen("screenQuestion");
    renderQuestion();
  }

  function restoreState() {
    showScreen("screenQuestion");
    renderQuestion();
  }

  function renderQuestion() {
    var q = QUESTIONS[state.currentIndex];
    var answer = getAnswer(state.currentIndex);
    var total = QUESTIONS.length;

    document.getElementById("progressText").textContent = (state.currentIndex + 1) + " / " + total;
    document.getElementById("progressFill").style.width = (((state.currentIndex + 1) / total) * 100) + "%";
    document.getElementById("btnPrev").disabled = state.currentIndex === 0;

    var grid = document.getElementById("optionsGrid");
    var html = "";
    for (var idx = 0; idx < q.options.length; idx++) {
      var opt = q.options[idx];
      var isPrimary = answer.primary === idx;
      var isSecondary = answer.secondary === idx;
      var mark = "";
      if (isPrimary) mark = '<span class="mark primary"></span>';
      else if (isSecondary) mark = '<span class="mark secondary"></span>';
      var classes = "option-card type-" + opt.type;
      if (isPrimary) classes += " selected-primary";
      if (isSecondary) classes += " selected-secondary";
      html += '<div class="' + classes + '" data-option-index="' + idx + '">' + mark + opt.word + "</div>";
    }
    grid.innerHTML = html;

    var cards = grid.querySelectorAll(".option-card");
    for (var c = 0; c < cards.length; c++) {
      (function (idx) {
        cards[c].addEventListener("click", function () {
          handleOptionClick(idx);
        });
      })(c);
    }

    var canNext = answer.primary != null && answer.secondary != null;
    document.getElementById("btnNext").textContent = state.currentIndex === total - 1 ? "결과 보기" : "다음";
    document.getElementById("btnNext").disabled = !canNext;
  }

  function handleOptionClick(optionIndex) {
    var answer = getAnswer(state.currentIndex);

    if (answer.primary === optionIndex) {
      answer.primary = null;
      answer.secondary = null;
    } else if (answer.secondary === optionIndex) {
      answer.secondary = null;
    } else if (answer.primary == null) {
      answer.primary = optionIndex;
    } else if (answer.secondary == null && answer.primary !== optionIndex) {
      answer.secondary = optionIndex;
    } else {
      answer.primary = optionIndex;
      answer.secondary = null;
    }
    renderQuestion();
    saveState();
  }

  function goPrev() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
      saveState();
    }
  }

  function goNext() {
    if (state.currentIndex < QUESTIONS.length - 1) {
      state.currentIndex++;
      renderQuestion();
      saveState();
    } else {
      showResult();
    }
  }

  function calculateScores() {
    var typeScores = { "매화": 0, "난초": 0, "국화": 0, "대나무": 0 };
    var energyScores = {
      "매화": { "내향": 0, "외향": 0 },
      "난초": { "내향": 0, "외향": 0 },
      "국화": { "내향": 0, "외향": 0 },
      "대나무": { "내향": 0, "외향": 0 }
    };

    for (var i = 0; i < state.answers.length; i++) {
      var ans = state.answers[i];
      var q = QUESTIONS[i];
      if (ans.primary != null) {
        var opt = q.options[ans.primary];
        typeScores[opt.type] += 2;
        energyScores[opt.type][opt.energy] += 2;
      }
      if (ans.secondary != null) {
        opt = q.options[ans.secondary];
        typeScores[opt.type] += 1;
        energyScores[opt.type][opt.energy] += 1;
      }
    }

    var maxType = "대나무";
    var maxScore = 0;
    var types = ["매화", "난초", "국화", "대나무"];
    for (var t = 0; t < types.length; t++) {
      if (typeScores[types[t]] > maxScore) {
        maxScore = typeScores[types[t]];
        maxType = types[t];
      }
    }
    var intro = energyScores[maxType]["내향"];
    var extro = energyScores[maxType]["외향"];
    var energy = extro >= intro ? "외향" : "내향";
    return { type: maxType, energy: energy, typeScores: typeScores, energyScores: energyScores };
  }

  function showResult() {
    var result = calculateScores();
    var type = result.type;
    var energy = result.energy;
    var meta = TYPE_META[type];

    document.getElementById("resultEmoji").textContent = meta.emoji;
    document.getElementById("resultTypeName").textContent = type;
    document.getElementById("resultHero").className = "result-hero " + meta.id;

    var traitsHtml = "";
    for (var i = 0; i < meta.traits.length; i++) {
      traitsHtml += "<li>" + meta.traits[i] + "</li>";
    }
    document.getElementById("resultTraits").innerHTML = traitsHtml;

    var strengthsHtml = "";
    for (var j = 0; j < meta.strengths.length; j++) {
      strengthsHtml += "<li>" + meta.strengths[j] + "</li>";
    }
    document.getElementById("resultStrengths").innerHTML = strengthsHtml;

    var cautionsHtml = "";
    for (var k = 0; k < meta.cautions.length; k++) {
      cautionsHtml += "<li>" + meta.cautions[k] + "</li>";
    }
    document.getElementById("resultCautions").innerHTML = cautionsHtml;

    var matchHtml = "";
    for (var m = 0; m < meta.match.length; m++) {
      matchHtml += '<span class="match-tag ' + TYPE_META[meta.match[m]].id + '">' + meta.match[m] + "</span>";
    }
    document.getElementById("resultMatch").innerHTML = matchHtml;

    state.currentIndex = QUESTIONS.length;
    saveState();
    showScreen("screenResult");
  }

  function isStateComplete(saved) {
    if (!saved || saved.currentIndex < QUESTIONS.length) return false;
    if (!saved.answers || saved.answers.length < QUESTIONS.length) return false;
    for (var i = 0; i < QUESTIONS.length; i++) {
      var a = saved.answers[i];
      if (!a || a.primary == null || a.secondary == null) return false;
    }
    return true;
  }

  function initTest() {
    var saved = loadState();
    if (saved && saved.answers && saved.answers.length > 0) {
      if (isStateComplete(saved)) {
        state.currentIndex = saved.currentIndex;
        state.answers = saved.answers.slice();
        showResult();
        return;
      }
      state.currentIndex = Math.min(saved.currentIndex, QUESTIONS.length - 1);
      state.answers = saved.answers.slice();
      restoreState();
      return;
    }
    startTest();
  }

  document.getElementById("btnBack").addEventListener("click", function () {
    if (state.currentIndex > 0) {
      goPrev();
    } else {
      window.location.href = "index.html";
    }
  });
  document.getElementById("btnPrev").addEventListener("click", goPrev);
  document.getElementById("btnNext").addEventListener("click", goNext);
  document.getElementById("btnRetry").addEventListener("click", function () {
    if (confirm("다시 검사하시겠습니까?")) {
      clearSavedState();
      window.location.href = "index.html";
    }
  });

  initTest();
})();
