
export let data = [
  {
    'nombre': 'p1',
    "text": 19524,
    "data": 12352,
    "bss": 1165,
    "id": 0
  },
  {
    'nombre': 'p2',
    "text": 77539,
    "data": 32680,
    "bss": 4100,
    "id": 0
  },
  {
    'nombre': 'p3',
    "text": 99542,
    "data": 24245,
    "bss": 7557,
    "id": 0
  },
  {
    'nombre': 'p4',
    "text": 115000,
    "data": 123470,
    "bss": 1123,
    "id": 0
  },
  {
    'nombre': 'p5',
    "text": 12342,
    "data": 1256,
    "bss": 1756,
    "id": 0
  },
]

export const llamarLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
}

export const resetId = () => {
  const tmp = JSON.parse(localStorage.getItem('data'));
  for (let index = 0; index < tmp.length; index++) {
    tmp[index].id = 0
  }
  localStorage.setItem('data', JSON.stringify(tmp));
}

export const imprimir = () => {
  const tmp = JSON.parse(localStorage.getItem('data'));
  let text = ''
  for (let index = 0; index < tmp.length; index++) {
    text += `<span> Nombre: ${tmp[index]['nombre']} | .text: ${tmp[index]['text']} | .data: ${tmp[index]['data']} | .bss: ${tmp[index]['bss']}</span> <br><br>`
  }

  return text
}