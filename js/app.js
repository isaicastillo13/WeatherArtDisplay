(() => {
    const App = {
        htmlElements: {
            documentoHtml: document,
            videoClimaXl: document.querySelector(".Contenedor--Xl video"),
            videoClimaS: document.querySelector(".Contenedor--S video")
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.documentoHtml.addEventListener("DOMContentLoaded", App.handlers.getDataApi);
        },
        handlers: {
            getDataApi() {
                App.methods.obtenerDatosAPI();
            }
        },
        methods: {
            obtenerDatosAPI() {
                fetch("http://api.openweathermap.org/data/2.5/weather?q=Montevideo&lang=es&APPID=951400fcf91c10f9036dcf008f13b1de")
                    .then(response => response.json())
                    .then(data => {
                        App.methods.validarIconExit(data.weather[0].icon);
                    })
                    .catch(error => {
                        console.error("Error: ", error);
                        setTimeout(App.methods.obtenerDatosAPI, 60000);
                    });
            },
            validarIconExit(icon) {
                // console.log(icon)
                weatherConditions = {
                    clearSky: "01d",
                    rain: "10d",
                    thunderstorm: "11d",
                    mist: "50d"
                }

                // Valido si el icono que esta mandando el API es de noche o no
                if (App.methods.isIconNight(icon)) {
                    icon = App.methods.isIconNight(icon);
                }

                //Valido que el icono que esta mandando el API sea uno de los que tengo en el objeto weatherConditions
                for (let key in weatherConditions) {
                    if (weatherConditions[key] != icon) {
                        icon = "01d";
                    }
                }
                App.renders(icon);
            },

            isIconNight(icon) {
                if (icon.slice(-1) == "n") {
                    icon.slice(0, -1) + "d"
                }
            }
        },
        renders(icon) {
            if (window.location.pathname == "/videoS.html") {
                App.htmlElements.videoClimaS.src = `videos/${icon}.mp4`;
            } else if (window.location.pathname == "/videoXl.html") {
                App.htmlElements.videoClimaXl.src = `videos/${icon}.mp4`;
            }
        }
    }
    App.init();
})();