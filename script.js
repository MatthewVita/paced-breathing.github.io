function begin() {
    execute();
    timer();
    $('.begin-button').hide();
    $('.time-elapsed').show();
    $('.content').hide();
}

// Credit https://stackoverflow.com/a/5517836
function timer() {
    var minutesLabel = document.getElementsByClassName('minutes')[0];
    var secondsLabel = document.getElementsByClassName('seconds')[0];
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + '';
        if (valString.length < 2) {
            return '0' + valString;
        } else {
            return valString;
        }
    }
}

function execute() {
    var statePointer = 0;

    var STATE_QUEUE = [
        {
            type: 'INHALE',
            index: 1,
            start: 5,
            stop: 1,
            text: 'Inhale',
            class: 'inhale',
            isHold: false
        },
        {
            type: 'HOLD_FIRST',
            index: 2,
            start: 2,
            stop: 1,
            text: 'Hold',
            class: 'hold',
            isHold: true
        },
        {
            type: 'EXHALE',
            index: 3,
            start: 7,
            stop: 1,
            text: 'Exhale',
            class: 'exhale',
            isHold: false
        },
        {
            type: 'HOLD_LAST',
            index: 4,
            start: 2,
            stop: 1,
            text: 'Hold',
            class: 'hold',
            isHold: true
        }
    ];

    var counter = STATE_QUEUE[0].start;

    function stateHandler() {
        var text = STATE_QUEUE[statePointer].text + ' ' + (STATE_QUEUE[statePointer].isHold ? '' : counter);
        $('.breathing-guide').text(text);
        $('.breathing-guide').addClass(STATE_QUEUE[statePointer].class);

        var lastState = STATE_QUEUE[statePointer - 1];
        
        if (!lastState) {
            lastState = STATE_QUEUE[3];
        }

        if (lastState) {
            $('.breathing-guide').removeClass(lastState.class);
        }

        if (counter === STATE_QUEUE[statePointer].stop) {
            if (STATE_QUEUE.length === statePointer + 1) {
                statePointer = 0;
                counter = STATE_QUEUE[0].start;
            } else {
                statePointer++;
                counter = STATE_QUEUE[statePointer].start;
            }
        } else {
            counter--;
        }
    }

    stateHandler();
    setInterval(function () {
        stateHandler();
    }, 1000);
}