export const stripHtml = (html) => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ''
}
