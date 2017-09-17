$(function() {
    // 'use strice';

    // 图表
    function pieChart() {
        $('.chart').easyPieChart({
            scaleColor: false,
            lineWidth: 4,
            lineCap: 'butt',
            barColor: '#fe4445',
            trackColor: "#f5f5f5",
            size: 160,
            animate: 1000
        });
    };


    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    console.log("dd")
                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {

                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated-fast');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated-fast');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated-fast');
                            } else {
                                el.addClass('fadeInUp animated-fast');
                            }

                            el.removeClass('item-animate');
                        }, k * 100, 'easeInOutExpo');
                    });

                }, 50);

            }

        }, { offset: '85%' });
    };


    // 线条
    function lines() {
        //获取窗口宽高
        var w = window.innerWidth;
        var h = window.innerHeight;

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        //设置画布宽高与窗口宽高一样
        canvas.width = w;
        canvas.height = h;
        //随机数函数
        function fnRandom(min, max) {
            return parseInt((max - min) * Math.random() + min + 1)
        }

        function Round() {
            //半径
            this.r = fnRandom(10, 15);
            this.diam = this.r * 2;
            //随机位置
            var x = fnRandom(0, canvas.width - this.r);
            this.x = x < this.r ? this.r : x;
            var y = fnRandom(0, canvas.height - this.r);
            this.y = y < this.r ? this.r : y
                //随机速度
            var speed = fnRandom(2, 4) / 10
            this.speedX = fnRandom(0, 4) > 2 ? speed : -speed;
            this.speedY = fnRandom(0, 4) > 2 ? speed : -speed;
            //颜色
            this.color = "#EFEFEF";
        }
        Round.prototype.draw = function() {
            //绘制函数
            ctx.fillStyle = this.color;
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        Round.prototype.move = function() {
                this.x += this.speedX;
                if (this.x > canvas.width - this.r) {
                    //				this.speedX*=-1;
                    this.x = this.r

                } else if (this.x < this.r) {
                    this.x = canvas.width - this.r
                }
                this.y += this.speedY;
                if (this.y > canvas.height - this.r) {
                    //				this.speedY*=-1;
                    this.y = this.r
                } else if (this.y < this.r) {
                    this.y = canvas.height - this.r
                }
            }
            //使用Round
        var allRound = [];

        function initRound() {
            //初始化30个圆形对象,放到数组中
            for (var i = 0; i < 30; i++) {
                var obj = new Round();
                obj.draw();
                obj.move();
                allRound.push(obj);
            }
        }
        initRound();
        var dxdy = []

        function roundMove() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //遍历所有的圆形对象,让对象自己重绘,移动
            for (var i = 0; i < allRound.length; i++) {
                var round = allRound[i];
                round.draw();
                round.move();
                dxdy[i] = {
                    dx: round.x,
                    dy: round.y
                };
                var dx = dxdy[i].dx;
                var dy = dxdy[i].dy;
                for (var j = 0; j < i; j++) {
                    var sx = dxdy[j].dx;
                    var sy = dxdy[j].dy;
                    l = Math.sqrt((dx - sx) * (dx - sx) + (dy - sy) * (dy - sy));
                    var C = 1 / l * 7 - 0.009;
                    var o = C > 0.03 ? 0.03 : C;
                    ctx.strokeStyle = 'rgba(0,0,0,' + o + ')'
                        //console.log(l);
                    ctx.beginPath()
                    ctx.lineWidth = 2;
                    ctx.moveTo(dxdy[i].dx, dxdy[i].dy)
                    ctx.lineTo(dxdy[j].dx, dxdy[j].dy);
                    ctx.closePath()
                    ctx.stroke()
                }
            }
            window.requestAnimationFrame(roundMove)
        }
        roundMove();

    };


    $("#skill").waypoint(function() {
            pieChart();
        })
        // $(function() {
        // 图表

    // 线条
    lines();
    contentWayPoint();
    // });
})