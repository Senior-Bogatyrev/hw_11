function nameCheck(name) {
    for (let i = 0; i < allColors.length; i++){
        if (name.toUpperCase() == allColors[i].toUpperCase()){
            return false;
        }
    }
    if (/^[a-zа-яё]+$/i.test(name)){
        allColors.push(name);
        return true;
    } else{
        return false;
    }
};

function rgb(val){
    let rgbList = val.split(',');
    return rgbList
}

function hexToRgb(hex) {
    let regex = /^#?([a-f0-6]{2})([a-f0-6]{2})([a-f0-6]{2})$/i
    if(regex.test(hex)){
        let result = regex.exec(hex);
        let result1 = ''
        result1 += parseInt(result[1], 16) + ','
        result1 += parseInt(result[2], 16) + ','
        result1 += parseInt(result[3], 16)
        return result1
    }else{
        return false
    }
}

function colorCodeCheck(color) {
    let type = document.getElementById('type').value;
    if (type == 1){
        let RGB = rgb(color);
        if (RGB.length == 3){
            if((RGB[0]>=0 && RGB[0] <= 255) && (RGB[1]>=0 && RGB[1] <= 255) && (RGB[2]>=0 && RGB[2] <= 255)){
                let inside = RGB.map(i => (Number(i)>205)? i : String(Number(i) + 50) )
                return [`rgb(${RGB.join(',')})`, `rgb(${inside.join(',')})`,RGB.join(',')];
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else if(type == 2){
        let RGBA = rgb(color);
        if (RGBA.length == 4){
            if((RGBA[0]>=0 && RGBA[0] <= 255) && (RGBA[1]>=0 && RGBA[1] <= 255) &&
            (RGBA[2]>=0 && RGBA[2] <= 255) && (RGBA[3]== 0 || RGBA[3] == 1)){ 
                let inside = RGBA.map(function(num,index){
                    if (index !=3){
                        if(Number(num) <= 205){
                            return String(Number(num) + 50);
                        }else{
                            return num;
                        }
                    }else{
                        return num;
                    }
                })
                return [`rgba(${RGBA.join(',')})`, `rgba(${inside.join(',')})`,RGBA.join(',')];
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else if (type == 3){
        let a = hexToRgb(color);
        if (a){
            a = rgb(a);
            let inside = a.map(i => (Number(i)>205)? i : String(Number(i) + 50) )
            return [`rgb(${a.join(',')})`, `rgb(${inside.join(',')})`, color];
        }else{
            return false;
        }
    }
};

let createBtn = document.getElementById('createBtn');
let allColors = ['yellowgreen','darkcyan','orangered'];
let colError = document.getElementById('colError');
let codeError = document.getElementById('codeError');
let display = document.getElementById('display');

let clearCookies = document.getElementById('clearCookies');
clearCookies.onclick = function (){
    localStorage.removeItem('myCookie');
    localStorage.removeItem('myCookieAllColors');
}

if (localStorage.getItem('myCookie')){
    display.innerHTML = JSON.parse(localStorage.getItem('myCookie'));
}
if (localStorage.getItem('myCookieAllColors')){
    allColors = JSON.parse(localStorage.getItem('myCookieAllColors'));
}

createBtn.addEventListener('click', function (e) {
    colError.innerHTML = 'Color:'
    colError.style.color = 'black';
    codeError.innerHTML = 'Code:'
    codeError.style.color = 'black';
    let name = document.getElementById('name').value;
    let typeColor = '';
    if (nameCheck(name)){
        let codecolor = document.getElementById('codecolor').value;
        let result = colorCodeCheck(codecolor);
        let type = document.getElementById('type').value;
        if (result){
            let display = document.getElementById('display');
            if (type == 1){
                typeColor = 'RGB'
            }else if (type == 2){
                typeColor = 'RGBA'
            }else if (type ==3){
                typeColor = 'HEX'
            }

            let newColor = `<div class="colorBlock"><div style='min-width: 300px; max-width: 300px; min-height: 150px; max-height: 150px; margin: 6px; display: flex; justify-content: center; align-items: center;background-color: ${result[1]}; border: 35px solid ${result[0]};'>${name} <br> ${typeColor} <br>${result[2]}</div></div>`
            display.innerHTML += newColor
            let myCookie = document.getElementById('display').innerHTML;
            localStorage.setItem('myCookie', JSON.stringify(myCookie));

            let myCookieAllColors = allColors;
            localStorage.setItem('myCookieAllColors', JSON.stringify(myCookieAllColors));
        }else{
            if (type == 1){
                codeError.innerHTML = 'Color:     RGB code must match the pattern\n                [0-255], [0-255], [0-255]'
                codeError.style.color = 'red';
                allColors.pop();
            }else if (type == 2){
                codeError.innerHTML = 'Color:     RGBA code must match the pattern\n                [0-255], [0-255], [0-255],[0-1]'
                codeError.style.color = 'red';
                allColors.pop();
            }else if (type == 3){
                codeError.innerHTML = 'Color:     HEX code must match the pattern\n                [a-f||A-F||0-6]'
                codeError.style.color = 'red';
                allColors.pop();
            }
        }
        
    } else{
        colError.innerHTML = 'Color:          Color can only contain letters'
        colError.style.color = 'red';
    }
});
