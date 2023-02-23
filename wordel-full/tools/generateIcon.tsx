const generateIcon = () => {
  const colors = ['green', 'yellow', 'neutral']

  let arr = []

  for (let i = 0; i < 9; i++) {
    arr.push(colors[Math.floor(Math.random() * 3)])
  }

  return arr
}

export default generateIcon