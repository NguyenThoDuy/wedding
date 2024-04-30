function getRemainingTime(et) {
         var dt = Date.parse(et) - Date.parse(new Date());
         var seconds = Math.floor((dt / 1000) % 60);
         var minutes = Math.floor((dt / 1000 / 60) % 60);
         var hours = Math.floor((dt / (1000 * 60 * 60)) % 24);
         var days = Math.floor(dt / (1000 * 60 * 60 * 24));
         return { days, hours, minutes, seconds };
     }
     function initRemainingTime(id, endTime) {
         var clock = document.getElementById(id);
         var daysSpan = clock.querySelector('.days');
         var hoursSpan = clock.querySelector('.hours');
         var minutesSpan = clock.querySelector('.minutes');
         var secondsSpan = clock.querySelector('.seconds');
         function updateRemainingTime() {
             var t = getRemainingTime(endTime);
             daysSpan.innerHTML = ('0' + t.days).slice(-2);
             hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
             minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
             secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
             if (t.days <= 0 && t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) { clearInterval(timeInterval); }
         }
         updateRemainingTime();
         var timeInterval = setInterval(updateRemainingTime, 1000);
     }
     var timeForBigDay = new Date(Date.parse(new Date()) + 1 * 24 * 60 * 60 * 1000);
     initRemainingTime('reminder-clock', timeForBigDay);


     // Kiểm tra kích thước của màn hình để xác định thiết bị là di động hay máy tính
     document.addEventListener('DOMContentLoaded', function() {
         const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
         const imageElement = document.getElementById("image_1");
         console.log(imageElement);
         
         // Kiểm tra xem có phải là màn hình lớn hơn 768px và phần tử có tồn tại không
         if (screenWidth > 768 && imageElement !== null) {
             imageElement.style.display = 'none';
         }
     });
