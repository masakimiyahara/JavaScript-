   'use strict'; {
        const timer = document.getElementById('timer');
        const start = document.getElementById('start');
        const stop = document.getElementById('stop');
        const reset = document.getElementById('reset');

        let startTime;　 //startボタンクリック時の時刻
        let timeoutid; //ID
        let elapsedTime = 0; //startからstopまでの経過時間

        //ストップウォッチ 
        function countUp() {
            var d = new Date(Date.now() - startTime + elapsedTime);

            var h = String(d.getHours() - 9);
            var m = String(d.getMinutes());
            var s = String(d.getSeconds());
            var ms = String(d.getMilliseconds());
            ms = ms.slice(0, 1);

　　　　　　//タイマーの表示
            timer.innerHTML = h + ':' + m + ':' + s + ':' + ms;

            timeoutid = setTimeout(() => {
                countUp();
            }, 10);
        }

        //ボタン状態：タイマー初期 reset直後
        function setButtonStateInitial() {
            start.classList.remove('inactive');
            stop.classList.add('inactive');
            reset.classList.add('inactive');
        }

        //ボタン状態：タイマー動作中
        function setButtonStateRunnning() {
            start.classList.add('inactive');
            stop.classList.remove('inactive');
            reset.classList.add('inactive');
        }
        //ボタン状態：タイマー停止中
        function setButtonStateStopped() {
            start.classList.remove('inactive');
            stop.classList.add('inactive');
            reset.classList.remove('inactive');
        }

        setButtonStateInitial()

        //startボタンのイベント
        start.addEventListener('click', () => {
            if (start.classList.contains('inactive') === true) {
                return;
            }

            setButtonStateRunnning();
            startTime = Date.now();
            countUp();
        });

        //stopボタンのイベント
        stop.addEventListener('click', () => {
            if (stop.classList.contains('inactive') === true) {
                return;
            }
            setButtonStateStopped();
            clearTimeout(timeoutid);
            elapsedTime += Date.now() - startTime;
        });

        //resetボタンのイベント
        reset.addEventListener('click', () => {
            if (reset.classList.contains('inactive') === true) {
                return;
            }
            setButtonStateInitial()
            timer.textContent = '0:0:0:0';
            elapsedTime = 0;
        });
    }
