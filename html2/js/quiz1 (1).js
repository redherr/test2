let quizData = {};
let currentQuizNo = 0;
let correctCount = 0;
 
// 問題データの取得
get_quiz_data();
 
/**
 * 問題のデータを取得する
 * 
 */
function get_quiz_data() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        quizData = xhr.response;
        // 問題画面の生成
        generate_quiz_content();
        // 問題の選択肢を選択したときのイベント設定
        register_choice_event();
    }
    xhr.open('GET', 'json/quiz1.json');
    xhr.responseType = "json";
    xhr.send();
}
 
/**
 * 問題の選択肢を選択したときのイベントを設定する
 * 
 */
 function register_choice_event() {
    for (var i = 0; i < document.querySelectorAll('.js-quiz-choice').length; i++) {
        document.querySelectorAll('.js-quiz-choice')[i].addEventListener('click', function(e) {
            // 回答・解説画面の生成
            generate_answer_content(parseFloat(this.getAttribute('data-quiz_choice')));
            // 未回答の問題がある場合
            if(currentQuizNo + 1 < quizData['quiz'].length) {
                // 次の問題へ遷移するときのイベント設定
                register_nextquiz_event();
            // 全て回答済の場合
            } else {
                // 結果画面へ遷移するときのイベント設定
                register_result_event();
            }
        }, false);
    }
}
 
/**
 * 次の問題へ遷移するときのイベントを設定する
 * 
 */
function register_nextquiz_event() {
    document.querySelector('.js-quiz-next').addEventListener('click', function() {
        currentQuizNo++;
        // 問題画面の生成
        generate_quiz_content();
        // 問題の選択肢を選択したときのイベント設定
        register_choice_event();
    }, false);
}
/**
 * 結果画面へ遷移するときのイベントを設定する
 * 
 */
function register_result_event() {
    document.querySelector('.js-quiz-result').addEventListener('click', function() {
        // 結果画面の生成
        generate_result_content();
        // トップへ遷移するときのイベント設定
        register_top_event();
    }, false);
}
 

 
/**
 * 問題画面を生成する
 * 
 */
function generate_quiz_content() {
    var ins = '<h1 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h1>';
    ins +='<di class="choice">'
    ins += '<ol class="p-quiz-choices">';
        for (var i = 0; i < quizData['quiz'][currentQuizNo]['a'].length; i++) {
            ins += '<li class="p-quiz-choices__item">';
                ins += '<button class="c-btn js-quiz-choice" data-quiz_choice="' + (i+1) + '">' + quizData['quiz'][currentQuizNo]['a'][i] + '</button>';
            ins += '</li>';
        }
    ins += '</ol>'
    ins +='</div>';
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}
 
/**
 * 回答・解説画面を生成する
 * @param {number} choice - 選択した回答番号
 */
function generate_answer_content(choice) {
    var ins = '<h1 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h1>';
    // 正解の場合
    if(quizData['quiz'][currentQuizNo]['correct'] === choice) {
        ins += '<p class="p-quiz-result">正解</p>';
        correctCount++;
    // 不正解の場合
    } else {
        ins += '<p class="p-quiz-result">不正解</p>';
    }
    ins += '<p class="p-quiz-commentary">' + quizData['quiz'][currentQuizNo]['commentary'] + '</p>';
    // 未回答の問題がある場合
    if(currentQuizNo + 1 < quizData['quiz'].length) {
        ins += '<div class="p-quiz-next">';
            ins += '<button class="c-btn js-quiz-next">次の問題</button>';
        ins += '</div>';
    // 全て回答済の場合
    }else {
        ins += '<div class="p-quiz-next">';
            ins += '<button class="c-btn js-quiz-result">結果を見る</button>';
        ins += '</div>';
    }
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}
/**
 * 結果画面を生成する
 * 
 */
 function generate_result_content() {
    var ins = '<h1 class="p-quiz-ttl">結果は' + (currentQuizNo+1) + '問中' + correctCount + '問正解でした</h1>';
    for (var i = 0; i < quizData['rank'].length; i++) {
        if(correctCount >= quizData['rank'][i]['count']) {
            ins += '<p class="p-quiz-commentary">' + quizData['rank'][i]['comment'] + '</p>';
            break;
        }
    }
    ins += '<div class="p-quiz-next">';
        ins += '<button class="c-btn" o>トップに戻る</button>';
    ins += '</div>';
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}�号
 */
function generate_answer_content(choice) {
    var ins = '<h3 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h3>';
    // 正解の場合
    if(quizData['quiz'][currentQuizNo]['correct'] === choice) {
        correctCount++;
    // 不正解の場合
    } else {
    }
    // 未回答の問題がある場合
    if(currentQuizNo + 1 < quizData['quiz'].length) {
        function generate_quiz_content() {
            var ins = '<h3 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h3>';
            ins +='<div class=choice>'
            ins += '<ul class="p-quiz-choices">';
                for (var i = 0; i < quizData['quiz'][currentQuizNo]['a'].length; i++) {
                    ins += '<li class="p-quiz-choices__item">';
                        ins += '<button class="c-btn js-quiz-choice" data-quiz_choice="' + (i+1) + '">' + quizData['quiz'][currentQuizNo]['a'][i] + '</button>';
                    ins += '</li>';
                }
            ins += '</ul>';
            ins +='</div>'
         
            document.querySelector('.js-quiz-content').innerHTML = ins;
        };
    // 全て回答済の場合
} else {
    function generate_result_content() {
        var ins = '<h1 class="p-quiz-ttl">結果は' + (currentQuizNo+1) + '問中' + correctCount + '問正解でした</h1>';
        for (var i = 0; i < quizData['rank'].length; i++) {
            if(correctCount >= quizData['rank'][i]['count']) {
                ins += '<p class="p-quiz-commentary">' + quizData['rank'][i]['comment'] + '</p>'+'<br>'+'<a href="index.html"><button><b>メニューに戻る</b></button></a></b>';
                break;
            }
        
        }
     
        document.querySelector('.js-quiz-content').innerHTML = ins;
    }
        

/**
 * 結果画面を生成する
 * 
 */
 function generate_result_content() {
    var ins = '<h1 class="p-quiz-ttl">結果は' + (currentQuizNo+1) + '問中' + correctCount + '問正解でした</h1>';
    for (var i = 0; i < quizData['rank'].length; i++) {
        if(correctCount >= quizData['rank'][i]['count']) {
            ins += '<p class="p-quiz-commentary">' + quizData['rank'][i]['comment'] + '</p>'+'<br>'+'<a href="index.html"><button><b>メニューに戻る</b></button></a></b>';
            break;
        }
    
    }
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}'}'�は' + (currentQuizNo+1) + '問中' + correctCount + '問正解でした</h1>';
    for (var i = 0; i < quizData['rank'].length; i++) {
        if(correctCount >= quizData['rank'][i]['count']) {
            ins += '<p class="p-quiz-commentary">' + quizData['rank'][i]['comment'] + '</p>'+'<br>'+'<a href="index.html"><button><b>メニューに戻る</b></button></a></b>';
            break;
        }
    
    }
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}