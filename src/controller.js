(function exportController() {

    class Controller {
    
        constructor(aeroplane) {
            this.aeroplane = aeroplane;

            // this.renderAirports();
            // this.renderHUD();

            document.querySelector('#depart-button').addEventListener('click', () => {
                this.takeOff();
            });
        };
    
        renderAirports (airports) {
            const airportsElement = document.querySelector('#airports');
            airportsElement.style.width = '0px';

            airports.forEach((airport, index) => {
                const newAirportElement = document.createElement('div');
                const newAirportImg = document.createElement('img');

                newAirportElement.className = 'airport';
                newAirportElement.dataset.airportName = airport.name;
                newAirportElement.dataset.airportIndex = index;

                newAirportImg.className = 'airport, airportImg';
                newAirportImg.dataset.airportName = airport.name;
                newAirportImg.dataset.airportIndex = index;
                newAirportImg.src = "images/runway.jpeg";

                airportsElement.appendChild(newAirportElement);
                newAirportElement.appendChild(newAirportImg);

                const airportsElementWidth = parseInt(airportsElement.style.width, 10);
                airportsElement.style.width = `${airportsElementWidth + 386}px`;
            })
        };

        renderPlane () {
            const aeroplane = this.aeroplane;

            const planeAirportIndex = aeroplane.flightplan.airports.indexOf(aeroplane.currentAirport);
            const airportElement = document.querySelector(`[data-airport-index='${planeAirportIndex}']`);
            
            const planeElement = document.querySelector('#plane');
            planeElement.style.top = `${airportElement.offsetTop + 128}px`;
            planeElement.style.left = `${airportElement.offsetLeft + 48}px`;
        };

        renderHUD() {
            const aeroplane = this.aeroplane;
            const viewportHUD = document.getElementById('viewport-HUD');

            if (!document.querySelector('#current-airport')) {

                const currentAirport = document.createElement('div');
                currentAirport.id = 'current-airport';
                currentAirport.innerHTML = `Current Airport: ${aeroplane.currentAirport.name}`;
                viewportHUD.appendChild(currentAirport);

                const nextAirport = document.createElement('div');
                nextAirport.id = 'next-airport';
                nextAirport.innerHTML = `Next Airport: ${aeroplane.flightplan.airports[indexOf(aeroplane.currentAirport + 1)].name}`;
                viewportHUD.appendChild(currentAirport);

            } else {
                currentAirport.innerHTML = `Current Airport: ${aeroplane.currentAirport.name}`;
                nextAirport.innerHTML = `Next Airport: ${aeroplane.flightplan.airports[indexOf(aeroplane.currentAirport + 1)].name}`;
            }
            

        }


        takeOff() {
            const aeroplane = this.aeroplane;
 
            const currentAirportIndex = aeroplane.flightplan.airports.indexOf(aeroplane.currentAirport);
            const nextAirportIndex = currentAirportIndex + 1;
            const nextAirportElement = document.querySelector(`[data-airport-index='${nextAirportIndex}']`);

            if (!nextAirportElement) {
                this.renderMessage('End of the Line!');
            } else {
                this.renderMessage(`Now departing ${aeroplane.currentAirport.name}`);

                const planeElement = document.querySelector('#plane');
                const flyInterval = setInterval(() => {
                const planeLeft = parseInt(planeElement.style.left, 10);
                if (planeLeft === (nextAirportElement.offsetLeft + 48)) {
                    aeroplane.takeOff();
                    aeroplane.land();
                    clearInterval(flyInterval);
                }
                
                planeElement.style.left = `${planeLeft +1}px`
            }, 20);
            };
            
        }

        land() {
            const aeroplane = this.aeroplane;

            const nextAirportIndex = aeroplane.flightplan.airports.indexOf(aeroplane.previousAirport + 1);

            this.renderMessage(`Now arriving at ${aeroplane.flightplan.airports[nextAirportIndex].airport}`);
        }

        renderMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.id = 'message';
            messageElement.innerHTML = message;
            
            const viewport = document.querySelector('#viewport');
            viewport.appendChild(messageElement);

            setTimeout(() => {
                viewport.removeChild(messageElement);
            }, 2000);
        }
    
    }

if (typeof module !=='undefined' && module.exports) {
    module.exports = Controller;
} else {
    window.Controller = Controller;
}

}());

