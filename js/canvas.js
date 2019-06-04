const default_json = {
  'width': 600,
  'height': 400,
  'background': '#fff',
  'elements': [
    {
      'type': 'rectangle',
      'color': '#ff2d2d',
      'start': [0, 0],
      'end': [200, 300]
    },
    {
      'type': 'line',
      'start': [0, 0],
      'end': [600, 400],
      'color': '#315abc'
    },
    {
      'type': 'circle',
      'color': '#ff2d2d',
      'start': [0, 0],
      'end': [200, 300]
    }
  ]
};

class Canvas {
  
  constructor(img='') {
    
    this.canvas = document.createElement("canvas");
    document.getElementById('canvas').appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');

    this.textarea = document.createElement("textarea");
    
    this.textarea.value = JSON.stringify(default_json, null, 2);
    this.textarea.onkeyup = function() {
      
      window.image.render();
      
    };
    
    document.getElementById('textarea').appendChild(this.textarea);
    
    this.render();
    
  }
  
  render() {
    
    try {
      
      const json = JSON.parse(this.textarea.value);
    
      const canvas = this.canvas;
      const ctx = this.ctx;
    
      canvas.height = json.height;
      canvas.width = json.width;
    
      ctx.fillStyle = json.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      json.elements.forEach(function(element) {
        
        ctx.fillStyle = element.color;
        
        if(element.type === 'line') {
          
          ctx.moveTo(element.start[0], element.start[1]);
          ctx.lineTo(element.end[0], element.end[1]);
          
          ctx.stroke();
          
        } else if(element.type === 'rectangle') {
          
          ctx.fillRect(element.start[0], element.start[1], element.end[1], element.end[1])
          
        }
        
      });
    
    } catch(e) {
      console.log(e);
    }
    
  }
  
}