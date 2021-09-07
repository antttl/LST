var timer_cnt = 0;
var timer;
$('.end').hide();


function zero(val) {
    if (val < 10) {
        return '0' + val;
    } else {
        return val;
    }
}

setInterval(() => {
    let today = new Date();
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    
    $('#time').text(hours + ':' + zero(minutes) + ':' + zero(seconds));
}, 1000);



function end_timer() {
    clearInterval(timer);

    $('.end').fadeIn();
}

function timer_function() {
    timer_cnt = timer_cnt - 1;

    if (timer_cnt == 0) {
        end_timer();
    }

    var sec = timer_cnt % 60;
    var min = parseInt(timer_cnt / 60);
    $('.timer-text').text(min + ':' + sec);
    $('.progress-in').css('width', (timer_cnt / 3600) * 100 + '%');
    if (3600 - timer_cnt > 3300) {
        $('.progress-in').css('background-color', 'red');
    } else if (3600 - timer_cnt > 2700) {
        $('.progress-in').css('background-color', 'rgb(255, 172, 17)');
    } 
}

$('.timer-text').on('click', function() {
    timer_cnt = 3600;
    timer = setInterval(timer_function, 1000);
});