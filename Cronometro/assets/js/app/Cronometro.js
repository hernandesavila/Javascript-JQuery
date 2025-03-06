var Cronometro = {
    ticker: null,
    /*start: function (hours, minutes, seconds) {
        let remainingTime = hours * 3600 + minutes * 60 + seconds;
        let elapsedTime = 0;

        this.ticker = setInterval(() => {
            let elapsedHours = Math.floor(elapsedTime / 3600);
            let elapsedMinutes = Math.floor((elapsedTime % 3600) / 60);
            let elapsedSeconds = elapsedTime % 60;

            $('#timer').text(
                String(elapsedHours).padStart(2, '0') + ':' +
                String(elapsedMinutes).padStart(2, '0') + ':' +
                String(elapsedSeconds).padStart(2, '0')
            );

            let remainingHours = Math.floor(remainingTime / 3600);
            let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            let remainingSeconds = remainingTime % 60;
            
            if(remainingHours <= 0 && remainingMinutes <= 0 && remainingSeconds <= 0) {
                $('#mensagem').text('Tempo esgotado!');
                
                $('#timer').css({
                    'color': 'rgb(204, 25, 25)'
                });
            }                
            else if (remainingHours <= 0 && remainingMinutes <= 15 && remainingMinutes >= 1) 
                $('#mensagem').text('Falta' + (remainingMinutes > 1 ? 'm' : '') + ' ' + remainingMinutes + ' minuto' + (remainingMinutes > 1 ? 's' : ''));
            else if(remainingHours <= 0 && remainingMinutes <= 15 && remainingMinutes < 1)
                $('#mensagem').text('Falta' + (remainingSeconds > 1 ? 'm' : '') + ' ' + remainingSeconds + ' segundo' + (remainingSeconds > 1 ? 's' : ''));

            elapsedTime++;
            remainingTime--;
        }, 1000);
    },*/
    start: function (hours, minutes, seconds) {
        let self = this;
        let remainingTime = hours * 3600 + minutes * 60 + seconds;

        self.ticker = setInterval(() => {
            let remainingHours = Math.floor(remainingTime / 3600);
            let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            let remainingSeconds = remainingTime % 60;

            if(remainingTime <= 0) {
                clearInterval(self.ticker);

                $('#mensagem').text('Tempo esgotado!');
                $('#timer').text('00:00:00');

                $('#timer').css({
                    'color': 'rgb(204, 25, 25)'
                });

            } else {
                $('#timer').text(
                    String(remainingHours).padStart(2, '0') + ':' +
                    String(remainingMinutes).padStart(2, '0') + ':' +
                    String(remainingSeconds).padStart(2, '0')
                );

                remainingTime--;
            }    
        }, 1000);
    },
    showTimer: function (show) {
        if(show) {
            $('#cadastroConometro').hide();
            $('#cronometro').show();
        } else {
            $('#cadastroConometro').show();
            $('#cronometro').hide();
        }
    },
    clearScreen: function () {
        $('#valorHora').val('0');
        $('#valorMinuto').val('0');
        $('#valorSegundo').val('0');
        $('#timer').text('00:00:00');
        $('#mensagem').text('');

        $('#timer').css({
            'color': 'white'
        });
    },
    validateScreen: function () {
        if(parseInt($("#valorHora option:selected").val()) == 0 
            && parseInt($("#valorMinuto option:selected").val()) == 0 
            && parseInt($("#valorSegundo option:selected").val()) == 0) {
            Util.showAlertMessage("Atenção!", "Informe o tempo limite.");
            return false;
        } else
            return true;
    },
    fullScreenMode: function (show) {
        if(show) {
            let element = document.documentElement;

            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            }            
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    },
    init: function () {   
        Cronometro.showTimer(false);

        for(let i = 0; i < 24; i++)
            $('#valorHora').append($('<option>', {
                value: i,
                text: i
            }));   
            
        for(let i = 0; i < 60; i++)
            $('#valorMinuto').append($('<option>', {
                value: i,
                text: i
            })); 
            
        for(let i = 0; i < 60; i++)
            $('#valorSegundo').append($('<option>', {
                value: i,
                text: i
            }));   
    }
}

$(document).ready(() => {
    Cronometro.init();

    $('#btnSalvar').click(() => {
        if(Cronometro.validateScreen()) {
            Cronometro.fullScreenMode(true);
            Cronometro.showTimer(true);
            Cronometro.start(parseInt($("#valorHora option:selected").val()), 
                                parseInt($("#valorMinuto option:selected").val()), 
                                parseInt($("#valorSegundo option:selected").val()));
        }
    });

    $('#timer').click(() => {
        clearInterval(Cronometro.ticker);
        Cronometro.fullScreenMode(false);
        Cronometro.showTimer(false);
        Cronometro.clearScreen();
    });
});