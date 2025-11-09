const randomNum = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join("")
export default randomNum