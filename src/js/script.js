const form=document.getElementById("form"),stickersOptions=document.getElementById("stickersOptions"),stickersQtd=document.getElementById("stickersQtd"),buttonAdd=document.getElementById("buttonAdd"),buttonSub=document.getElementById("buttonSub"),testes=()=>{stickersQtd.value?buttonSub.disabled=!1:buttonSub.disabled=!0};buttonAdd.onclick=e=>{e.preventDefault(),""===stickersQtd.value&&(stickersQtd.value="0",buttonSub.disabled=!0),stickersQtd.value=parseInt(stickersQtd.value)+1,buttonSub.disabled=!1,stickersQtd.classList.remove("error")},buttonSub.onclick=e=>{e.preventDefault(),stickersQtd.value<=1&&(buttonSub.disabled=!0),stickersQtd.value=parseInt(stickersQtd.value)-1},form.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelectorAll('input[type="checkbox"]:checked'),s=document.getElementById("observacoes").value,c=document.getElementById("successMsg"),r=[];if(t.forEach(e=>{"react"!==e.value&&"vue"!==e.value&&"angular"!==e.value||r.push(e.value)}),0===Object.keys(r).length)return stickersOptions.classList.add("error"),!1;if(stickersOptions.classList.remove("error"),stickersQtd.value<=0||null===stickersQtd.value)return stickersQtd.classList.add("error"),stickersQtd.value=0,!1;const d=JSON.stringify({stickers:r,stickersQtd:stickersQtd.value,observacoes:s});fetch("https://jsonplaceholder.typicode.com/posts",{method:"POST",body:d,headers:{"Content-type":"application/json; charset=UTF-8"}}).then(e=>e.json()).then(()=>{c.classList.add("success"),setTimeout(()=>{form.reset(),c.classList.remove("success")},3e3)})});