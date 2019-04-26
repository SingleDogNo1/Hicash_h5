export default {
  postcall: postcall
}
export function postcall(url, params, target) {
  let tempform = document.createElement('form')
  tempform.setAttribute('name', 'form')
  tempform.action = url
  tempform.method = 'post'
  tempform.style.display = 'none'
  if (target) {
    tempform.target = target
  }

  for (let x in params) {
    let opt = document.createElement('input')
    opt.name = x
    opt.value = params[x]
    tempform.appendChild(opt)
  }

  let opt = document.createElement('input')
  opt.type = 'submit'
  opt.setAttribute('id', '_submit')
  tempform.appendChild(opt)
  document.body.appendChild(tempform)
  tempform.submit()
  document.body.removeChild(tempform)
}