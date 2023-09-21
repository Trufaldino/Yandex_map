function calculateTile() {
    var latitude = parseFloat(document.getElementById("latitude").value);
    var longitude = parseFloat(document.getElementById("longitude").value);
    var Z = parseInt(document.getElementById("zoom").value);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(Z) || Z < 1 || Z > 19) {
        document.getElementById("map").innerHTML = "Координаты не корректны, введите корректные координаты и зум.";
        document.getElementById("coordinates").innerText = "";
        return;
    }

    var tileSize = 256;
    var worldSize = Math.pow(2, Z) * tileSize;

    var pixelX = Math.floor((longitude + 180) / 360 * worldSize);
    var pixelY = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * worldSize);

    if (pixelX < 0 || pixelX >= worldSize || pixelY < 0 || pixelY >= worldSize) {
        document.getElementById("map").innerHTML = "Плитка не обнаружена для данных координат и зума.";
        document.getElementById("coordinates").innerText = "";
        return;
    }

    var X = Math.floor(pixelX / tileSize);
    var Y = Math.floor(pixelY / tileSize);

    console.log('X', X)
    console.log('Y', Y)

    var mapUrl = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?version=2&l=carparks&lang=ru_RU&x=${X}&y=${Y}&z=${Z}`;
    console.log('mapUrl', mapUrl);

    var img = new Image();
    img.src = mapUrl;
    img.onload = function() {
        document.getElementById("map").innerHTML = `<img src="${mapUrl}" alt="Плитка" width="256" height="256">`;
    };
    img.onerror = function() {
        document.getElementById("map").innerHTML = "";
        document.getElementById("coordinates").innerText = `Не удалось получилось загрузить плитку. X: ${X}, Y: ${Y}`;
    };
    document.getElementById("coordinates").innerText = `X: ${X}, Y: ${Y}`;
}