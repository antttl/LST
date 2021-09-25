var d_day = new Date("10/12/2021");
var arr = [];
var timer_cnt = 0;
var timer;
var start_flag = 0;
$('.end').hide();
end_timer();


if (localStorage.length > 0) {
    arr = localStorage.getItem("text");
    arr = JSON.parse(arr);
    for (var i = 0; i < arr.length; i++) {
        var html = '<div class="chbox clas"><input type="checkbox" class="CHb"><h4>' + arr[i] + '</h4></div>';
        $('.chbox-frame').prepend(html);
    }


    arr = localStorage.getItem("checked");
    arr = JSON.parse(arr);
    for (var i = 0; i < arr.length; i++) {
        $($('.CHb')[i]).attr("checked", arr[i]);
    }



}


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
    
    var left_day = (d_day.getTime()-today.getTime()) / (1000 * 3600 * 24);
    left_day = parseInt(left_day);
    $('.dday').text('D-' + left_day);



    $('#time').text(hours + ':' + zero(minutes) + ':' + zero(seconds));
}, 1000);


function reset_timer() {
    setTimeout(function() {
        $('.timer-text').text('타이머 시작하기');
        $('.progress-in').css('background-color', 'rgb(24, 236, 155)');
    }, 1000);
    timer_cnt = 0;
    start_flag  = 0;
}


function end_timer() {
    clearInterval(timer);
    reset_timer();
}

function timer_function() {
    timer_cnt = timer_cnt - 1;
    if (timer_cnt == 0) {
        end_timer();
    }
    var sec = timer_cnt % 60;
    var min = parseInt(timer_cnt / 60);
    $('.timer-text').text(min + '분 ' + sec + '초');
    $('.progress-in').css('width', (timer_cnt / 3600) * 100 + '%');
    if (3600 - timer_cnt > 3300) {
        $('.progress-in').css('background-color', 'red');
    } else if (3600 - timer_cnt > 2700) {
        $('.progress-in').css('background-color', 'rgb(255, 172, 17)');
    } 
}

$('.timer-text').on('click', function() {
    if (start_flag == 0) {
        timer_cnt = 3600;
        timer = setInterval(timer_function, 1000);
        start_flag = 1;
    }
});

$('#Tips').on('click', () => {
    window.open("https://gongsin.com/");
});

$('#Add').on('click', () => {
    var inp_txt = $('.add_chbox').val();
    if (inp_txt == '') {
        return;
    }

    $('.add_chbox').val('');
    var html = '<div class="chbox clas"><input type="checkbox" class="CHb"><h4>' + inp_txt + '</h4></div>';
    $('.chbox-frame').prepend(html);
    

    arr = localStorage.getItem("text");
    if (arr == null) {
        arr = [];
    } else {
        arr = JSON.parse(arr);    
    }
    arr.push(inp_txt);
    localStorage.setItem("text", JSON.stringify(arr));

    var ck_arr = [];
    for (var i = 0; i < $('.CHb').length; i++) {
        ck_arr.push($($('.CHb')[i]).is(":checked") ==  true)
    }
    localStorage.setItem("checked", JSON.stringify(ck_arr));

});


$('.CHb').on('click', () => {
    var ck_arr = [];
    for (var i = 0; i < $('.CHb').length; i++) {
        ck_arr.push($($('.CHb')[i]).is(":checked") ==  true)
    }
    localStorage.setItem("checked", JSON.stringify(ck_arr));
});

$('#Remove').on('click', () => {
    if (confirm('제거할거임?') == 0) {
        return;
    }

    $('.clas').remove();
    localStorage.clear();
});


$(window).bind('beforeunload', function() {
    end_timer();
});
