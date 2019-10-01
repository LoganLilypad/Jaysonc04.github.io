window.onload = async () => {

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    await render(canvas);

}

const render = async (canvas) => {

    var mf = 2;
    var showPoints = true;
    var drawOneByOne = true;
    var drawSpeed = 10;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';

    var points = pointCoords(ctx, [canvas.width, canvas.height], 100);

    if(showPoints) points.forEach(function(p) {
         ctx.beginPath();
         ctx.arc(p[0], p[1], 3, 0, 2 * Math.PI);
         ctx.fill();
     });

     var i = 0;
     while(i < points.length) {
         drawLine(ctx, mf, points, points[i], i);
         i++;
         if(drawOneByOne) await sleep(drawSpeed);
     }

}

const drawLine = (ctx, mf, points, point, i) => {

    ctx.moveTo(point[0], point[1]);

    let destIndex = i * mf;
    while(destIndex >= points.length) destIndex -= points.length;

    ctx.lineTo(points[destIndex][0], points[destIndex][1]);
    ctx.stroke();
}

const pointCoords = (ctx, c, modulus) => {

    let points = [];

    const cx = c[0] / 2;
    const cy = (c[1] - 40) / 2;

    for(let i = 0; i < modulus; i++) {

        points.push([
            Math.cos(135) * (cx + 350 * Math.cos(((2 / modulus) * i) * Math.PI) - cx) - Math.sin(135) * (cy + 350 * Math.sin(((2 / modulus) * i) * Math.PI) - cy) + cx,
            Math.sin(135) * (cx + 350 * Math.cos(((2 / modulus) * i) * Math.PI) - cx) + Math.cos(135) * (cy + 350 * Math.sin(((2 / modulus) * i) * Math.PI) - cy) + cy
        ]);

    }

    return points;

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
