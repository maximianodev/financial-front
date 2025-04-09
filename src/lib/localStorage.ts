export function saveToLocalStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFromLocalStorage(key: string) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key)
}
